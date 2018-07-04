import { connect } from 'react-redux';
import ProjectProfileRadio from '../components/ProjectProfileRadio';
import { updateProjectProfileField } from '../actions';


const ProjectProfileRadioContainer = connect(
	(state, ownProps) => {
		return {};
	},
	(dispatch, ownProps) => {
		return {
			onChange: (event) => {
				dispatch(updateProjectProfileField(event.target.checked, ownProps.id, "radio", ownProps.label));
			}
		};
	}
)(ProjectProfileRadio);


export default ProjectProfileRadioContainer;