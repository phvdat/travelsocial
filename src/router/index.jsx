import App from 'App'
import DefaultLayout from 'layout/defaultLayout/DefaultLayout'
import NotFound from 'pages/notFound/NotFound'
import Home from 'pages/home/Home'
import PostPage from 'pages/post'
import Profile from 'pages/profile/Profile'
import Register from 'pages/register/Register'
import SearchPage from 'pages/search/SearchPage'
import TableRanking from 'pages/tableranking/TableRanking'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RoutePath } from './routePath'


const routesConfig = [
	{
		path: RoutePath.Index,
		element: <App />,
		children: [
			{
				element: <DefaultLayout />,
				children: [
					{ path: RoutePath.Register, element: <Register />, errorElement: <NotFound /> },
					{ path: RoutePath.Home, element: <Home />, errorElement: <NotFound /> },
					{ path: RoutePath.TableRaking, element: <TableRanking />, errorElement: <NotFound /> },
					{ path: RoutePath.Profile, element: <Profile />, errorElement: <NotFound /> },
					{ path: RoutePath.Post, element: <PostPage />, errorElement: <NotFound /> },
					{ path: RoutePath.Search, element: <SearchPage /> },
					{ path: RoutePath.Index, element: <Navigate to={RoutePath.Home} />, errorElement: <NotFound /> },
				],
			},
		]
	}
]
export default routesConfig;