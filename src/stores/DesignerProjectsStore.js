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
			activeProjectId: null,
			lastUpdate: Date.now()
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
				if (action.data && action.data.id)
					state = Object.assign({}, state, {activeProjectId: action.data.id});
				return state;
			case 'designerProjects/start-load':
				if (state.designerID)
					api.getAllDesignerProjects(state.designerId, this.startLoadSuccessAction);
				return state;
			case 'designerProjects/loaded':
				var newState = Object.assign({}, state, {designerProjects: action.data.results});
				newState.designerProjects.forEach((p) => { p.isOpen = p.id === newState.activeProjectId });
				api.getAllDesignerProjectsExtended(action.data.results, this.projectsExtendedSuccessAction);
				return newState;
			case 'designerProjects/loaded-extended':
				var newState = Object.assign({}, state, {lastUpdate: Date.now()});
				return newState;
			case 'designerProjects/open':
				var newState = Object.assign({}, state, {activeProjectId: action.data.id});
				newState.designerProjects.forEach((p) => { p.isOpen = p.id === newState.activeProjectId });
				return newState;
			case 'designerProjects/close':
				var newState = Object.assign({}, state, {activeProjectId: null});
				newState.designerProjects.forEach((p) => { p.isOpen = p.id === newState.activeProjectId });
				return newState;
			case 'user/loaded-basic':
				dispatcher.waitFor([userStore.getDispatchToken()]);
				var newState = Object.assign({}, state, action.data);
				if (newState.isAuthenticated) api.getAllDesignerProjects(newState.id, this.startLoadSuccessAction);
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

	projectsExtendedSuccessAction(data) {
		dispatcher.dispatch({
			type: 'designerProjects/loaded-extended',
		});
	}

	areEqual(one, two) {
		return (one.designerProjects || []).length === (two.designerProjects || []).length
			&& one.activeProjectId === two.activeProjectId
			&& one.lastUpdate === two.lastUpdate;
	}
}

const designerProjectsStore = new DesignerProjectsStore(dispatcher, 1);

export default designerProjectsStore;

window.designerProjectsStore = designerProjectsStore;
window.dispatcher = dispatcher;