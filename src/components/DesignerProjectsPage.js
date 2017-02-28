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
    		projectComponents.push(<div className='project-container'>
			    						<div className='overlay'></div>
			    						<i className="fa fa-folder-o fa-10x background" aria-hidden="true"></i>
				    					<div className='title'>{project.name}</div>
								</div>);
    	});

		return (<div className='ink-grid full-height'>
					<div className="ink-tabs top full-height left-space right-space vertical-space" data-prevent-url-change="true">
					    <ul className="tabs-nav">
					        <li><a className="tabs-tab" href="#home">Active Projects</a></li>
					        <li><a className="tabs-tab" href="#history">History</a></li>
					    </ul>

					    <div id="home" className="tabs-content full-height">
							<div className='column-group vertical-space'>
		    					<div className='all-90'>
		    					{projectComponents}
		    					</div>
							</div>
						</div>

						<div id="history" className="tabs-content full-height">

							<div className="column-group push-center push-middle gutters vertical-space">
							    <div className="all-50 push-center align-center">
									<i className="fa fa-refresh fa-spin fa-4x fa-fw"></i>
							    </div>
							</div>
						</div>
					</div>
			</div>);
	}
}