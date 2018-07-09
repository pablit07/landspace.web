import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ProjectProfilePage from '../../src/containers/ProjectProfilePage';
import reducers from '../../src/reducers/index';
import { render } from 'react-dom';

const store = createStore(reducers);

render(
	<Provider store={store}>
	    <ProjectProfilePage />
	 </Provider>,
	 document.getElementById('main')
);