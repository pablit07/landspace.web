import React from 'react';
import { writeCsrf } from '../utils.js';
import RegisterPage from './RegisterPage';

export default class DesignerRegisterPage extends RegisterPage {

	getFormFields(errorMessagesHtml) {
		var formFields = super.getFormFields(errorMessagesHtml);

		var emailField = formFields.shift();

		formFields.unshift(<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
		    <label htmlFor="region">Zip Code</label>
		    <div className='control'>
		    	<input id="region" type="text" name="region" pattern="[0-9]{5}" maxLength="5" minLength="5"/>
	    	</div>
	  	</div>);

	  	// formFields.unshift(emailField);

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
}