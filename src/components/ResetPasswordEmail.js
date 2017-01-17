import React from 'react';

export default class ResetPasswordEmail extends React.Component {

  render() {
	return (<div id='messages' className="all-40 tiny-90 small-90 medium-55 push-center animated slideInDown delay-0">
				<div className="ink-alert basic success">
					<button className="ink-dismiss">&times;</button>
					<p className='note'>We've emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.</p>
					<p className='note'>If you don't receive an email, please make sure you've entered the address you registered with, and check your spam folder.</p>
				</div>
			</div>)
	}
}