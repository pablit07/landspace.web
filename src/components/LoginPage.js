import React from 'react';
import { writeCsrf } from '../utils.js';

export default class LoginPage extends React.Component {

  render() {

	if (this.props.pwResetEmail) {
		var messages = (<div id='messages' className="ink-alert basic all-40 tiny-90 small-90 medium-55 push-center block animated slideInDown delay-0">
						<button className="ink-dismiss">&times;</button>
	    				<p className='note'>We've emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.</p>
						<p className='note'>If you don't receive an email, please make sure you've entered the address you registered with, and check your spam folder.</p>
	    			</div>);
	}

    return (
    	<div className='ink-grid animated fadeIn duration-2'>
	    	<div className='column-group gutters accordion'>
	    		{ messages }
	    		<div id='id-reset-password' className="all-40 tiny-90 small-90 medium-55 push-center block hide-all animated duration-0_5">
			        
			        <form method='POST' className='ink-form' name='reset-password' action='/users/password/reset/'>
						<div className='control-group'>
						    <label htmlFor="username">Email</label>
						    <div className='control'>
						    	<input type="text" name="email" />
						    </div>
					    </div>
						<p>
							<input type="submit" value="Reset" />
			        		<a href='javascript:void(0)' className='left-space ink-toggle' data-target="#id-login-form" data-is-accordion="true" data-initial-state="true" data-class-name-on='' data-class-name-off='hide-all'>Login</a>
						</p>
						{writeCsrf()}
				    </form>
			    </div>

		    	<div id='id-login-form' className='all-40 tiny-90 small-90 medium-55 push-center block animated'>
			    	<form method='POST' className='ink-form' action='/login/'>
						<div className='control-group'>
						    <label htmlFor="username">Username or Email</label>
						    <div className='control'>
						    	<input id="username" type="text" name="username" />
						    </div>
					    </div>
						<div className='control-group'>
						    <label htmlFor="password">Password</label>
						    <div className='control'>
						    	<input id="password" type="password" name="password" />
					    	</div>
					  	</div>
						  <p data-spIf="form.error">
						    <strong>Error:</strong><br />
						    <span data-spBind="form.errorMessage" />
						  </p>
						  <p>
						    <input type="submit" value="Login" />
						    <a href='javascript:void(0)' className='left-space ink-toggle' data-target="#id-reset-password" data-is-accordion="true" data-class-name-on='fadeInLeft' data-class-name-off='hide-all'>Forgot Username or Password</a>
						  </p>

						<a href="/auth/facebook" className='ink-button blue'>Login with Facebook</a>
						{writeCsrf()}
					  </form>
				  </div>
			  </div>
		  </div>
	);
	}
}