import React from 'react';
import { Link } from 'react-router';
import TopNav from './TopNav';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header className='clearfix'>
          <TopNav></TopNav>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <div className='ink-grid vertical-space'>
            This is a demo app to showcase <strong>Ink</strong>, <strong>React</strong>, and <strong>Express</strong>.
          </div>
        </footer>
      </div>
    );
  }
}