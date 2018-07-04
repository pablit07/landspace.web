
import {
	ProjectProfileFieldActions,
	ProjectProfileControlActions
} from '../actions';

const initialState = {
  currentProjectQuestionIndex: 0,
  currentProjectQuestionKey: "",
  projectQuestions: [
    {
    	"key": "name",
	    "initial_value": null,
	    "required": true,
	    "label": "Project Name",
	    "widget_type": "TextInput",
	    "help_text": "",
	    "hidden": false,
	    "type": "CharField"
  	},
  	{
  		"key": "project_type",
	    "initial_value": null,
	    "required": true,
	    "label": "Which of the following best describes your project?",
	    "widget_type": "CheckboxSelectMultiple",
	    "help_text": "(Check all that apply)",
	    "hidden": false,
	    "type": "MultipleChoiceField",
	    "choices":["front yard", "backyard","small garden area", "deck or patio", "roofdeck"]
  	},
	{
		"key":"slope_amount",
		"initial_value": null,
		"required": true,
		"label": "How much slope does your space have?",
		"widget_type": "RadioSelect",
		"help_text": "",
		"hidden": false,
		"type": "TypedChoiceField",
		"choices": ["None, the space is flat","Some, moderate grade change","A lot, steep slopes"]
	},
	{
		"key":"lot_size",
		"initial_value": null,
		"required": false,
		"label": "What is the size of your lot? (Optional)",
		"widget_type": "NumberInput",
		"help_text": "",
		"hidden": false,
		"type": "IntegerField"
	},
	{
		"key":  "has_pets",
	    "initial_value": null,
	    "required": true,
	    "label": "Do you have any pets?",
	    "widget_type": "CheckboxSelectMultiple",
	    "help_text": "",
	    "hidden": false,
	    "type": "MultipleChoiceField",
	    "choices": ["dog","cat","reptile","horse","tiger","other","no"]
  	}
  ],
  projectAnswersByKey: {}
}

function reduce(state = initialState, action) {

	if (action.type == ProjectProfileFieldActions.SET_CHECKBOX) {

		if (state.projectAnswersByKey[action.key]) {

			if (!Array.isArray(state.projectAnswersByKey[action.key])) { state.projectAnswersByKey[action.key] = [state.projectAnswersByKey[action.key]] };
			state.projectAnswersByKey[action.key].push(action.value);

		} else {
			state.projectAnswersByKey[action.key] = action.value;
		}
		return {
			...state
		};
	}

	if (action.type == ProjectProfileFieldActions.UNSET_CHECKBOX) {
		if (state.projectAnswersByKey[action.key]) {
			if (Array.isArray(state.projectAnswersByKey[action.key])) {
				var array = state.projectAnswersByKey[action.key];
				for (let i = array.length; i >= 0; i--) {
					if (array[i] == action.value) {
						array.splice(i, 1);
					}
				}
				if (array.length == 1) {
					state.projectAnswersByKey[action.key] = array[0];
				}
			} else {
				delete state.projectAnswersByKey[action.key];
			}
			return {
				...state
			};
		}
	}

	if (action.type == ProjectProfileFieldActions.SET_RADIO) { 
		state.projectAnswersByKey[action.key] = action.value;
		return {
			...state
		}
	}

	if (action.type == ProjectProfileFieldActions.SET_TEXT) {
		state.projectAnswersByKey[action.key] = action.value;
		return {
			...state
		}
	}

	if (action.type == ProjectProfileControlActions.NEXT) {
		return {
			...state,
			currentProjectQuestionIndex: state.currentProjectQuestionIndex+1
		};
	}

	if (action.type == ProjectProfileControlActions.BACK) {
		return {
			...state,
			currentProjectQuestionIndex: state.currentProjectQuestionIndex-1
		};
	}

	return state;
} 


export default reduce;






























