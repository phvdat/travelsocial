import App from 'App'
import DefaultLayout from 'layout/defaultLayout/DefaultLayout'
import Home from 'pages/home/Home'
import Profile from 'pages/profile/Profile'
import Register from 'pages/register/Register'
import SearchPage from 'pages/search/SearchPage'
import TableRanking from 'pages/tableranking/TableRanking'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react/cjs/react.development'
import { RoutePath } from './routePath'


const routesConfig = [
	{
		path: RoutePath.Index,
		element: <App />,
		children: [
			{
				element: <DefaultLayout />,
				children: [
					{ path: RoutePath.Register, element: <Register /> },
					{ path: RoutePath.Home, element: <Home /> },
					{ path: RoutePath.TableRaking, element: <TableRanking /> },
					{ path: RoutePath.Profile, element: <Profile /> },
					{ path: RoutePath.Search, element: <SearchPage /> },
				],
			},
		]
	}
]
export default routesConfig;