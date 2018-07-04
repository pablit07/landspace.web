import { connect } from 'react-redux';
import ProjectProfileText from '../components/ProjectProfileText';
import { updateProjectProfileText } from '../actions';


const ProjectProfileTextContainer = connect(
	(state, ownProps) => {
		return {};
	},
	(dispatch, ownProps) => {
		return {
			onChange: (e) => {
				dispatch(updateProjectProfileText(e.target.value, ownProps.id));
			}
		};
	}
)(ProjectProfileText);


export default ProjectProfileTextContainer;