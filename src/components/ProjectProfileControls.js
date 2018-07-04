import ProjectProfileControl from '../containers/ProjectProfileControl';
import { ProjectProfileControlActions } from '../actions';
import React from 'react';


export default class Controls extends React.Component {

	render() {
		return (
			<div className='column-group gutters'>
				<div className="all-40 tiny-90 small-90 medium-55 push-center">
					<div className='all-50'>
						<ProjectProfileControl action={ProjectProfileControlActions.BACK}>
							<i className="fa fa-angle-double-left"></i>&nbsp; Back
						</ProjectProfileControl>
				    </div>

				    <div className="all-50">

						<ProjectProfileControl action={ProjectProfileControlActions.NEXT}>
							Next &nbsp;<i className="fa fa-angle-double-right"></i>
						</ProjectProfileControl>

		      	  		<ProjectProfileControl action={ProjectProfileControlActions.SUBMIT}/>
			      </div>
					
				</div>
			</div>);
	}
}