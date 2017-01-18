import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo'


export default class TopNav extends React.Component {
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
				    	<a className='logoPlaceholder' href="http://www.landspace.site">
							<Logo />
						</a>
					</li>
			        <li className={responsiveClassNames}><a href='http://www.landspace.site/how-it-works'>How It Works</a></li>
			        <li className={responsiveClassNames}><a href='http://www.landspace.site/blog'>Blog</a></li>
		        </ul>
		        
		        <ul className={rightMenuClassName}>
			        <li><a href='/users/cart'><span className={responsiveClassNames}>Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i></span> <i className={cartResponsiveClassNames} aria-hidden="true"></i></a></li>
			        <li className={responsiveClassNames}><a href='/users/logout/?next=/users/login/'>Sign In</a></li>
		        	<li className={responsiveClassNames}><a href='http://www.landspace.site/survey' className='ink-button'>Sign Up</a></li>
		        	{responsiveBtn}
			    </ul>
			</nav>
);
	}
}