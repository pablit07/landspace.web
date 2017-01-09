import React from 'react';
import { Link } from 'react-router';


export default class TopNav extends React.Component {
	render() {
		return (
			<nav className="ink-navigation">
			    <ul className="menu horizontal white">
			    	<li>
				    	<a href="http://www.landspace.site">
							<img className="logo" src="/img/landspace-logo.png" width='150' height='30'/>
						</a>
					</li>
			        <li><a href='http://www.landspace.site/how-it-works'>How It Works</a></li>
			        <li><a href='http://www.landspace.site/blog'>Blog</a></li>
			        <li><Link to='/my_cart'>Cart <i class="fa fa-shopping-cart" aria-hidden="true"></i></Link></li>
			        <li><Link to='/login'>Sign In</Link></li>
		        	<li><a href='http://www.landspace.site/survey' className='ink-button'>Sign Up</a></li>
			    </ul>
			</nav>
);
	}
}