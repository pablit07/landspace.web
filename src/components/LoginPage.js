import React from 'react';

export default class LoginPage extends React.Component {
  render() {
    return (
    	<div className='ink-grid vertical-space'>
    	<div className='column-group gutters'>
    	<div className='all-100'>
    	<form method='POST'>
			<p>
			    <label htmlFor="username">Username or Email</label><br />
			    <input id="username" type="text" name="username" />
			  </p>
			  <p>
			    <label htmlFor="password">Password</label><br />
			    <input id="password" type="password" name="password" />
			  </p>
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