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
							'stepAction': data.current_step.action,
							'stepActionUrl': data.current_step.url,
							'stepIconClass': data.current_step.icon_class,
							'nextStep': data.current_step.next ? data.current_step.next.name : '',
							'nextStepUrl': data.current_step.next ? data.current_step.next.url : '',
							'isLoading': false
						});
					});
				}
			});
		});
	}

	render() {
    	var loading = this.state.isLoading ? (<div className="column-group push-center push-middle gutters animated fadeInDown duration-0_5">
				    <div className="all-50 push-center align-center">
				    	<i className="fa fa-refresh fa-spin fa-4x fa-fw"></i>
				    </div>
				</div>) : null;

    	var nextButton = this.state.stepAction ? (<div className="all-100 push-center align-center vertical-space"><a href={this.state.stepActionUrl} className='ink-button vertical-space'>{this.state.stepAction}</a></div>) : null;

    
		return (

			<div className='ink-grid full-height'>

				<div className="ink-tabs top full-height left-space right-space vertical-space" data-prevent-url-change="true">
				    <ul className="tabs-nav">
				        <li><a className="tabs-tab" href="#home">Current Project</a></li>
				        <li><a className="tabs-tab" href="#history">History</a></li>
				    </ul>

			    	<div id="home" className="tabs-content full-height">

			    		{ loading }

						<div className="column-group gutters full-height">
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

						<div className="column-group push-center push-middle gutters full-height">
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