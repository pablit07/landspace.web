import React from 'react';
import { writeCsrf } from '../utils.js';
import RegisterPage from './RegisterPage';

export default class DesignerRegisterPage extends RegisterPage {
	constructor() {
		super();
		this.state.authTokenSource = '';
		this.state.isDisabled = false;
	}

	componentDidMount() {
		var authTokenSource;

		$.get('/api/url/?name=users-api-create', (data) => { this.setState({'createUserSource': data.url}) });
		$.get('/api/url/?name=designer-token-auth', (data) => { authTokenSource = data.url }).done(_ => {
			$.post(authTokenSource, {
				email: this.props.params.email,
				token: this.props.params.token
			}).done( (data) => { this.setState({'authToken': data.token, 'userId': data.id})})
			  .fail( () => { this.setState({'isDisabled': true}); this.setState({'errors': ['Service error. Please contact our support team.']})});
		});
	}

	getFbButton() {
		return null;
	}

	getFormFields(errorMessagesHtml) {
		var formFields = super.getFormFields(errorMessagesHtml);

		var emailField = formFields.shift();

		formFields.unshift(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="zip">Zip Code</label>
		    <div className='control'>
		    	<input id="zip" type="text" name="zip" pattern="[0-9]{5}" maxLength="5" minLength="5"/>
	    	</div>
	  	</div>);


		formFields.unshift(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="firstName" className="all-45">First Name</label>
		    <label htmlFor="lastName" className="all-45 left-space">Last Name</label>
		    <div className='control all-45'>
		    	<input id="firstName" type="text" name="firstName"/>
	    	</div>
	    	<div className='control all-45 left-space'>
		    	<input id="lastName" type="text" name="lastName"/>
	    	</div>

	  	</div>);

	  	return formFields;
	}

	getSubmitButton() {
		if (this.state.isDisabled) {
			return null;
		} else {
			return super.getSubmitButton();
		}
	}

	validate(form) {
		var errors = super.validate(form);

		if (!form.firstName.value) {
			errors.push('first name: This field is required.')
		}

		if (!form.lastName.value) {
			errors.push('last name: This field is required.')
		}

		if (!form.zip.value) {
			errors.push('zip code: This field is required.')
		} else if (!/[0-9]{5}/.test(form.zip.value)) {
			errors.push('zip code: Please enter a 5 digit zip code.')
		}

		return errors;
	}

	saveForm(form) {
		var userDataSource,
			pwUpdateSource,
			authHeader = 'token ' + this.state.authToken;

		$.get('/api/url/?name=password-reset-confirm&p1=' + this.props.params.uid + '&p2=' + this.props.params.token, (data) => { pwUpdateSource = data.url });
		$.get('/api/url/?name=users-api&p1=' + this.state.userId, (data) => { this.setState({'userDataSource': userDataSource = data.url}) }).done( _ => {
			$.ajax({
				url: userDataSource,
				headers: {
					'X-CSRFToken': getCookie('csrftoken'),
					'Authorization': authHeader
				},
				success: (data) => {
					var p1, p2, p3 = $.Deferred(); //promises
					// zip update
					p1 = $.ajax({
						headers: {
							'X-CSRFToken': getCookie('csrftoken'),
							'Authorization': authHeader
						},
						method: 'PATCH',
						url: data.designer,
						data: {
							region: form.zip.value
						}
					}).fail(_ => { this.setState({'errors': ['A problem occurred. Please try again later.']})});
					// name update
					p3 = $.ajax({
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
					$.when(p1, p3).done(_ => {
											
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
						$.when(p1, p2, p3).done(_ => {
							var interval = setInterval(_ => {
								if (p1.responseText && p2.responseText && p3.responseText) {
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
}