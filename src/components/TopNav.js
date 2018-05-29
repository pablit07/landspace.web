import React from 'react';
import { Link } from 'react-router';
import ReactDomServer from 'react-dom/server';
import Logo from './Logo';
import { writeCsrf } from '../utils.js';


export default class TopNav extends React.Component {

	signUp() {
		var modalObj = new Ink.UI.Modal((<div></div>), {closeOnClick: true});
		let finishSignUpUrl;

		$.get('/api/url/?name=survey:create-survey-response', (data) => { finishSignUpUrl = data.url });

		let finishSignUp = function(e) {
			e.preventDefault();

			$.get(`${finishSignUpUrl}?email=` + encodeURIComponent($('[name=signup-email]').val()) + '&q1=1&q2=Mediterranean&q3=1&q4=1&q5=1', data => {
				if (data.redirect_url) {
					window.location = data.redirect_url;
				}
			});

			return false;
		}

		modalObj.setContentMarkup(ReactDomServer.renderToStaticMarkup((
			<div>
			<h3>
				Sign Up
				<div className="push-right"><button className="ink-button caution ink-dismiss">X</button></div>
      		</h3>
      		<form method='POST' className='ink-form' id='get-started' onSubmit={finishSignUp}>
				<div className='control-group'>
				    <label htmlFor="username">Email</label>
				    <div className='control'>
				    	<input type="text" name="signup-email" />
				    </div>
			    </div>
				<p>
					<input type="submit" value="Get Started" onClick={finishSignUp}/>
				</p>
				{writeCsrf()}
		    </form>
		    <div className='ink-grid full-height'>
				<div className='column-group gutters'>
					<div className="all-40 push-center vertical-space">
						<p className="tip">For demo purposes, this signup form is a shortcut to entry. In the production version of this app, the user was entered into a funnel where they took a short survey to find out their "Style" preference. They then entered their email and were funnelled over to the app. If they chose not to procede, the email was still able to be used for follow-up offers and information</p>
					</div>
					<div className="all-40 push-center vertical-space align-center">
						<img src="https://i.imgur.com/Xy4aHWE.png"/>
					</div>
				</div>
			</div>
            </div>
        )));

		modalObj.open();
		$('[name=signup-email]').focus();
		$('#get-started').submit(finishSignUp);
	}

	render() {
		var leftOrientation = (this.props.vertical) ? 'vertical' : 'push-left horizontal';
		var rightOrientation = (this.props.vertical) ? 'vertical' : 'push-right horizontal';
		var responsiveBtn = (this.props.vertical) ? null : (<li className="hide-all show-tiny show-small show-medium"><a href='#' className="right-drawer-trigger ink-button"><i className='fa fa-bars'></i></a></li>);
		var responsiveClassNames = (this.props.vertical) ? '' : 'show-all hide-medium hide-small hide-tiny';
		var cartResponsiveClassNames = (this.props.vertical) ? '' : "fa fa-shopping-cart fa-2x hide-all show-tiny show-small show-medium";
		var spacerStyle = (this.props.vertical) ? {'border-bottom':'1px solid rgba(0,0,0,.15)'} : null;
		var paddingStyle = (this.props.vertical) ? {'padding':'0'} : null;

		var leftMenuClassName = 'menu white ' + leftOrientation;
		var rightMenuClassName = 'menu white ' + rightOrientation;

		return (
			<nav className="ink-navigation ink-grid" style={paddingStyle}>
			    <ul className={leftMenuClassName} style={spacerStyle}>
			    	<li>
				    	<a className='logoPlaceholder' href="http://landspace.gardenhouse.io/">
							<Logo />
						</a>
					</li>
			        <li className={responsiveClassNames}><a href='http://landspace.gardenhouse.io/'>How It Works</a></li>
			        <li className={responsiveClassNames}><a href='http://landspace.gardenhouse.io/'>Blog</a></li>
		        </ul>
		        
		        <ul className={rightMenuClassName}>
			        <li><a href='/users/cart'><span className={responsiveClassNames}>Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i></span> <i className={cartResponsiveClassNames} aria-hidden="true"></i></a></li>
			        <li className={responsiveClassNames}><a href='/users/logout/?next=/users/login/'>Sign In</a></li>
		        	<li className={responsiveClassNames}><a href='javascript:void(0)' onClick={this.signUp.bind(this)} className='ink-button'>Sign Up</a></li>
		        	{responsiveBtn}
			    </ul>
			</nav>
);
	}
}