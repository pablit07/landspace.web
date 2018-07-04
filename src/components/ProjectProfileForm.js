import React from 'react';
import PropTypes from 'prop-types'
import ProjectProfileField from '../containers/ProjectProfileField';
import { Line } from 'rc-progress';


const ProjectProfileForm = ({activeQuestion, percentComplete}) => {

	return (
		<form id="ProjectProfile" method="POST" className="ink-form" name="project-profile" action="">
			<label>{percentComplete}% Complete</label>
 			<Line percent={percentComplete} strokeWidth="5" strokeColor="#66b14b" />
 			
 			<ProjectProfileField id={activeQuestion.key} choices={activeQuestion.choices} widget_type={activeQuestion.widget_type}>
				<label htmlFor={`id_${activeQuestion.key}`}>{activeQuestion.label}</label>	
			</ProjectProfileField>

		</form>
	);
}

ProjectProfileForm.propTypes = {
	activeQuestion: PropTypes.number, 
	percentComplete: PropTypes.number
}

export default ProjectProfileForm;