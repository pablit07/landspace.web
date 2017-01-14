import React from 'react';
import { Link } from 'react-router';
import TopNav from './TopNav';

export default class LayoutPublic extends React.Component {
  render() {
    return (
      <body className='ink-drawer'>
        
        <div id="main" className='content-drawer'>
          <div className="app-container public full-height">
            <header className='clearfix'>
              <TopNav vertical={false}></TopNav>
            </header>
            <div className="app-content">{this.props.children}</div>
            <footer>
              <div className='ink-grid vertical-space'>
                This is a demo app to showcase <strong>Ink</strong>, <strong>React</strong>, and <strong>Express</strong>.
              </div>
            </footer>
          </div>
        </div>
        <div className="right-drawer">
          <TopNav vertical={true}></TopNav>
        </div>

        <script src="/js/bundle.js"></script>
      </body>
    );
  }
}