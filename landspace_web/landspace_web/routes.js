import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Layout from '../../src/components/Layout';
import LayoutPublic from '../../src/components/Layout-Public';
import IndexPage from '../../src/components/IndexPage';
import LoginPage from '../../src/components/LoginPage';
import DashboardPage from '../../src/components/DashboardPage';
import NotFoundPage from '../../src/components/NotFoundPage';
import TopNav from '../../src/components/TopNav';
import ProjectsTopNav from '../../src/components/ProjectsTopNav';
import { render } from 'react-dom'

render((
<Router history={browserHistory}>
	<Route path='/users' component={LayoutPublic}>
		<Route path='/users/login' component={LoginPage}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
	<Route path='/projects' component={Layout}>
		<IndexRoute component={DashboardPage}/>
	    <Route path="*" component={NotFoundPage}/>
	</Route>
</Router>
), document.getElementById('main'));

render((
<Router history={browserHistory}>
	<Route path="/users" component={() => (<TopNav vertical={true} />)}>
		<Route path='/users/login'/>
	</Route>
	<Route path='/projects' component={() => (<ProjectsTopNav vertical={true} />)}>
		<IndexRoute />
	</Route>
</Router>), document.getElementById('right-drawer'));