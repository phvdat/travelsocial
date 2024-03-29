import './NotifyStyle.scss'
import { Dropdown, Menu } from 'antd'
import notifyApi from 'api/notifyApi';
import React, { useState } from 'react'
import { IoMdNotifications } from 'react-icons/io';
import moment from 'moment';
import { getUsersInfoById } from 'function/callApi';
import { useNavigate } from 'react-router-dom';
import Loading from 'components/baseUI/loading/Loading';
import viLocale from "moment/locale/vi";
import { async } from '@firebase/util';
import { useRef } from 'react';
import { useEffect } from 'react';
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { MdNotificationsActive } from 'react-icons/md';

export default function Notify(props) {
	const { setIsHaveNotify, isHaveNotify } = props
	moment.locale('vi', [viLocale])
	const navigate = useNavigate()
	const [notifications, setNotifications] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [open, setOpen] = useState(false)
	const [hasNextPage, setHasNextPage] = useState(false)

	const handleGetNotify = async (page) => {
		setIsLoading(true)
		try {
			const params = {
				page: page,
				size: 10
			}
			const res = await notifyApi.getNotifications(params)
			if (res.status_code === 9999) {
				setHasNextPage(res.payload.hasNext)
				const data = res.payload.items
				for (const item of data) {
					const userTrigger = await getUsersInfoById(item?.userIdTrigger)
					setNotifications(prev => [...prev,
					{
						...item,
						avatar: userTrigger.avatar,
						fullName: userTrigger.fullName,
						path: item.type === "follow" ? `/profile/${userTrigger._id}/newfeed` : `/post/${item.objectId}`
					}])
				}
			}
			if (res.status_code === -9999) {
				console.log('get notification error');
			}
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	const readedNotify = async (id) => {
		try {
			await notifyApi.readNotify({ _id: id })
		} catch (error) {
			console.log(error)
		}
	}

	const handleLoadMoreNotify = async () => {
		setPage(prev => prev + 1)
		await handleGetNotify(page)
	}

	const handleReadNotify = (path, idNotifiy) => {
		readedNotify(idNotifiy)
		setOpen(false)
		navigate(path)
	}

	const onOpenChange = (isOpen) => {
		if (isOpen) {
			setNotifications([])
			setPage(1)
			handleGetNotify(page)
		}
	}

	const menuRef = useRef(null);
	const notifyButtonRef = useRef(null)
	function handleClickOutside(event) {
		if (menuRef.current && !(menuRef.current.contains(event.target) || notifyButtonRef.current.contains(event.target))) {
			setOpen(false)
		}
	}
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);
	const menu = (
		<Menu
			className='dropdown-notify'
			items={[
				{
					label:
						<div className="notify-container"
							ref={menuRef}
						>
							<h4>Thông báo</h4>
							<hr className='line-separate' />
							<ul>
								{
									notifications.map((item, idx) => {
										const timeStamp = new Date(item?.createTime)
										return (
											<div onClick={() => handleReadNotify(item.path, item._id)} key={idx}>
												<li className='notify-item'>
													<div className='avatar-content'>
														<img src={item.avatar || avatarDefault} alt="avatar" />
													</div>
													<div className='text-content'>
														<p>{item.content}</p>
														<span>{moment.utc(timeStamp.toUTCString()).fromNow()}</span>
													</div>
													{
														!item.isRead &&
														<div className='status-container'>
															<div className="onlStatus"></div>
														</div>
													}
												</li>
												<hr className='line-separate' />
											</div>
										)
									})
								}
								{isLoading && <Loading position="center-loading" />}
								{
									hasNextPage &&
									<div >
										<span className='load-more-cmt' onClick={() => handleLoadMoreNotify()}>Cũ hơn</span>
									</div>
								}
							</ul >
						</div >,
					key: '0',
				},]} />
	)

	return (
		<div>
			<Dropdown
				open={open}
				onOpenChange={onOpenChange}
				overlayClassName='overlay-drop-down-fixed'
				overlay={menu}
				trigger={['click']}>
				<div className="iconRightSide" onClick={() => {
					setOpen(!open)
					setIsHaveNotify(false)
				}
				} ref={notifyButtonRef}>
					<div className="subIconRight">
						{
							isHaveNotify ?
								<MdNotificationsActive className="topbarIcon-2" /> :
								<IoMdNotifications className="topbarIcon-2" />
						}
					</div>
					<p>Thông báo</p>
				</div>
			</Dropdown >
		</div >
	)
}
