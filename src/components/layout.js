import React from 'react';
import { Link } from 'react-router';
import TopNav from './TopNav';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <TopNav></TopNav>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            This is a demo app to showcase <strong>Ink</strong>, <strong>React</strong>, and <strong>Express</strong>.
          </p>
        </footer>
      </div>
    );
  }
}