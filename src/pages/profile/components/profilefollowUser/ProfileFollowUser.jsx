import React, { useEffect, useState } from 'react'
import { Dropdown, Menu, Pagination } from "antd";
import '../profilefollower/ProfileFollower.scss'
import { Link } from 'react-router-dom';
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { getFollowUser, getUsersInfoById } from 'function/callApi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
export default function ProfileFollower(props) {
	const { userInfo } = props

	const currentUser = useSelector(state => state.authentication.currentUser)
	const [listUsersInfo, setListUsersInfo] = useState([])
	const [page, setPage] = useState(1)
	const [totalItems, setTotalItems] = useState(1)

	const getListFollowUser = async (page, id) => {
		getFollowUser(id, page, 10).then((res) => {
			setTotalItems(res.totalItems)
			res.items.map((ele) => (
				getUsersInfoById(ele.userIdTarget).then(
					(res) => {
						setListUsersInfo((prev) => [...prev, res])
					}
				)
			))
		})
	}
	useEffect(() => {
		getListFollowUser(page, userInfo._id)
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
		<div className='profile-self'>
			<div className='profile-follow-content'>
				{listUsersInfo.length !== 0 ?
					listUsersInfo.map((ele, idx) => {
						return (
							<Link key={idx} to={`/profile/${ele._id}/newfeed`} className="container-item-friends">
								<div>
									<img alt="avata" src={ele.avatar || avatarDefault} />
									<span>{ele.fullName}</span>
								</div>
								{
									userInfo._id === currentUser._id &&
									<Dropdown
										overlay={menu}
										trigger={["click"]}
										placement="bottomRight"
									>
										<BsThreeDotsVertical className="dropdown-btn" />
									</Dropdown>
								}
							</Link>
						)
					})
					:
					<h2 className='no-data-message'>Không có dữ liệu</h2>
				}
			</div >
			{
				listUsersInfo.length !== 0 &&
				<div style={{ textAlign: 'end', margin: '8px 0' }}>
					<Pagination onChange={e => setPage(e)} showSizeChanger={false} defaultCurrent={page} total={totalItems} />
				</div>
			}
		</div>
	)
}
