import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Menu, Row } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import './profileFollow.scss'
import { Link } from 'react-router-dom';
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { getFollower, getFollowUser, getUsersInfoById } from 'function/callApi';
export default function ProfileFollow(props) {
	const { typetab, userInfo } = props
	const [listUsersInfo, setListUsersInfo] = useState([])
	useEffect(() => {
		window.scrollTo(0, 0);
		if (typetab === 'follower') {
			getFollower(userInfo._id).then((res, req) => {
				res.map((ele) => {
					getUsersInfoById(ele.userId).then(
						(res, req) => {
							setListUsersInfo((prev) => [...prev, res])
						}
					)
				})
			})
		}
		if (typetab === 'following') {
			getFollowUser(userInfo._id).then((res, req) => {
				res.map((ele) => {
					getUsersInfoById(ele.userIdTarget).then(
						(res, req) => {
							setListUsersInfo((prev) => [...prev, res])
						}
					)
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
			{listUsersInfo.length !== 0 ?
				<Row>
					{
						listUsersInfo.map((ele, idx) => {
							return (
								<Col md={24} lg={12} key={idx} justify="center">
									<Link to={`/profile/${ele._id}/newfeed`}>

										<div className="container-item-friends">
											<div>
												<img alt="avata" src={ele.avatar || avatarDefault} />
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
						})
					}
				</Row>
				:
				<h2 className='no-data-message'>Không có dữ liệu</h2>
			}
		</div>
	)
}
