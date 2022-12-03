import { Alert } from 'antd'
import React from 'react'
import './alertMsg.scss'
export default function AlertMsg(props) {
	const { message } = props
	return (
		<div className="alert-msg">
			<h4>Thông báo mới</h4>
			<div></div>
			<p>{message}</p>
		</div>

	)
}
