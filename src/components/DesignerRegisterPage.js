import React from 'react';
import { writeCsrf } from '../utils.js';
import RegisterPage from './RegisterPage';

export default class DesignerRegisterPage extends RegisterPage {
	constructor() {
		super();
		this.state.authTokenSource = '';
		this.state.isDisabled = false;
		this.state.zip = '';
	}

	componentDidMount() {
		var authTokenSource;

		$.get('/api/url/?name=users-api-create', (data) => { this.setState({'createUserSource': data.url}) });
		$.get('/api/url/?name=designer-token-auth', (data) => { authTokenSource = data.url }).done(_ => {
			$.post(authTokenSource, {
				email: this.props.params.email,
				token: this.props.params.token
			}).done( (data) => {
				this.setState({'authToken': data.token, 'userId': data.id});
				var authHeader = 'token ' + data.token;
				$.get('/api/url/?name=users-api&p1='+data.id, (data) => {
					$.ajax({url:data.url, headers:{'Authorization': authHeader}, success:(data) => {
						$.ajax({url:data.designer, headers:{'Authorization': authHeader}, success:(data) => {
							this.setState({zip: data.region});
						}});
					}});
				});
			}).fail( () => { this.setState({'isDisabled': true}); this.setState({'errors': ['Service error. Please contact our support team.']})});
		});
	}

	getFbButton() {
		return null;
	}

	getFormFields(errorMessagesHtml) {
		var formFields = super.getFormFields(errorMessagesHtml);

		formFields.splice(1, 0, (<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="zip">Zip Code</label>
		    <div className='control'>
		    	<input id="zip" type="text" name="zip" pattern="[0-9]{5}" maxLength="5" minLength="5" disabled='disabled' value={this.state.zip}/>
	    	</div>
	  	</div>));


		formFields.unshift();

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
		var authHeader = 'token ' + this.state.authToken,
			userDataSource;

		$.get('/api/url/?name=users-api&p1=' + this.state.userId, (data) => { this.setState({'userDataSource': userDataSource = data.url}) }).done( _ => {
			$.ajax({
				url: userDataSource,
				headers: {
					'X-CSRFToken': getCookie('csrftoken'),
					'Authorization': authHeader
				},
				success: (data) => {
					var p1 = $.Deferred();
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

					$.when(p1).done(_ => {
						super.saveForm(form);
					});
				}
			});
		});
	}
}