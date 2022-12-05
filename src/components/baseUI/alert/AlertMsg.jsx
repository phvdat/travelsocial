import React from 'react'
import { Link } from 'react-router-dom'
import './alertMsg.scss'
export default function AlertMsg(props) {
	const { title, content, path } = props
	return (
		<Link to={path}>
			<div className={title ? "alert-msg" : ""}>
				<h4>{title}</h4>
				<hr className='time-line' />
				<p>{content}</p>
			</div>
		</Link>

	)
}
