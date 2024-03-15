import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './contexts/socket';

import { Router } from './routes';
import { DebugContainer } from './containers/debug';

import './main.css';
import { MerchantContainer } from './containers/Merchant';

const container = document.getElementById('app');

const root = createRoot(container);
root.render(<BrowserRouter>
	<SocketProvider>
		<Router />
		{/* <MerchantContainer roomData={null} />
		<DebugContainer /> */}
	</SocketProvider>
</BrowserRouter>);
