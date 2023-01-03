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
import { Navigate } from 'react-router-dom'
import { RoutePath } from './routePath'
import Statistic from 'pages/statistic/Statistic'


const isLogin = localStorage.getItem('isLogin')
const routesConfig = [
	{
		path: RoutePath.Index,
		element: <App />,
		children: [
			{
				element: <DefaultLayout />,
				children: [
					{ path: RoutePath.Register, element: isLogin ? <Navigate to={RoutePath.Home} /> : <Register />, errorElement: <NotFound /> },
					{ path: RoutePath.Home, element: <Home />, errorElement: <NotFound /> },
					{ path: RoutePath.TableRaking, element: <TableRanking />, errorElement: <NotFound /> },
					{ path: RoutePath.Profile, element: <Profile />, errorElement: <NotFound /> },
					{ path: RoutePath.Post, element: <PostPage />, errorElement: <NotFound /> },
					{ path: RoutePath.Search, element: <SearchPage />, errorElement: <NotFound /> },
					{ path: RoutePath.Statistic, element: <Statistic />, errorElement: <NotFound /> },
					{ path: RoutePath.Index, element: <Navigate to={RoutePath.Home} />, errorElement: <NotFound /> },
					{ path: '*', element: < NotFound /> },
				],
			},
		]
	}
]
export default routesConfig;