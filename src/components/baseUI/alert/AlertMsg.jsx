import './alertMsg.scss'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import viLocale from "moment/locale/vi";

export default function AlertMsg(props) {
	const { notify } = props
	moment.locale('vi', [viLocale])
	const timeStamp = new Date(notify.createTime)
	return (
		<Link to={notify.path}>
			<div className="alert-msg">
				<h4>Thông báo mới</h4>
				<hr className='time-line' />
				<div className='notify-item'>
					<div className='avatar-content'>
						<img src={notify.avatar} alt="avatar" />
					</div>
					<div className='text-content'>
						<p>{notify.content}</p>
						<span>{moment.utc(timeStamp.toUTCString()).fromNow()}</span>
					</div>
				</div>
			</div>
		</Link>

	)
}
