import React from 'react';

export default class ResetPasswordEmail extends React.Component {

  render() {
  	var successMessage = [(<p className='note'>We've emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.</p>),
					(<p className='note'>If you don't receive an email, please make sure you've entered the address you registered with, and check your spam folder.</p>)];
	var errorMessage = (<p className='note'>There was a problem resetting your email. Check your email address and try again.</p>);
	var message = this.props.isError ? errorMessage : successMessage;

	return (<div id='messages' className="all-40 tiny-90 small-90 medium-55 push-center animated slideInDown delay-0">
				<div className={"ink-alert basic "+(this.props.isError ? 'error': 'success')}>
					<button className="ink-dismiss">&times;</button>
					{ message }
				</div>
			</div>)
	}
}