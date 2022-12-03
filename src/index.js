import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './app/store'
import { Provider } from 'react-redux'
import routesConfig from 'router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routesConfig);
ReactDOM.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
	document.getElementById('root')
);