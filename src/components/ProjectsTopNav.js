import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo.js'
import userStore from '../stores/UserStore';
import dispatcher from '../Dispatcher';


export default class ProjectsTopNav extends React.Component {
	constructor(props) {
		super();
		this.state = {
			'firstName': '',
			'lastName': '',
			'projects': []
		};
	}

	projectsDataSource(props) {
		var props = props || this.props;
		if (!props.userSource) {
			console.error('userSource prop not found')
			return;
		}

		$.get(props.userSource + window.userId + '/projects', (data) => {
			this.setState({
				'projects': data['results']
			});
		});
	}

	componentDidMount() {
		// this.userDataSource();

		this.userStoreToken = userStore.addListener(_ => {
			var newState = userStore.getState();
			this.setState({
				'firstName': newState['first_name'],
				'lastName': newState['last_name'],
				'designerSource': newState['designer'],
				'clientSource': newState['client']
			});

			if (newState['designer']) {
				var designerProjectsStore = require('../stores/DesignerProjectsStore').default;
				this.setState({projects: designerProjectsStore.getState().designerProjects});
				this.designerProjectsStoreToken = designerProjectsStore.addListener(_ => {
					var newState = designerProjectsStore.getState();
					this.setState({projects: newState.designerProjects});
				});
			} else {
				this.projectsDataSource();
			}
		});

		dispatcher.dispatch({
			type: 'user/start-load'
		});
	}

	componentWillUnmount() {
		this.userStoreToken.remove();
		// designerProjectsStore.removeListener(this.designerProjectsStoreToken);
	}

	componentWillReceiveProps(props) {
		
	}

	render() {
		
		var leftOrientation = (this.props.vertical) ? 'vertical grey' : 'push-left horizontal';
		var rightOrientation = (this.props.vertical) ? 'vertical grey' : 'push-right horizontal';
		var responsiveBtn = (this.props.vertical) ? null : (<li className="hide-all show-tiny show-small show-medium"><a href='#' className="right-drawer-trigger ink-button"><i className='fa fa-bars'></i></a></li>);
		var responsiveClassNames = (this.props.vertical) ? '' : 'show-all hide-medium hide-small hide-tiny';

		var projectsMenu = [];

		this.state.projects.forEach( (p) => {
			projectsMenu.push(<li><a href={"/projects/designer/"+p.id+'/'}>{p.name}</a></li>);
		});

		if (projectsMenu.length == 0) {
			projectsMenu.push(<li className='inline'><div className={'a'+(this.props.vertical?' note':'')}>You have no projects.</div></li>);
			if (this.state.designerSource) {
				projectsMenu.push(<li className="separator-above"><a href="/projects/designer/"><i className='fa fa-asterisk'></i> All Projects</a></li>);
			} else {
				projectsMenu.push(<li className="separator-above"><a href="/projects/create/"><i className='fa fa-plus'></i> New Project</a></li>);	
			}
		} else {
			if (this.state.designerSource) {
				projectsMenu.push(<li className="separator-above"><a href="/projects/designer/"><i className='fa fa-asterisk'></i> All Projects</a></li>);
			} else {
				projectsMenu.push(<li className="separator-above"><a href="/projects/create/"><i className='fa fa-plus'></i> New Project</a></li>);	
			}
		}		

		var userMenu = [
			(<li><Link to="/users/account">My Account</Link></li>),
	        (<li><Link to='/users/cart'>My Cart</Link></li>),
	        // (<li><a href="http://www.landspace.site">Invite Friends</a></li>),
	        // (<li><a href="http://www.landspace.site">Support</a></li>),
	        (<li><a href="/users/logout/?next=/users/login/" className='separator-above'>Logout</a></li>)];

        var exploreMenu = [
			(<li><a href="http://www.landspace.site/moreau">Projects</a></li>),
	        (<li><a href="http://www.landspace.site/designers/">Designers</a></li>)];

		if (!this.props.vertical) {
			
			projectsMenu = (
				<li className={responsiveClassNames + " ink-dropdown"} data-target="#id-projects-dropdown">
				    <button className="ink-button white">My Projects</button>
				    <ul id="id-projects-dropdown" className="dropdown-menu">
				        {projectsMenu}
				    </ul>
				</li>);

			userMenu = (
				<li className={responsiveClassNames + " ink-dropdown"} data-target="#my-menu-dropdown3">
				    <button className="ink-button white">{this.state.firstName} {this.state.lastName} <i className='fa fa-user'></i></button>
				    <ul id="my-menu-dropdown3" className="dropdown-menu">
				    {userMenu}
				    </ul>
				</li>);

			exploreMenu = (
				<li className={responsiveClassNames + " ink-dropdown"} data-target="#my-menu-dropdown2">
				    <button className="ink-button white">Explore</button>
				    <ul id="my-menu-dropdown2" className="dropdown-menu">
				        {exploreMenu}
				    </ul>
				</li>);

		} else {
			projectsMenu.unshift(<li className='heading separator-above separator-below'>Projects</li>);
			userMenu.unshift(<li className='heading'>{this.state.firstName} {this.state.lastName} <i className='fa fa-user'></i></li>);
			exploreMenu.unshift(<li className='heading'>Explore</li>)
		}

		var spacerStyle = (this.props.vertical) ? {'border-bottom':'1px solid rgba(0,0,0,.15)'} : null;
		var paddingStyle = (this.props.vertical) ? {'padding':'0'} : null;

		var leftMenuClassName = 'menu white ' + leftOrientation;
		var rightMenuClassName = 'menu white ' + rightOrientation;

		return (
			<nav className="ink-navigation ink-grid" style={paddingStyle}>
			    <ul className={leftMenuClassName} style={spacerStyle}>
			    	<li>
				    	<a className='logoPlaceholder' href="http://www.landspace.site">
							<Logo />
						</a>
					</li>
			        {projectsMenu}
		        </ul>
		        <ul className={rightMenuClassName}>
			        {exploreMenu}
					{userMenu}
					{responsiveBtn}
			    </ul>
			</nav>
);
	}
}

		        	// <li className='heading'>Test</li>
//