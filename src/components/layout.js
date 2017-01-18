import React from 'react';
import { Link } from 'react-router';
import ProjectsTopNav from './ProjectsTopNav';

const userSource = '/api/users/';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container full-height">
        <header className='clearfix'>
            <ProjectsTopNav vertical={false} userSource={userSource}></ProjectsTopNav>
        </header>
        <div className="app-content dashboard full-height">{this.props.children}</div>
        <footer>
            <div className='ink-grid vertical-space'>

            </div>
        </footer>
      </div>
    );
  }
}