import React from 'react';

export default class ResetPasswordEmail extends React.Component {

  render() {
	return (<div id='messages' className="all-40 tiny-90 small-90 medium-55 push-center animated slideInDown delay-0">
				<div className="ink-alert basic">
					<button className="ink-dismiss">&times;</button>
					<p className='note'>Please enter your new password twice so we can verify you typed it in correctly.</p>
				</div>
			</div>)
	}
}