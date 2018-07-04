import { connect } from 'react-redux';
import ProjectProfileCheckbox from '../components/ProjectProfileCheckbox';
import { updateProjectProfileField } from '../actions';


const ProjectProfileCheckboxContainer = connect(
	(state, ownProps) => {
		console.info(ownProps);
		return {};
	},
	(dispatch, ownProps) => {
		return {
			onChange: (event) => {
				dispatch(updateProjectProfileField(event.target.checked, ownProps.id, "checkbox", ownProps.label));
			}
		};
	}
)(ProjectProfileCheckbox);


export default ProjectProfileCheckboxContainer;