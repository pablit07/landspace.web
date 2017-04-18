import React from 'react';


export default class FileUploader extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        return (<div className='all-50 vertical-space'>
                <span className="btn btn-success fileinput-button">
                <i className="glyphicon glyphicon-plus"></i>
                <span>Add files...</span>
                <input id="fileupload" type="file" name="files[]" multiple></input>
                </span>

                <div id="progress" className="progress">
                    <div className="progress-bar progress-bar-success"></div>
                </div>
                <div id="files" className="files"></div>

            </div>);
    }
}