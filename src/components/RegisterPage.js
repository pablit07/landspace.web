import React from 'react';
import { writeCsrf, getCookie } from '../utils.js';

export default class RegisterPage extends React.Component {
	constructor() {
		super();
		this.state = {
			'fbLoginSource': '',
			'createUserSource': '',
			'errors': []
		}
	}

	componentDidMount() {
		$.get('/api/url/?name=social:begin&p1=facebook', (data) => { this.setState({'fbLoginSource': data.url}) });
		$.get('/api/url/?name=users-api-create', (data) => { this.setState({'createUserSource': data.url}) });
	}

	getFbButton() {
		return (<a href={this.state.fbLoginSource + '?social_auth_new_user_allowed=1'} className='ink-button fb-blue'>Sign Up With Facebook</a>);
	}

	getFormFields(errorMessagesHtml) {
		return [
		(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')} >
		    <label htmlFor="username">Email</label>
		    <div className='control'>
		    	<input id="username" type="text" name="username" />
		    </div>
	    </div>),
		(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="password">Password</label>
		    <div className='control'>
		    	<input id="password" type="password" name="password" />
	    	</div>
	  	</div>),
	  	(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="password2">Password (Confirm)</label>
		    <div className='control'>
		    	<input id="password2" type="password" name="password2" />
	    	</div>
	  	</div>)
	  	];
	}

	handleSubmit(event) {
		event.preventDefault();
		
		var errors = [],
			form = event.target

		errors = this.validate(form);
		if (!errors.length) {
			this.saveForm(form);
		} else {
			this.setState({errors: errors});
		}
	}

	validate(form) {
		var errors = [];

		if (!form.password.value || !form.password2.value) {
			errors.push('password: This field is required.')
		} else if (form.password.value != form.password2.value) {
			errors.push('Passwords must match.')
		}

		return errors;
	}

	saveForm(form) {
		$.post({
			url: this.state.createUserSource,
			headers: {
				'X-CSRFToken': getCookie('csrftoken')
			},
			data: {

			}
		});
	}

	getSubmitButton() {
		return (<input type="submit" value="Create My Account" />);
	}

  render() {

  	var errorMessages = [];
  	this.state.errors.forEach( (msg) => {
		errorMessages.push(<p className='tip' dangerouslySetInnerHTML={ {'__html':msg} }></p>)
	});

	var errorMessagesHtml = (errorMessages.length ? (<p>{errorMessages}</p>) : false);
	var messages = null;
	var formFields = this.getFormFields(errorMessagesHtml);
	var fbButton = this.getFbButton();
	var submitButton = this.getSubmitButton();

    return (
    	<div className='ink-grid animated fadeIn duration-2'>
    		<div className='column-group gutters'>
    			{this.props.children}
    			{messages}
			</div>
	    	<div className='column-group gutters'>

		    	<div id='id-register-form' className="all-40 tiny-90 small-90 medium-55 push-center block animated">
			    	<form name='register' method='POST' className='ink-form' onSubmit={this.handleSubmit.bind(this)}>
							{ formFields }
						  	{ errorMessagesHtml }
						  <div className='column-group vertical-space'>
						  	<div className='all-30'>
						    	{submitButton}
						    </div>
						  </div>
						{fbButton}
						{writeCsrf()}
					  </form>
					  <form name='login' method='POST' action='/users/login/'>
					  	<input type='hidden' name='username' id='loginUsername'/>
					  	<input type='hidden' name='password' id='loginPassword'/>
					  	{writeCsrf()}
					  </form>
				  </div>
			  
			  </div>
		  </div>
	);
	}
}