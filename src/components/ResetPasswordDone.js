import React from 'react';

export default class ResetPasswordDone extends React.Component {

  render() {
	return (<div id='messages' className="all-40 tiny-90 small-90 medium-55 push-center animated slideInDown delay-0">
				<div className="ink-alert basic success">
					<button className="ink-dismiss">&times;</button>
					<p className='note'>Your password has been set. You may go ahead and log in now.</p>
				</div>
			</div>)
	}
}