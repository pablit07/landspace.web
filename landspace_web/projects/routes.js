import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Layout from '../../src/components/Layout';
import LayoutPublic from '../../src/components/Layout-Public';
import IndexPage from '../../src/components/IndexPage';
import LoginPage from '../../src/components/LoginPage';
import RegisterPage from '../../src/components/RegisterPage';
import DesignerRegisterPage from '../../src/components/DesignerRegisterPage';
import AccountPage from '../../src/components/AccountPage';
import CartPage from '../../src/components/CartPage';
import DashboardPage from '../../src/components/DashboardPage';
import NotFoundPage from '../../src/components/NotFoundPage';
import TopNav from '../../src/components/TopNav';
import ProjectsTopNav from '../../src/components/ProjectsTopNav';
import ResetPasswordEmail from '../../src/components/ResetPasswordEmail';
import ResetPasswordDone from '../../src/components/ResetPasswordDone';
import ProjectProfilePage from '../../src/components/ProjectProfilePage';
import { render } from 'react-dom'

const userSource = '/api/users/';


export var projectRoutes = <Router history={browserHistory}>
	<Route path='/projects' component={Layout}>
		<IndexRoute component={DashboardPage}/>
		<Route path='/projects/create/' component={ProjectProfilePage}/>
	    <Route path="*" component={NotFoundPage}/>
	</Route>
</Router>;

export var projectRightDrawerRoutes =
<Router history={browserHistory}>
	<Route path='/projects' component={() => (<ProjectsTopNav vertical={true} userSource={userSource} />)}>
		<IndexRoute />
	</Route>
</Router>;