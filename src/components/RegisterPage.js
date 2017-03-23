import React from 'react';
import { browserHistory } from 'react-router';
import { writeCsrf, getCookie } from '../utils';
import userStore from '../stores/UserStore';
import dispatcher from '../Dispatcher';


export default class RegisterPage extends React.Component {
	constructor() {
		super();
		this.state = {
			'fbLoginSource': '',
			// 'createUserSource': '',
			'errors': []
		}
	}

	componentDidMount() {
		$.get('/api/url/?name=social:begin&p1=facebook', (data) => { this.setState({'fbLoginSource': data.url}) });

		this.userStoreToken = userStore.addListener(_ => {
			var newState = userStore.getState();
			this.setState(newState);
		});
		
		if (this.props.params.token) {
			dispatcher.dispatch({
				type: 'user/start-load',
				data: {
					email: this.props.params.email,
					token: this.props.params.token
				}
			});
		}
	}

	componentWillReceiveProps() {
		var authTokenSource;
		
		$.get('/api/url/?name=designer-token-auth', (data) => { authTokenSource = data.url }).done(_ => {
			$.post(authTokenSource, {
				email: this.props.params.email,
				token: this.props.params.token
			}).done( (data) => {
				this.setState(data);
			}).fail( () => { this.setState({'isDisabled': true}); this.setState({'errors': ['Service error. Please contact our support team.']})});
		});
	}

	componentWillUnmount() {
		this.userStoreToken.remove();
	}

	getFbButton() {
		return (<a href={this.state.fbLoginSource + '?social_auth_new_user_allowed=1'} className='ink-button fb-blue'>Sign Up With Facebook</a>);
	}

	getFormFields(errorMessagesHtml) {
		var style = {
			'cursor': 'crosshair'
		}
		return [
		(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')} >
		    <label htmlFor="username">Sign-in with your email address</label>
		    <div className='control'>
		    	<input id="username" type="text" name="username" disabled='disabled' value={this.props.params.email} style={style}/>
		    </div>
	    </div>),
	    (<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="firstName" className="all-45">First Name</label>
		    <label htmlFor="lastName" className="all-45 left-space">Last Name</label>
		    <div className='control all-45'>
		    	<input id="firstName" type="text" name="firstName"/>
	    	</div>
	    	<div className='control all-45 left-space'>
		    	<input id="lastName" type="text" name="lastName"/>
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
			this.validatePassword(form).done(_ => {
				this.saveForm(form);
			});
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

		if (!form.firstName.value) {
			errors.push('first name: This field is required.')
		}

		if (!form.lastName.value) {
			errors.push('last name: This field is required.')
		}

		return errors;
	}

	validatePassword(form) {
		var result = $.Deferred();

		$.get('/api/url/?name=users-api-validatepassword').done((data) => {
			$.ajax({
				url: data.url,
				headers: {
					'X-CSRFToken': getCookie('csrftoken')
				},
				type: 'POST',
				data: {
					password: form.password.value
				}
			}).done((data) => {
				if (data.errors && data.errors.length) {
					var errors = this.state.errors;
					errors = errors.concat(data.errors);
					this.setState({'errors': errors});
					result.reject();
				} else {
					result.resolve();
				}
			});
		});

		return result;
	}


	saveForm(form) {
		var userDataSource,
			pwUpdateSource,
			authHeader = 'token ' + this.state.token;

		$.get('/api/url/?name=password-reset-confirm&p1=' + this.props.params.uid + '&p2=' + this.props.params.token, (data) => { pwUpdateSource = data.url });
		$.get('/api/url/?name=users-api&p1=' + this.state.id, (data) => { this.setState({'userDataSource': userDataSource = data.url}) }).done( _ => {
			$.ajax({
				url: userDataSource,
				headers: {
					'X-CSRFToken': getCookie('csrftoken'),
					'Authorization': authHeader
				},
				success: (data) => {
					var p1, p2 = $.Deferred(); //promises

					// name update
					p1 = $.ajax({
						headers: {
							'X-CSRFToken': getCookie('csrftoken'),
							'Authorization': authHeader
						},
						method: 'PATCH',
						url: userDataSource,
						data: {
							'first_name': form.firstName.value,
							'last_name': form.lastName.value
						}
					}).fail(_ => { this.setState({'errors': ['A problem occurred. Please try again later.']})});
					// password update
					$.when(p1).done(_ => {
											
						p2 = $.ajax({
							headers: {
								'X-CSRFToken': getCookie('csrftoken')
							},
							method: 'POST',
							url: pwUpdateSource,
							data: {
								'new_password1': form.password.value,
								'new_password2': form.password2.value
							}
						}).fail(_ => { this.setState({'errors': ['A problem occurred. Please try again later.']})});

						// trigger login
						$.when(p1, p2).done(_ => {
							var interval = setInterval(_ => {
								if (p1.responseText && p2.responseText) {
									clearInterval(interval);
									$('#loginUsername').val(this.props.params.email);
									$('#loginPassword').val(form.password.value);
									$('form[name="login"]')[0].submit();
								}							
							}, 100);
						});
					});

				}
			});
		});
	}

	getSubmitButton() {
		return (<input type="submit" value="Create My Account" />);
	}

	signUpWithEmail() {
		var authTokenSource;

		$.get('/api/url/?name=clients-register-url-api').done((data) => {
			$.ajax({
				url: data.url,
				headers: {
					'X-CSRFToken': getCookie('csrftoken')
				},
				type: 'POST',
				data: {
					email: this.props.params.email
				}
			}).done((data) => {
				browserHistory.push(data.url);
			}).fail(_ => { this.setState({errors: ['Unable to register, please contact our support team.']})});
		});
	}

  render() {

  	var errorMessages = [];
  	this.state.errors.forEach( (msg) => {
		errorMessages.push(<p className='tip' dangerouslySetInnerHTML={ {'__html':msg} }></p>)
	});

	var errorMessagesHtml = (errorMessages.length ? (<p>{errorMessages}</p>) : false);
	var messages = null;
	var formFields = this.props.params.token ? this.getFormFields(errorMessagesHtml) : null;
	var createButtons = !this.props.params.token ? (<div className='all-100 align-center'>
						  		<div className='all-50 tiny-90 small-90 vertical-space right-space' >
						  			<a className='ink-button' onClick={this.signUpWithEmail.bind(this)}>Sign Up With Email</a>
					  			</div>
								<div className='all-30 tiny-90 small-90 vertical-space' >{this.getFbButton()}</div>
							</div>) : null;
	var submitButton = this.props.params.token ? (<div className='all-30'>
						    	{this.getSubmitButton()}
						    </div>) : null;

    return (
    	<div className='ink-grid animated fadeIn duration-2'>
    		<div className='column-group gutters'>
    			{this.props.children}
    			{messages}
			</div>

	    	<div className='column-group gutters'>
	    		<div className='all-40 tiny-100 small-100 medium-65 push-center'>		    		
    				<div className='left-space'><h1>Welcome.</h1>
		    			<img className='all-100 small-65' src='http://i.imgur.com/muAijfD.png'/>
	    			</div>
	    		</div>

		    	<div id='id-register-form' className="all-60 tiny-90 small-90 medium-55 push-center block animated">
			    	<form name='register' method='POST' className='ink-form' onSubmit={this.handleSubmit.bind(this)}>
							{ formFields }
						  	{ errorMessagesHtml }
						  <div className='column-group vertical-space'>
						  	{createButtons}
						  	{submitButton}
						  </div>
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