import React from 'react';
import { Line } from 'rc-progress';


export default class ProjectProfilePage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		$('.control-group li:first-child').remove();
		$('#main').css({'margin-bottom': '0', 'height': 'auto'});
	}

	render() {
		var formHTML = document.getElementById('project-profile-form').innerHTML;
		var form = { '__html': formHTML } ;


    	
		return (

			<div className='ink-grid full-height'>
				<div className='column-group gutters'>
					<div className="all-90 push-center vertical-space align-center">
						<h1>Fill out this short form to help us better understand your project. </h1>
					</div>
				</div>
				<div className='column-group gutters full-height'>
					<div className="all-40 tiny-90 small-90 medium-55 push-center block projectProfile" dangerouslySetInnerHTML={form}></div>
				</div>
				<div className='column-group gutters'>
					<div className="all-50 tiny-90 small-90 medium-55 push-center align-right">
						<input className="ink-button" type="submit" value="Submit" />
					</div>
				</div>
			</div>
		);
	}
}