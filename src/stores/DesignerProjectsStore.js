import {ReduceStore} from 'flux/utils';
import dispatcher from '../Dispatcher';
import userStore from '../stores/UserStore';
import api from '../API';


class DesignerProjectsStore extends ReduceStore {
	constructor(dispatcher, id) {
		super(dispatcher);
		this.id = id;
	}

	getInitialState() {
		this._state = {
			designerID: null
		};
		dispatcher.dispatch({
			type: 'designerProjects/empty'
		});
		return this._state;
	}

	reduce(state, action) {

		// console.info(this.id, action, state);

		switch (action.type) {
			case 'designerProjects/empty':
				if (!state.designerProjects || state.designerProjects.length)
					state.designerProjects = api.getEmptyDesignerProjects();
				return state;
			case 'designerProjects/start-load':
				if (state.designerID)
					api.getAllDesignerProjects(state.designerId, this.startLoadSuccessAction);
				return state;
			case 'designerProjects/loaded':
				var newState = Object.assign({}, state, {designerProjects: action.data.results});
				return newState;
			case 'user/loaded-basic':
				dispatcher.waitFor([userStore.getDispatchToken()]);
				var newState = Object.assign({}, state, {userId: action.data.id});
				api.getAllDesignerProjects(newState.userId, this.startLoadSuccessAction);
				return newState;

			default:
				return state;
		}
	}

	startLoadSuccessAction(data) {
		dispatcher.dispatch({
			type: 'designerProjects/loaded',
			data: data
		});
	}

	areEqual(one, two) {
		return (one.designerProjects || []).length === (two.designerProjects || []).length;
	}
}

const designerProjectsStore = new DesignerProjectsStore(dispatcher, 1);

export default designerProjectsStore;

window.designerProjectsStore = designerProjectsStore;
window.dispatcher = dispatcher;