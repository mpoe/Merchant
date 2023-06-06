import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './contexts/socket';

import Router from './routes';
import Debug from './containers/debug';

import './main.css';
import DraftContainer from './containers/Draft';

const container = document.getElementById('app');

const root = createRoot(container);
root.render(<BrowserRouter>
	<SocketProvider>
		{/* <Router /> */}
		<DraftContainer />
		<Debug />
	</SocketProvider>
</BrowserRouter>)
