import React from 'react';
import { writeCsrf } from '../utils.js';

export default class RegisterPage extends React.Component {
	constructor() {
		super();
		this.state = {
			'fbLoginSource': '',
			'errors': []
		}
	}

	componentDidMount() {
		$.get('/api/url/?name=social:begin&p1=facebook', (data) => { this.setState({'fbLoginSource': data.url}) });
		this.getFormErrors();
	}

	getFormErrors() {
		var errorObj = JSON.parse(document.getElementById('id-login-errors').innerHTML)
			,errors = (!errorObj['__all__']) ? [] : errorObj['__all__'].map(x => x.message);

		delete errorObj['__all__'];

		Object.keys(errorObj).forEach( (key) => {
			errorObj[key].forEach( (msgObj) => { errors.push('' + key + ': ' + msgObj.message); });
		});

		this.setState({'errors': errors});
	}

  render() {

  	var errorMessages = [];
  	this.state.errors.forEach( (msg) => {
		errorMessages.push(<p className='tip' dangerouslySetInnerHTML={ {'__html':msg} }></p>)
	});

	var errorMessagesHtml = (errorMessages.length ? (<p>{errorMessages}</p>) : false);
	var messages = null;

    return (
    	<div className='ink-grid animated fadeIn duration-2'>
    		<div className='column-group gutters'>
    			{this.props.children}
    			{messages}
			</div>
	    	<div className='column-group gutters'>

		    	<div id='id-register-form' className="all-40 tiny-90 small-90 medium-55 push-center block animated">
			    	<form method='POST' className='ink-form' action='/users/login/'>
						<div className={"control-group" + (errorMessagesHtml ? ' required' : '')} >
						    <label htmlFor="username">Email</label>
						    <div className='control'>
						    	<input id="username" type="text" name="username" />
						    </div>
					    </div>
						<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
						    <label htmlFor="password">Password</label>
						    <div className='control'>
						    	<input id="password" type="password" name="password" />
					    	</div>
					  	</div>
					  	<div className={"control-group" + (errorMessagesHtml ? ' required' : '')}>
						    <label htmlFor="password">Password (Confirm)</label>
						    <div className='control'>
						    	<input id="password2" type="password" name="password2" />
					    	</div>
					  	</div>
						  	{ errorMessagesHtml }
						  <div className='column-group vertical-space'>
						  	<div className='all-30'>
						    	<input type="submit" value="Finish" />
						    </div>
						  </div>

						<a href={this.state.fbLoginSource + '?social_auth_new_user_allowed=1'} className='ink-button fb-blue'>Sign Up With Facebook</a>
						{writeCsrf()}
					  </form>
				  </div>
			  
			  </div>
		  </div>
	);
	}
}