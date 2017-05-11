import React from 'react';
import { writeCsrf } from '../utils';


export default class FileUploader extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        
    }

    render() {        
        return (<div className='all-60 medium-100 small-100 vertical-space'>
    <form id="fileupload" action="/projects/fileupload/" method="POST" encType="multipart/form-data">
        <noscript><input type="hidden" name="redirect" value="https://blueimp.github.io/jQuery-File-Upload/"/></noscript>
        <div className="row fileupload-buttonbar">
            <div className="col-lg-7">
                <span className="ink-button green fileinput-button">
                    <i className="glyphicon fa fa-plus"></i>
                    <span>Add files...</span>
                    <input type="file" name="files[]" multiple/>
                </span>
                <button type="submit" className="ink-button blue start">
                    <i className="glyphicon glyphicon-upload"></i>
                    <span>Start upload</span>
                </button>
                <button type="reset" className="ink-button orange cancel">
                    <i className="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel upload</span>
                </button>
                <button type="button" className="ink-button red delete">
                    <i className="glyphicon glyphicon-trash"></i>
                    <span>Delete</span>
                </button>
                <span className="fileupload-process"></span>
            </div>
            <div className="col-lg-5 fileupload-progress fade">
                <div className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar progress-bar-success" style={{width:'0%'}}></div>
                </div>
                <div className="progress-extended"></div>
            </div>
        </div>
        <table role="presentation" className="ink-table table alternating bordered"><tbody className="files"></tbody></table>
        {writeCsrf()}
    </form>



            </div>);
    }
}