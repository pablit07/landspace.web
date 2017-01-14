import React from 'react';
import { Link } from 'react-router';
import ProjectsTopNav from './ProjectsTopNav';

export default class Layout extends React.Component {
  render() {
    return (
      <body className='ink-drawer'>

        <div id="main" className='content-drawer'>
          <div className="app-container full-height">
            <header className='clearfix'>
              <ProjectsTopNav vertical={false}></ProjectsTopNav>
            </header>
            <div className="app-content dashboard full-height">{this.props.children}</div>
            <footer>
              <div className='ink-grid vertical-space'>
                
              </div>
            </footer>
          </div>
        </div>
        <div className="right-drawer">
          <ProjectsTopNav vertical={true}></ProjectsTopNav>
        </div>

        <script src="/js/bundle.js"></script>
      </body>
    );
  }
}