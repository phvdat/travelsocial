import AlertMsg from 'components/alert/AlertMsg'
import Topbar from 'components/topbar/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
	const message = 'ban co 1 luot theo doi moi'
	return (
		<div>
			<AlertMsg message={message} />
			<Topbar />
			<Outlet />
		</div>
	)
}
