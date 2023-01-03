import './DefaultLayoutStyle.scss'
import { Realtime } from 'ably'
import AlertMsg from 'components/baseUI/alert/AlertMsg'
import Header from 'components/header/Header'
import { getUsersInfoById } from 'function/callApi'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { SCREEN_LG } from 'constants/common'
import HeaderMobile from 'components/headerMobile/HeaderMobile'
export default function DefaultLayout() {

	const currentUser = useSelector(state => state.authentication.currentUser)
	const [alertNotifyList, setAlertNotifyList] = useState([])
	const [isHaveNotify, setIsHaveNotify] = useState(false)
	const realtime = new Realtime({ key: process.env.REACT_APP_ABLY_API_KEY })
	const cmtChannel = realtime.channels.get('comment')
	const likeChannel = realtime.channels.get('like')
	const rateChannel = realtime.channels.get('rate')
	const FollowChannel = realtime.channels.get('follow')

	cmtChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res) => {
				const notify = {
					createTime: data.createTime,
					content: data?.content,
					path: `/post/${data.objectId}`,
					avatar: res?.avatar || "",
				}
				setAlertNotifyList(alertNotifyList.concat(
					<AlertMsg key={data._id} notify={notify} />
				))
				setIsHaveNotify(true)
			})
		}
	});
	likeChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				const notify = {
					createTime: data.createTime,
					content: data?.content,
					path: `/post/${data.objectId}`,
					avatar: res?.avatar || "",
				}
				setAlertNotifyList(alertNotifyList.concat(
					<AlertMsg key={data._id} notify={notify} />
				))
				setIsHaveNotify(true)
			})
		}
	});
	rateChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				const notify = {
					createTime: data.createTime,
					content: data?.content,
					path: `/post/${data.objectId}`,
					avatar: res?.avatar || "",
				}
				setAlertNotifyList(alertNotifyList.concat(
					<AlertMsg key={data._id} notify={notify} />
				))
				setIsHaveNotify(true)
			})
		}
	});
	FollowChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res) => {
				const notify = {
					createTime: data.createTime,
					content: data?.content,
					path: `/profile/${res._id}/newfeed`,
					avatar: res?.avatar || "",
				}
				setAlertNotifyList(alertNotifyList.concat(
					<AlertMsg key={data._id} notify={notify} />
				))
				setIsHaveNotify(true)
			})
		}
	});

	const { innerWidth } = window;
	return (
		<div className='defalt-layout-container'>
			<div className='notify-list-container'>
				{alertNotifyList}
			</div>
			{
				innerWidth <= SCREEN_LG ?
					<HeaderMobile setIsHaveNotify={setIsHaveNotify} isHaveNotify={isHaveNotify} />
					:
					<Header setIsHaveNotify={setIsHaveNotify} isHaveNotify={isHaveNotify} />
			}
			<Outlet />
		</div>
	)
}
