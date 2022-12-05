import './NotifyStyle.scss'
import { Dropdown, Menu } from 'antd'
import notifyApi from 'api/notifyApi';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import moment from 'moment';
import { getUsersInfoById } from 'function/callApi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from 'components/baseUI/loading/Loading';
import viLocale from "moment/locale/vi";

export default function Notify() {
	moment.locale('vi', [viLocale])
	const navigate = useNavigate()
	const [notifications, setNotifications] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const handleGetNotify = async () => {
		try {
			const params = {
				page: 1,
				size: 10
			}
			const res = await notifyApi.getNotifications(params)
			if (res.status_code === 9999) {
				const data = res.payload
				data.forEach(async (item) => {
					const userTrigger = await getUsersInfoById(item?.userIdTrigger)
					setNotifications(prev => [...prev,
					{
						...item,
						avatar: userTrigger.avatar,
						fullName: userTrigger.fullName,
						path: `/profile/${userTrigger._id}/newfeed`
					}])
				})
			}
			if (res.status_code === -9999) {
				console.log('get notification error');
			}
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		handleGetNotify()
	}, [])
	const handleReadNotify = (path, idNotifiy) => {
		// api readed
		navigate(path)
	}
	const menu = (
		<Menu className='dropdown-notify'
			items={[
				{
					label:
						<div className="notify-container" >
							<h4>Thông báo</h4>
							<ul>
								{isLoading ?
									<Loading />
									:
									notifications.map((item, idx) => {
										const timeStamp = new Date(item?.createTime)
										return (
											<div onClick={() => handleReadNotify(item.path)} key={idx}>
												<li className='notify-item'>
													<div className='avatar-content'>
														<img src={item.avatar} alt="avatar" />
													</div>
													<div className='text-content'>
														<p>{item.content}</p>
														<span>{moment.utc(timeStamp.toUTCString()).fromNow()}</span>
													</div>
													<div className='status-container'>
														<div className="onlStatus"></div>
													</div>
												</li>
												<hr className='line-separate' />
											</div>
										)
									})
								}
							</ul>
						</div >,
					key: '0',
				},]} />
	)

	return (
		<div>
			<Dropdown overlay={menu} trigger={['click']}>
				<div className="iconRightSide">
					<div className="subIconRight">
						<IoMdNotifications className="topbarIcon-2" />
						{/* <span className="iconBadge">1</span> */}
					</div>
					<p>Thông báo</p>
				</div>
			</Dropdown>
		</div>
	)
}
