import Topbar from 'components/topbar/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
	return (
		<div>
			<Topbar />
			<Outlet />
		</div>
	)
}
