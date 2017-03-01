import {ReduceStore} from 'flux/utils';
import dispatcher from '../Dispatcher';
import api from '../API';


class UserStore extends ReduceStore {
	constructor(dispatcher, id) {
		super(dispatcher);
		this.id = id;
	}

	getInitialState() {
		this._state = {};
		dispatcher.dispatch({
			type: 'user/empty'
		});
		return this._state;
	}

	reduce(state, action) {

		// console.info(this.id, action, state);

		switch (action.type) {
			case 'user/empty':
				return {};
			case 'user/start-load':
				api.getCurrentUser(action.data ? this.startLoadFromRegisterSuccessAction : this.startLoadSuccessAction, action.data);
				return state;
			case 'user/loaded-basic':
				var newState = {
					token: action.data.token,
					id: action.data.id,
					isAuthenticated: action.data.isAuthenticated
				};
				if (newState.isAuthenticated) api.getCurrentUserData(newState.id, this.startLoadDataSuccessAction);
				return newState;
			case 'user/loaded':
				var newState = Object.assign({}, state, action.data);
				if (action.data.designer) {
					api.get(action.data.designer, this.loadExtendedDataSuccessAction);
				} else if (action.data.client) {
					api.get(action.data.client, this.loadExtendedDataSuccessAction);
				}
				return newState;
			case 'user/loaded-extended':
				var newState = Object.assign({}, state, action.data);
				return newState;
			default:
				return state;
		}
	}

	areEqual(one, two) {
		return one.token === two.token
			&& one.id === two.id
			&& one.designer === two.designer
			&& one.client === two.client
			// this field comes back on the client/designer apis
			&& one.user === two.user;
	}

	startLoadSuccessAction(data) {
		dispatcher.dispatch({
			type: 'user/loaded-basic',
			data: Object.assign(data, {isAuthenticated: true})
		});
	}

	startLoadFromRegisterSuccessAction(data) {
		dispatcher.dispatch({
			type: 'user/loaded-basic',
			data: Object.assign(data, {isAuthenticated: false})
		});
	}

	startLoadDataSuccessAction(data) {
		dispatcher.dispatch({
			type: 'user/loaded',
			data: data
		});
	}

	loadExtendedDataSuccessAction(data) {
		dispatcher.dispatch({
			type: 'user/loaded-extended',
			data: data
		});
	}
}

const userStore = new UserStore(dispatcher, 2);

export default userStore;

window.userStore = userStore;