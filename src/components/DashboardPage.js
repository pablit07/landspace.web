import React from 'react';
import { Line } from 'rc-progress';


export default class ProjectsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			'isLoading': true,
			'currentStepPercentShown': 0,
			'currentStep': '',
			'nextStep': '',
			'nextStepUrl': '',
			'stepIconClass': 'none',
			'designerSource': '',
			'clientSource': ''
		};
	}

	componentDidMount() {
		var userDataSource;

		$.get('/api/url/?name=users-api&p1=' + userId, (data) => { this.setState({'userDataSource': userDataSource = data.url}) }).done( _ => {
			$.get(userDataSource, (data) => {
				this.setState({
					'designerSource': data.designer,
					'clientSource': data.client
				});
				if (data.designer) {
					$.get(data.designer, (data) => {
						this.setState({
							'region': data.region,
							'isLoading': false
						});
					});
				}
				if (data.client) {
					$.get(data.client, (data) => {
						this.setState({
							'currentStep': data.current_step.name,
							'currentStepPercentShown': data.current_step.percent_shown,
							'modal': data.current_step.modal,
							'stepAction': data.current_step.action,
							'stepActionUrl': data.current_step.url,
							'stepIconClass': data.current_step.icon_class,
							'nextStep': data.current_step.next ? data.current_step.next.name : '',
							'nextStepUrl': data.current_step.next ? data.current_step.next.url : '',
							'isLoading': false,
							'hasActiveProject': data.has_active_project
						});

						if (data.current_step.modal) {
							var modalObj = new Ink.UI.Modal((<div></div>), {closeOnClick: true});
							modalObj.setContentMarkup(data.current_step.modal);
							modalObj.open();

							if (data.style_image_url) {
								var modalImage = $('.ink-modal img');
								modalImage[0].src = data.style_image_url;
							}
						}
					});
				}
			});
		});

	}

	render() {
    	var loading = this.state.isLoading ? (<div className="column-group push-center push-middle gutters animated fadeInDown duration-0_5 vertical-space">
				    <div className="all-50 push-center align-center">
				    	<i className="fa fa-refresh fa-spin fa-4x fa-fw"></i>
				    </div>
				</div>) : null;

    	var designerMatchAlert = !this.state.isLoading && !this.state.hasActiveProject && this.state.currentStepPercentShown > 40
    		? (<div className="ink-alert block">
					<h4>Hang tight - we're matching you with the best designer for your project.</h4>
					<button className="ink-dismiss">&times;</button>
					<p>This process should not take more than a day. In the meantime, please upload your project images and select a package.</p>
				</div>)
    		: null;

    	var nextButton = this.state.stepAction ? (<div className="all-100 push-center align-center vertical-space"><a href={this.state.stepActionUrl} className='ink-button vertical-space'>{this.state.stepAction}</a></div>) : null;

    
		return (

			<div className='ink-grid full-height'>

				<div className="ink-tabs top full-height left-space right-space vertical-space" data-prevent-url-change="true">
				    <ul className="tabs-nav">
				        <li><a className="tabs-tab" href="#home">Current Project</a></li>
				        <li><a className={"tabs-tab"+(this.state.hasActiveProject?"":" disabled")} href={this.state.hasActiveProject?"#history":""}>History</a></li>
				    </ul>

			    	<div id="home" className="tabs-content full-height">

			    		{ loading }

						{ designerMatchAlert }

						<div className="column-group gutters vertical-space">
						    <div className="all-80 push-center align-center">
						    	<h2>{this.state.currentStep}</h2>
						    	<div className="all-100 vertical-space">
						    		<i className={(this.state.isLoading ? '' : (this.state.stepIconClass ? this.state.stepIconClass : 'fa-cogs'))+" fa fa-5x animated flip delay-2"} aria-hidden="true"></i>
						    	</div>
						    	<label>{this.state.currentStepPercentShown}% Complete</label>
				     			<Line percent={this.state.currentStepPercentShown} strokeWidth="5" strokeColor="#66b14b" />
				     			
				     			{ nextButton }
						    
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

			</div>
		);
	}
}