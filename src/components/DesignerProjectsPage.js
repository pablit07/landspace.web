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

		if (this.props && this.props.params && this.props.params.id) {
			dispatcher.dispatch({
				type: 'designerProjects/empty',
				data: {
					id: Number(this.props.params.id)
				}
			});
		}

		dispatcher.dispatch({
			type: 'user/start-load'
		});
	}

	componentWillUnmount() {
		this.userStoreToken.remove();
		this.designerProjectsStoreToken.remove();
	}

	clickFolderHandler(project) {
		return (e) => {
			e.stopPropagation();
			var id = project.id;
			if (!project.isOpen) {
				dispatcher.dispatch({
					type: 'designerProjects/open',
					data: {
						id: id
					}
				});
			}
		};
	}

	clickOutsideFolderHandler() {
		dispatcher.dispatch({
			type: 'designerProjects/close'
		});
	}

	render() {
    	var projectComponents = [];

    	var folderColors = ['#C22F09', '#6E0980', '#9F7300', '#A80846'];
    	var currentColor = folderColors.shift();
    	var currentFolderStyle = {'background-color': currentColor};

    	this.state.designerProjects.forEach((project) => {

    		projectComponents.push(<div className={'project-container all-30 medium-50 tiny-100 small-100' + (project.isOpen ? ' open' : '')} onClick={this.clickFolderHandler(project)}>
			    						<div className='overlay' style={currentFolderStyle}></div>
			    						<div className='progress align-center'>
			    							<label>{project.designer_step.percent_shown}%</label>
			    							<Line percent={project.designer_step.percent_shown} strokeWidth="2" strokeColor={currentColor} />
			    						</div>
			    						<div className='contents'>
			    							<i className="fa fa-folder-o fa-10x background" aria-hidden="true"></i>
				    						<div className='title'>{project.name}</div>
				    						<div className='details'>
				    							<p>{project.display_name}<br/><a href={'mailto:'+project.email}>{project.email}</a></p>
				    							<ul>
				    							<li><a href={project.drive_folder} target='_blank'>Open Google Drive Folder</a></li>
				    							<li><a href='#'>Download Survey Results</a></li>
				    							<li><a href={'/projects/export/'+project.id} target='_blank'>Download Project Profile</a></li>
				    							</ul>
			    							</div>

		    							</div>
								</div>);
    		folderColors.push(currentColor);
    		currentColor = folderColors.shift();
    		currentFolderStyle = {'background-color': currentColor};
    	});

    	if (!this.state.designerProjects.length) {
    		projectComponents.push(<div className='note left-space'>You have no active projects.</div>);
    	}

		return (<div className='ink-grid full-height' onClick={this.clickOutsideFolderHandler}>
					<div className="ink-tabs top full-height left-space right-space vertical-space" data-prevent-url-change="true">
					    <ul className="tabs-nav">
					        <li><a className="tabs-tab" href="#home">Active Projects</a></li>
					        <li><a className="tabs-tab" href="#history">History</a></li>
					    </ul>

					    <div id="home" className="tabs-content full-height">
					    	<div className='column-group'>
					    	<div className='all-100 push-right align-right'>
					    		<a target="_blank" href="https://drive.google.com/a/landspaceplan.com/file/d/0B3L5HbsWbNMiU3RuNVhQeVY3ZTA/view?usp=sharing">Landspace Onboarding</a>
					    		</div>
				    		</div>
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