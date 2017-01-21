import React from 'react';
import { Link } from 'react-router';
import TopNav from './TopNav';

export default class LayoutPublic extends React.Component {
    render() {
        return (

            <div className="app-container public full-height">
                <header className='clearfix'>
                    <TopNav vertical={false}></TopNav>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer>
                    <div className='ink-grid vertical-space'>
                        &copy; 2017 <strong>Landspace LLC</strong>
                    </div>
                </footer>
            </div>
        );
    }
}