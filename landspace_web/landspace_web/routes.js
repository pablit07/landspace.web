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
import { render } from 'react-dom'

const userSource = '/api/users/';

class DesignerRegisterPageRoute extends React.Component {
    render () {
        return <DesignerRegisterPage params={{token: this.props.params.token, email: decodeURIComponent(this.props.params.email), uid: this.props.params.uid}} />;
    }
};

class RegisterPageRoute extends React.Component {
    render () {
        return <RegisterPage params={{token: this.props.params.token, email: decodeURIComponent(this.props.params.email), uid: this.props.params.uid}} />;
    }
};

render((
<Router history={browserHistory}>

	<Route path='/users/account' component={Layout}>
		<IndexRoute component={AccountPage}/>
	</Route>

	<Route path='/users/cart' component={Layout}>
		<IndexRoute component={CartPage}/>
	</Route>

	<Route path='/users' component={LayoutPublic}>

		<Route path='/users/new/designer/:token/:email/:uid' component={DesignerRegisterPageRoute}/>
		<Route path='/users/new/:token/:email/:uid' component={RegisterPageRoute}/>
		<Route path='/users/login' component={LoginPage}/>
		<Route path='/users/login/badfbauth/' component={LoginPage}/>
	    <Route path='/users/password/' component={LoginPage}>
	    	<Route path='/users/password/reset/' component={() => (<ResetPasswordEmail isError={true}/>)}/>
	    	<Route path='/users/password/reset/done/' component={ResetPasswordEmail}/>
	    	<Route path='/users/password/done/' component={ResetPasswordDone}/>
    	</Route>
		<Route path='/users/password/reset/:hash/' component={() => (<LoginPage showPasswordUpdate={true} />)}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
	<Route path='/projects' component={Layout}>
		<IndexRoute component={DashboardPage}/>
	    <Route path="*" component={NotFoundPage}/>
	</Route>
	<Route path='/' component={LayoutPublic}>
		<Route path="*" component={NotFoundPage}/>
	</Route>
</Router>
), document.getElementById('main'));

render((
<Router history={browserHistory}>
	<Route path='/users/account' component={() => (<ProjectsTopNav vertical={true} userSource={userSource} />)}>
		<IndexRoute />
	</Route>
	<Route path='/users/cart' component={() => (<ProjectsTopNav vertical={true} userSource={userSource} />)}>
		<IndexRoute />
	</Route>
	<Route path="/users" component={() => (<TopNav vertical={true} />)}>
		<Route path='/users/login'/>
		<Route path='/users/*'/>
	</Route>
	<Route path='/projects' component={() => (<ProjectsTopNav vertical={true} userSource={userSource} />)}>
		<IndexRoute />
	</Route>
</Router>), document.getElementById('right-drawer'));