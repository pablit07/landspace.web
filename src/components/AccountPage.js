import React from 'react';
import { writeCsrf, getCookie } from '../utils.js';

export default class AccountPage extends React.Component {
	constructor() {
		super();
		this.state = {
			'email': '',
			'firstName': '',
			'lastName': ''
		}
	}

	componentDidMount() {
		var userDataSource;
		$.get('/api/url/?name=users-api&p1=' + userId, (data) => { this.setState({'userDataSource': userDataSource = data.url}) }).done( _ => {
			$.get(userDataSource, (data) => {
				this.setState({
					'email': data.email,
					'firstName': data.first_name,
					'lastName': data.last_name
				});
			});
		});
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}

	handleFirstNameChange(event) {
		this.setState({firstName: event.target.value});
	}

	handleLastNameChange(event) {
		this.setState({lastName: event.target.value});
	}

	handleSubmit(event) {
		$.ajax({
			headers: {
				'X-CSRFToken': getCookie('csrftoken')
			},
			method: 'PATCH',
			url: this.state.userDataSource,
			data: {
				email: this.state.email,
				first_name: this.state.firstName,
				last_name: this.state.lastName
			}
		})
		event.preventDefault();
	}

  render() {

    return (
    	<div className='ink-grid animated'>
	    	<div className='column-group'>

		    	<div id='id-account-form' className="all-40 tiny-90 small-90 medium-55 push-center block vertical-space">
		    		<h1>My Account</h1>
			    	<form method='POST' className='ink-form' onSubmit={this.handleSubmit.bind(this)}>
						<div className='control-group'>
						    <label htmlFor="email" className='all-20'>Email</label>
						    <div className='control all-80'>
						    	<input id="email" type="text" name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
						    </div>
					    </div>
					    <div className='control-group'>
						    <label htmlFor="firstName" className='all-20'>First Name</label>
						    <div className='control all-80'>
						    	<input id="firstName" type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange.bind(this)}/>
						    </div>
					    </div>
					    <div className='control-group'>
						    <label htmlFor="lastName" className='all-20'>Last Name</label>
						    <div className='control all-80'>
						    	<input id="lastName" type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange.bind(this)}/>
						    </div>
					    </div>
						
						{writeCsrf()}
						<input type="submit" value="Save"/>
					  </form>
				  </div>

			  </div>
		  </div>
	);
	}
}