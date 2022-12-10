import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Menu, Row } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import './ProfileFollower.scss'
import { Link } from 'react-router-dom';
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { getFollower, getFollowUser, getUsersInfoById } from 'function/callApi';
export default function ProfileFollower(props) {
	const { userInfo } = props
	const [listUsersInfo, setListUsersInfo] = useState([])
	const [page, setPage] = useState(1)

	const handleScroll = async () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.getElementById('root').offsetHeight) return;
		setTimeout(() => {
			setPage(prev => prev + 1)
		}, 100)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		getFollower(userInfo._id, page, 10).then((res) => {
			console.log(res)
			res.items.map((ele) => (
				getUsersInfoById(ele.userId).then(
					(res) => {
						setListUsersInfo((prev) => [...prev, res])
					}
				)
			))
		})
	}, [page, userInfo._id])

	const menu = (
		<Menu
			items={[
				{
					label: <a onClick={() => { }}>Bỏ theo dõi</a>,
					key: '0',
				},
			]}
		/>
	)
	return (
		<div className='profile-follow-content'>
			{listUsersInfo.length !== 0 ?
				listUsersInfo.map((ele, idx) => {
					return (
						<Link key={idx} to={`/profile/${ele._id}/newfeed`} className="container-item-friends">
							{/* <div className="container-item-friends"> */}
							<div>
								<img alt="avata" src={ele.avatar || avatarDefault} />
								<span>{ele.fullName}</span>
							</div>
							{/* </div> */}
						</Link>
					)
				})
				:
				<h2 className='no-data-message'>Không có dữ liệu</h2>
			}
		</div>
	)
}
