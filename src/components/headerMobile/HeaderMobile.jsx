import './HeaderMobileStyle.scss'
import React, { useState } from 'react'
import { AiFillHome, AiOutlineLogin, AiOutlineSearch } from 'react-icons/ai'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { RoutePath } from 'router/routePath'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from 'components/loginModal/LoginModal'
import avatarDefault from 'assets/img/avatarDefault.jpg'
import Notify from 'components/topbar/components/notify/Notify'
import { FiEdit, FiMenu } from 'react-icons/fi'
import { Dropdown, Menu, message } from 'antd'
import { HiOutlineLogout } from 'react-icons/hi'
import { LOGOUT_SUCCESS } from 'reducers/authentication/actionTypes'
import { FaUserFriends } from 'react-icons/fa'


const HeaderMobile = (props) => {
	const { setIsHaveNotify, isHaveNotify } = props
	const navigate = useNavigate()
	const isLogin = useSelector(state => state.authentication.isLoggedIn)
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState('')
	const handleLogout = () => {
		window.localStorage.clear()
		dispatch({
			type: LOGOUT_SUCCESS,
			payload: [],
		})
		message.success('Đã đăng xuất!')
		window.location.reload();
	}


	const handleOnSubmit = (e) => {
		e.preventDefault()
		navigate({
			pathname: RoutePath.Search,
			search: `?${createSearchParams({
				keyword: searchValue
			})}`
		})
	}
	const menu = (
		<Menu
			items={[
				{
					label: <div className="menu-item-profile" onClick={() => { navigate(`/profile/${currentUser._id}/newfeed`) }}>
						<img src={currentUser.avatar || avatarDefault} alt="avatar" className="avt-topbar" />
						<h3>{currentUser.fullName}</h3>
						<h4>Trang cá nhân</h4>
					</div>,
					key: '0',
				},
				{
					type: 'divider',
				},
				{
					label: <Link to={RoutePath.Home} className="menu-item-logout">
						<AiFillHome className="topbarIcon-1" />
						<span>Trang Chủ</span>
					</Link>,
					key: '1',
				},
				{
					type: 'divider',
				},

				{
					label: <Link to={RoutePath.TableRaking} className="menu-item-logout" >
						<FaUserFriends className="topbarIcon-1" />
						<span>Bảng xếp hạng</span>
					</Link>,
					key: '2',
				},
				{
					type: 'divider',
				},
				{
					label: <Link to={`/profile/${currentUser._id}/about`} className="menu-item-logout">
						<FiEdit></FiEdit>
						Chỉnh sửa thông tin</Link>,
					key: '1',
				},
				{
					type: 'divider',
				},
				{
					label: <span onClick={handleLogout} className="menu-item-logout">
						<HiOutlineLogout></HiOutlineLogout>
						Đăng xuất</span>,
					key: '3',
				},
			]}
		/>
	)

	return (
		<div className='header-mobile-container'>
			<LoginModal open={open} onClose={() => setOpen(false)} />
			<div className='search-wrapper'>
				<form onSubmit={handleOnSubmit} className="search-form">
					<input type="text" placeholder="Tìm kiếm bài viết" onChange={(event) => setSearchValue(event.target.value)} />
					<div className="searchIcon" onClick={handleOnSubmit}>
						<AiOutlineSearch />
					</div>
				</form>
			</div>
			<hr className='postHr' />
			<div className='header-mobile-wrapper'>
				<div className="logo-wrapper">
					<Link to="/home">
						<span className="logo">Travel Social Network</span>
					</Link>
				</div>
				<div className="header-right">
					{isLogin ?
						<>
							<Notify setIsHaveNotify={setIsHaveNotify} isHaveNotify={isHaveNotify} />
							<Dropdown overlayClassName='overlay-drop-down-fixed' overlay={menu} trigger={['click']}>
								<div >
									<FiMenu className='menu-icon' />
								</div>
							</Dropdown>
						</>
						:
						<div onClick={() => setOpen(true)} className="sign-in">
							<div className="subIconRight">
								<AiOutlineLogin className="topbarIcon-2" />
							</div>
							<p>Đăng nhập</p>
						</div>
					}

				</div >
			</div>
		</div>
	)
}

export default HeaderMobile