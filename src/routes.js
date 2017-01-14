import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import Layout from './components/Layout';
import LayoutPublic from './components/Layout-Public';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
<Route path='/'>
  <Route path="/users" component={LayoutPublic}>
    <Route path='/users/login' component={LoginPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
  <Route path="/projects" component={Layout}>
    <IndexRoute component={DashboardPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
</Route>
);

export default routes;