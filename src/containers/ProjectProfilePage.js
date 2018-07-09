import { connect } from 'react-redux';
import { initQuestions } from '../actions';
import ProjectProfilePage from '../components/ProjectProfilePage';

const ProjectProfilePageContainer  = connect(
	(state, ownProps) => {
		return {};
	},
	(dispatch, ownProps) => {
		return {
			initQuestions: () => {
				dispatch(initQuestions(dispatch));
			}
		};
	}
)(ProjectProfilePage);


export default ProjectProfilePageContainer;