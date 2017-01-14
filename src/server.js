// src/server.js

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import bodyParser from 'body-parser';


// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(cookieSession( {name: 'sessionid', keys: ['Vjk6UwTQdtk9NmG6RdHHdMSDiEFKqC']} ));
// define the folder that will be used for static assets

app.use(Express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());


// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {id:id});
});
// end serialize sessions


passport.use(new FacebookStrategy({
    clientID: '1848587668757095',
    clientSecret: 'c5d62603da56c96108f34664345906fc',
    callbackURL: "http://localhost:3000/auth/facebook"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, true);
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    var user = {id:1};
    return done(null, user);
  })
);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'), );
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/projects',
                                      failureRedirect: '/users/login' }));

var routeRequest = (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(
          <RouterContext {...renderProps}/>
          );
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
};

// route middleware to make sure a user is logged in
var isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
      return next();
  res.redirect('/users/login' + '?next=' + encodeURIComponent(req.url));
};

// universal routing and rendering
app.get('/users/login', routeRequest);
app.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login', successRedirect: '/projects'}));
app.get('/users/logout', function(req,res){
 req.logOut();
 res.redirect('/users/login');
});

app.get('/*', isLoggedIn, routeRequest);

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});