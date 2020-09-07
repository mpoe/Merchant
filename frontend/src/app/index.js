// Redux
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/reducers';
import Router from './routes';

import './main.css';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app'),
);
