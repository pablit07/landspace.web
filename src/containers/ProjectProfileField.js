import { connect } from 'react-redux';
import ProjectProfileField from '../components/ProjectProfileField';
import { updateProjectProfileField } from '../actions';


const ProjectProfileFieldContainer = connect(
	(state, ownProps) => {
		return {};
	},
	(dispatch, ownProps) => {
		return {};
	}
)(ProjectProfileField);


export default ProjectProfileFieldContainer;