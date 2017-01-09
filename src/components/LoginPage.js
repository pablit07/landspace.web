import React from 'react';

export default class LoginPage extends React.Component {
  render() {
    return (
    	<div className='ink-grid'>
    	<div className='column-group gutters'>
    	<div className='all-33 push-center'>
    	<form method='POST' className='ink-form'>
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
			  </p>
			<a href="/auth/facebook">Login with Facebook</a>
		  </form>
		  </div>
		  </div>
		  </div>
	);
	}
}