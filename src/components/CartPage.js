import React from 'react';
import { writeCsrf } from '../utils.js';

export default class CartPage extends React.Component {
	constructor() {
		super();
		this.state = {
			'email': ''
		}
	}

	componentDidMount() {
		var userDataSource;
		$.get('/api/url/?name=users-api&p1=' + userId, (data) => { this.setState({'userDataSource': userDataSource = data.url}) }).done( _ => {
			$.get(userDataSource, (data) => {
				this.setState({'email': data.email});
			});
		});
	}

  render() {

    return (
    	<div className='ink-grid animated'>
	    	<div className='column-group'>

		    	<div id='id-login-form' className="all-40 tiny-90 small-90 medium-55 push-center block vertical-space">
		    		<h1>My Cart</h1>
			    	<form method='POST' className='ink-form'>
						<p className='note'>Your cart is empty</p>
						
						{writeCsrf()}
					  </form>
				  </div>

			  </div>
		  </div>
	);
	}
}