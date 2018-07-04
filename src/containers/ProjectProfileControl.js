import { connect } from 'react-redux';
import ProjectProfileButton from '../components/ProjectProfileButton';
import { ProjectProfileControlActions } from '../actions';


const ProjectProfileControl = connect(
	(state, ownProps) => {
		return {
			isHidden: (ownProps.action == ProjectProfileControlActions.BACK && state.currentProjectQuestionIndex == 0)
				|| (ownProps.action == ProjectProfileControlActions.NEXT && state.currentProjectQuestionIndex == state.projectQuestions.length - 1)
				|| (ownProps.action == ProjectProfileControlActions.SUBMIT && state.currentProjectQuestionIndex != state.projectQuestions.length - 1),
			type: ownProps.action == ProjectProfileControlActions.SUBMIT ? "submit" : "button",
		};
	},
	(dispatch, ownProps) => {
		return {
			onClick: () => {
				dispatch({type: ownProps.action});
			}
		};
	}
)(ProjectProfileButton);


export default ProjectProfileControl;