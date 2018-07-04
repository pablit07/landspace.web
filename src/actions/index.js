
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