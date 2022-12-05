import { Realtime } from 'ably'
import AlertMsg from 'components/baseUI/alert/AlertMsg'
import Topbar from 'components/topbar/Topbar'
import { getUsersInfoById } from 'function/callApi'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './DefaultLayoutStyle.scss'
export default function DefaultLayout() {

	const currentUser = useSelector(state => state.authentication.currentUser)
	const [notify, setNotify] = useState(null)
	const realtime = new Realtime({ key: process.env.REACT_APP_ABLY_API_KEY })
	const cmtChannel = realtime.channels.get('comment')
	const likeChannel = realtime.channels.get('like')
	const rateChannel = realtime.channels.get('rate')
	const FollowChannel = realtime.channels.get('follow')

	cmtChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				setNotify({
					createTime: data.createTime,
					content: data?.content,
					path: `/post/${data._id}`,
					avatar: res.avatar,
				})
			})
			setTimeout(() => {
				setNotify(null)
			}, 4000)
		}
	});
	likeChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				setNotify({
					createTime: data.createTime,
					content: data?.content,
					path: `/post/${data._id}`,
					avatar: res.avatar,
				})
			})
			setTimeout(() => {
				setNotify(null)
			}, 4000)
		}
	});
	rateChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				setNotify({
					createTime: data.createTime,
					content: data?.content,
					path: `/post/${data._id}`,
					avatar: res.avatar,
				})
			})
			setTimeout(() => {
				setNotify(null)
			}, 4000)
		}
	});
	FollowChannel.subscribe(function (message) {
		const data = JSON.parse(message.data)
		if (currentUser._id === data.userId && data.userId !== data.userIdTrigger) {
			getUsersInfoById(data.userIdTrigger).then((res, req) => {
				setNotify({
					createTime: data.createTime,
					content: data?.content,
					path: `/profile/${res._id}/newfeed`,
					avatar: res.avatar,
				})
			})
			setTimeout(() => {
				setNotify(null)
			}, 4000)
		}
	});
	return (
		<div className='defalt-layout-container'>
			{
				notify && <AlertMsg notify={notify} />
			}
			<Topbar />
			<Outlet />
		</div>
	)
}
