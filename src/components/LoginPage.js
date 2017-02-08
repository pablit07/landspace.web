import React from 'react';
import { writeCsrf } from '../utils.js';

export default class LoginPage extends React.Component {
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
		var rawJson = document.getElementById('id-login-errors').innerHTML;
		
		if (!rawJson) return;

		var errorObj = JSON.parse(rawJson);
			,errors = (!errorObj['__all__']) ? [] : errorObj['__all__'].map(x => x.message);

		delete errorObj['__all__'];

		Object.keys(errorObj).forEach( (key) => {
			errorObj[key].forEach( (msgObj) => { errors.push('' + key + ': ' + msgObj.message); });
		});

		this.setState({'errors': errors});
	}

  render() {

  	var showPasswordUpdate = this.props.showPasswordUpdate;

  	var errorMessages = [];
  	this.state.errors.forEach( (msg) => {
		errorMessages.push(<p className='tip' dangerouslySetInnerHTML={ {'__html':msg} }></p>)
	});

	var errorMessagesHtml = (errorMessages.length ? (<p>{errorMessages}</p>) : false);

	if (this.props.showPasswordUpdate) {
		var invalidLinkText = document.getElementById("id-invalid-link");

		if (invalidLinkText) {
			showPasswordUpdate = false;
			var messages = (<div id='messages' className="all-40 tiny-90 small-90 medium-55 push-center animated slideInDown delay-0">
				<div className="ink-alert basic error">
					<button className="ink-dismiss">&times;</button>
					<p className='note'>{invalidLinkText.innerHTML}</p>
				</div>
			</div>);
		} else {
			var pwUpdate = (<div id='id-change-pw' className='all-40 tiny-90 small-90 medium-55 push-center block animated'>
						<form method="post" className='ink-form'>
							{writeCsrf()}
						    <div className="form-row field-password1 control-group">
						        <label for="id_new_password1">New password:</label>
						        <div className='control'>
						        	<input id="id_new_password1" name="new_password1" type="password" required />
						        </div>
						    </div>
						    <div className="form-row field-password2 control-group">
						        <label for="id_new_password2">Confirm password:</label>
						        <div className='control'>
						        	<input id="id_new_password2" name="new_password2" type="password" required />
					        	</div>
						    </div>
						  <div className='column-group vertical-space'>
						  	<div className='all-50'>
						    	<input type="submit" value="Change My Password" />
						    </div>
						    <div className='all-50'>
						    	<a href='javascript:void(0)' className='left-space ink-toggle' data-target="#id-login-form" data-is-accordion="true" data-initial-state='false' data-class-name-on='' data-class-name-off='hide-all'>Login</a>
					    	</div>
						  </div>
						</form>
					</div>);
			var pwUpdateLink = (<div className='column-group vertical-space'>
								<a href='javascript:void(0)' className='ink-toggle' data-target="#id-change-pw" data-is-accordion="true" data-initial-state='true' data-class-name-on='' data-class-name-off='hide-all'>Change My Password</a>
							</div>);
		}
	}

    return (
    	<div className='ink-grid animated fadeIn duration-2'>
    		<div className='column-group gutters'>
    			{this.props.children}
    			{messages}
			</div>
	    	<div className='column-group gutters accordion'>

	    		<div id='id-reset-password' className="all-40 tiny-90 small-90 medium-55 push-center block hide-all animated duration-0_5">	        
			        <form method='POST' className='ink-form' name='reset-password' action='/users/password/reset/'>
						<div className='control-group'>
						    <label htmlFor="username">Email</label>
						    <div className='control'>
						    	<input type="text" name="email" />
						    </div>
					    </div>
						<p>
							<input type="submit" value="Send Reset Email" />
			        		<a href='javascript:void(0)' className='left-space ink-toggle' data-target="#id-login-form" data-is-accordion="true" data-initial-state={(showPasswordUpdate ? 'false' : 'true')} data-class-name-on='' data-class-name-off='hide-all'>Login</a>
						</p>
						{writeCsrf()}
				    </form>
			    </div>

		    	<div id='id-login-form' className={"all-40 tiny-90 small-90 medium-55 push-center block animated" + (showPasswordUpdate ? ' hide-all' : '')}>
			    	<form method='POST' className='ink-form' action='/users/login/'>
						<div className={"control-group" + (errorMessagesHtml ? ' required' : '')} >
						    <label htmlFor="username">Username or Email</label>
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
						  	{ errorMessagesHtml }
						  <div className='column-group vertical-space'>
						  	<div className='all-30'>
						    	<input type="submit" value="Login" />
						    </div>
						    <div className='all-70'>
						    	<a href='javascript:void(0)' className='ink-toggle' data-target="#id-reset-password" data-is-accordion="true" data-class-name-on='fadeInLeft' data-class-name-off='hide-all'>Forgot Username or Password</a>
					    	</div>
						  </div>
						  {pwUpdateLink}

						<a href={this.state.fbLoginSource} className='ink-button fb-blue'>Login with Facebook</a>
						{writeCsrf()}
					  </form>
				  </div>
			
				  {pwUpdate}
			  
			  </div>
		  </div>
	);
	}
}