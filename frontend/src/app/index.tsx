import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes';

import './main.css';

const container = document.getElementById('app');

const root = createRoot(container);
root.render(<BrowserRouter>
	<Router />
</BrowserRouter>)
