import React from 'react';
import { Line } from 'rc-progress';
import designerProjectsStore from '../stores/DesignerProjectsStore';
import userStore from '../stores/UserStore';
import dispatcher from '../Dispatcher';


export default class DesignerProjectsPage extends React.Component {
	constructor() {
		super();
		
		var state = designerProjectsStore.getState();
		state = Object.assign(state, userStore.getState());

		this.state = state;
	}

	componentDidMount() {
		this.userStoreToken = userStore.addListener(_ => {
			var newState = userStore.getState();
			this.setState(newState);
		});

		this.designerProjectsStoreToken = designerProjectsStore.addListener(_ => {
			var newState = designerProjectsStore.getState();
			this.setState(newState);
		});

		dispatcher.dispatch({
			type: 'user/start-load'
		});
	}

	componentWillUnmount() {
		userStore.removeListener(this.userStoreToken);
		designerProjectsStore.removeListener(this.designerProjectsStoreToken);
	}

	render() {
    	var projectComponents = [];

    	this.state.designerProjects.forEach((project) => {
    		projectComponents.push(<div className='project-container'>{project.name}</div>);
    	});

		return (<div className='ink-grid'>{projectComponents}</div>);
	}
}