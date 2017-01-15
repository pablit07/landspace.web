import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo.js'


export default class ProjectsTopNav extends React.Component {
	render() {
		
		var leftOrientation = (this.props.vertical) ? 'vertical grey' : 'push-left horizontal';
		var rightOrientation = (this.props.vertical) ? 'vertical grey' : 'push-right horizontal';
		var responsiveBtn = (this.props.vertical) ? null : (<li className="hide-all show-tiny show-small show-medium"><a href='#' className="right-drawer-trigger ink-button"><i className='fa fa-bars'></i></a></li>);
		var responsiveClassNames = (this.props.vertical) ? '' : 'show-all hide-medium hide-small hide-tiny';

		var projectsMenu = [
			(<li><a href="#">Smith Backyard</a></li>),
	        (<li className="separator-above"><a href="#"><i className='fa fa-plus'></i> New Project</a></li>)];

		var userMenu = [
			(<li><a href="#">My Account</a></li>),
	        (<li><a href="#">My Cart</a></li>),
	        (<li><a href="#">Invite Friends</a></li>),
	        (<li><a href="#">Support</a></li>),
	        (<li><a href="/users/logout/?next=/users/login/" className='separator-above'>Logout</a></li>)];

        var exploreMenu = [
			(<li><a href="#">Projects</a></li>),
	        (<li><a href="#">Designers</a></li>)];

		if (!this.props.vertical) {
			
			projectsMenu = (
				<li className={responsiveClassNames + " ink-dropdown"} data-target="#my-menu-dropdown1">
				    <button className="ink-button white">My Projects</button>
				    <ul id="my-menu-dropdown1" className="dropdown-menu">
				        {projectsMenu}
				    </ul>
				</li>);

			userMenu = (
				<li className={responsiveClassNames + " ink-dropdown"} data-target="#my-menu-dropdown3">
				    <button className="ink-button white">Jessica Smith <i className='fa fa-user'></i></button>
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
			userMenu.unshift(<li className='heading'>Jessica Smith <i className='fa fa-user'></i></li>);
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