import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Menu, Row } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import './profileFollow.scss'
import followApi from 'api/followApi';
import authApi from 'api/authApi';
import { Link } from 'react-router-dom';
export default function ProfileFollow(props) {
	const { typetab } = props
	const [usersInfo, setUsersInfo] = useState([])
	useEffect(() => {
		window.scrollTo(0, 0);
		const params = {
			userId: usersInfo._id,
			page: 1,
			size: 10
		}
		const getFollower = async () => {
			try {
				const response = await followApi.getFollower(params)
				if (response.status_code === 9999) {
					return response.payload.map((ele) => ele.userIdTarget)
				}
				if (response.status_code === -9999) {
					console.log(response.message)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getFollower().then((res, req) =>
			console.log(res)
		)
		const getFollowUser = async () => {
			try {
				const response = await followApi.getFollowUser(params)
				if (response.status_code === 9999) {
					const data = response.payload.map((ele) => ele.userId)
					return data
				}
				if (response.status_code === -9999) {
					console.log(response.message)
				}
			} catch (error) {
				console.log(error)
			}
		}
		const getUsersInfo = async (id) => {
			try {
				const param = { userId: id }
				const response = await authApi.getUserInfoApi(param)
				if (response.status_code === 9999) {
					console.log('aaaaaaaaaa', response.payload)
					setUsersInfo((state) => [...state, response.payload])
				}
				if (response.status_code === -9999) {
					console.log(response.message)
				}
			} catch (error) {
				console.log(error)
			}
		}
		if (typetab === 'follower') {
			getFollower().then((res, req) => {
				res.map((id) => {
					getUsersInfo(id)
				})
			})
		}
		if (typetab === 'following') {
			getFollowUser().then((res, req) => {
				res.map((id) => {
					getUsersInfo(id)
				})
			})
		}

	}, [typetab])
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
			<Row>
				{usersInfo.map((ele, idx) => {
					return (
						<Col xs={24} sm={12} key={idx} justify="center">
							<Link to={`profile/${ele._id}/newfeed`}>

								<div className="container-item-friends">
									<div>
										<img alt="avata" src={ele.avatar} />
										<span>{ele.fullName}</span>

									</div>
									{typetab === 'following' ?
										<Dropdown
											overlay={menu}
											trigger={["click"]}
											placement="bottomRight"
										>
											<BsThreeDotsVertical className="dropdown-btn" />
										</Dropdown>
										:
										<></>
									}

								</div>
							</Link>
						</Col>
					);
				})}
			</Row>
		</div>
	)
}
