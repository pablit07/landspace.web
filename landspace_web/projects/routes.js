import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Layout from '../../src/components/Layout';
import DashboardPage from '../../src/components/DashboardPage';
import NotFoundPage from '../../src/components/NotFoundPage';
import ProjectsTopNav from '../../src/components/ProjectsTopNav';
import ProjectProfilePage from '../../src/components/ProjectProfilePage';
import DesignerProjectsPage from '../../src/components/DesignerProjectsPage';
import ImageUploadDashboardPage from '../../src/components/ImageUploadDashboardPage';
import { render } from 'react-dom'

const userSource = '/api/users/';


class DesignerProjectsPageRoute extends React.Component {
    render () {
        return <DesignerProjectsPage params={{id: this.props.params.id}} />;
    }
};


export var projectRoutes = <Router history={browserHistory}>
	<Route path='/projects' component={Layout}>
		<IndexRoute component={DashboardPage}/>
		<Route path='/projects/imageupload/' component={ImageUploadDashboardPage}/>
		<Route path='/projects/designer/:id/' component={DesignerProjectsPageRoute}/>
		<Route path='/projects/designer/' component={DesignerProjectsPage}/>
		<Route path='/projects/create/' component={ProjectProfilePage}/>
	    <Route path="*" component={NotFoundPage}/>
	</Route>
</Router>;

export var projectRightDrawerRoutes =
<Router history={browserHistory}>
	<Route path='/projects' component={() => (<ProjectsTopNav vertical={true} userSource={userSource} />)}>
		<IndexRoute />
		<Route path='/projects/designer/'/>
		<Route path='/projects/imageupload/' />
	</Route>
</Router>;