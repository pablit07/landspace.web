import React from 'react';
import ProjectsPage from './DashboardPage';
import FileUploader from './FileUploader';


export default class ImageUploadProjectsPage extends ProjectsPage {

    componentDidMount() {
    	super.componentDidMount();

 		$('#main').css({'height':'auto'});
 		$('.tabs-content').css({'overflow':'visible'});
    }

	getExtraContents() {
		return (<div>
			{React.createElement(FileUploader, null)}
			<div className="panel panel-default all-50 align-left">
                    <div className="panel-heading">
                        <h3 className="panel-title">Image Upload Notes</h3>
                    </div>
                    <div className="panel-body">
                        <ul>
                            <li>Take a picture from all corners of the project site</li>
                            <li>Panoramas allow designers to see space as whole</li>
                            <li>Take images of key aspects of design or existing features</li>
                        </ul>
                    </div>
                </div>
            </div>);
	}
}