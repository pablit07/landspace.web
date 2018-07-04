import { connect } from 'react-redux';
import ProjectProfileForm from '../components/ProjectProfileForm';


const ProjectProfileFormContainer = connect(
	(state, ownProps) => {
		return {
			activeQuestion: state.projectQuestions[state.currentProjectQuestionIndex],
			percentComplete: 100 * ((state.currentProjectQuestionIndex) / state.projectQuestions.length)
		};
	},
	(dispatch, ownProps) => {
		return {
		};
	}
)(ProjectProfileForm);


export default ProjectProfileFormContainer;