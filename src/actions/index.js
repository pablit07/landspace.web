
export const ProjectProfileFieldActions = {
	SET_CHECKBOX: 'SET_CHECKBOX',
	SET_RADIO: 'SET_RADIO',
	SET_TEXT: 'SET_TEXT',
	UNSET_CHECKBOX: 'UNSET_CHECKBOX',
};

export const ProjectProfileControlActions = {
	SUBMIT: 'SUBMIT',
	BACK: 'BACK',
	NEXT: 'NEXT'
};


export const LOAD_QUESTIONS_STARTED = 'LOAD_QUESTIONS_STARTED';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';


export function updateProjectProfileField(checked, projectProfileQuestionKey, type, label) {
	if (checked) {
		return {
			type: type == 'checkbox' ? ProjectProfileFieldActions.SET_CHECKBOX : ProjectProfileFieldActions.SET_RADIO,
			key: projectProfileQuestionKey,
			value: label
		};
	} else {
		return {
			type: ProjectProfileFieldActions.UNSET_CHECKBOX,
			key: projectProfileQuestionKey,
			value: label
		};
	}
};


export function updateProjectProfileText(text, projectProfileQuestionKey) {
	return {
		type: ProjectProfileFieldActions.SET_TEXT,
		key: projectProfileQuestionKey,
		value: text
	};
};


export function initQuestions(dispatch) {

	$.getJSON('/static/projectform.json', function(response) {
		dispatch({
			type: LOAD_QUESTIONS_SUCCESS,

			questions: response
		})
	});

	return {
		type: LOAD_QUESTIONS_STARTED
	}
};