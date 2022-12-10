import './DefaultLayoutStyle.scss'
import { Realtime } from 'ably'
import AlertMsg from 'components/baseUI/alert/AlertMsg'
import Topbar from 'components/topbar/Topbar'
import { getUsersInfoById } from 'function/callApi'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
export default function DefaultLayout() {

	const currentUser = useSelector(state => state.authentication.currentUser)
	const [alertNotifyList, setAlertNotifyList] = useState([])
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
			})
		}
	});
	FollowChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				const notify = {
					createTime: data.createTime,
					content: data?.content,
					path: `/profile/${res.objectId}/newfeed`,
					avatar: res?.avatar || "",
				}
				setAlertNotifyList(alertNotifyList.concat(
					<AlertMsg key={data._id} notify={notify} />
				))
			})
		}
	});
	return (
		<div className='defalt-layout-container'>
			<div className='notify-list-container'>
				{alertNotifyList}
			</div>
			<Topbar />
			<Outlet />
		</div>
	)
}
