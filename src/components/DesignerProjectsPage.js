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
		this.userStoreToken.remove();
		this.designerProjectsStoreToken.remove();
	}

	render() {
    	var projectComponents = [];

    	var folderColors = ['#C22F09', '#6E0980', '#9F7300', '#A80846'];
    	var currentColor = folderColors.shift();
    	var currentFolderStyle = {'background-color': currentColor};

    	this.state.designerProjects.forEach((project) => {

    		projectComponents.push(<div className='project-container all-30 tiny-100 small-100'>
			    						<div className='overlay' style={currentFolderStyle}></div>
			    						<div className='contents'>
			    							<i className="fa fa-folder-o fa-10x background" aria-hidden="true"></i>
				    						<div className='title'>{project.name}</div>
				    						<div className='details'>
				    							<ul>
				    							<li><a href='#'>Open Google Drive Folder</a></li>
				    							<li><a href='#'>Download Survey Results</a></li>
				    							<li><a href='#'>Download Project Profile</a></li>
				    							</ul>
			    							</div>

		    							</div>
								</div>);
    		folderColors.push(currentColor);
    		currentColor = folderColors.shift();
    		currentFolderStyle = {'background-color': currentColor};
    	});

		return (<div className='ink-grid full-height'>
					<div className="ink-tabs top full-height left-space right-space vertical-space" data-prevent-url-change="true">
					    <ul className="tabs-nav">
					        <li><a className="tabs-tab" href="#home">Active Projects</a></li>
					        <li><a className="tabs-tab" href="#history">History</a></li>
					    </ul>

					    <div id="home" className="tabs-content full-height">
					    	<div className='column-group'><div className='all-100 push-right align-right'><a href="https://drive.google.com/a/landspaceplan.com/file/d/0B3L5HbsWbNMiU3RuNVhQeVY3ZTA/view?usp=sharing">Landspace Onboarding</a></div></div>
							<div className='column-group vertical-space'>
		    					{projectComponents}
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