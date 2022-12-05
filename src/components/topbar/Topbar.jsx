import "./topbar.scss"
import { AiFillHome, AiOutlineLogin, AiOutlineSearch } from "react-icons/ai"
import { FaUserFriends } from 'react-icons/fa'
import { IoMdNotifications } from "react-icons/io";
import LoginModal from "../loginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, message } from "antd";
import { createSearchParams, Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { LOGOUT_SUCCESS } from "reducers/authentication/actionTypes";
import { HiOutlineLogout } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'
import avatarDefault from 'assets/img/avatarDefault.jpg'
import { useState } from "react";
import { RoutePath } from "router/routePath";
import Notify from "./components/notify/Notify";

export default function Topbar() {
	const navigate = useNavigate()
	const isLogin = useSelector(state => state.authentication.isLoggedIn)
	const [open, setOpen] = useState(false);
	const currentUser = useSelector(state => state.authentication.currentUser)
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState('')
	const handleOnSubmit = (e) => {
		e.preventDefault()
		navigate({
			pathname: RoutePath.Search,
			search: `?${createSearchParams({
				keyword: searchValue
			})}`
		})
	}
	const handleLogout = () => {
		window.localStorage.clear()
		dispatch({
			type: LOGOUT_SUCCESS,
			payload: [],
		})
		message.success('Đã đăng xuất!')
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
					key: '2',
				},
			]}
		/>
	)
	return (
		<div className="topbarContainer">
			<LoginModal open={open} onClose={() => setOpen(false)} />
			<div className="topbarLeft">
				<Link to="/home">
					<span className="logo">Travel</span>
				</Link>
			</div>

			<div className="topbarCenter">
				<div className="topbarLink">
					<NavLink to={RoutePath.Home} className={({ isActive }) => (isActive ? "activeLink" : "noactiveLink")}>
						<AiFillHome className="topbarIcon-1" />Trang Chủ
					</NavLink>
					<NavLink to={RoutePath.TableRaking} className={({ isActive }) => (isActive ? "activeLink" : "noactiveLink")}>
						<FaUserFriends className="topbarIcon-1" />Bảng xếp hạng
					</NavLink>
				</div>

				<form onSubmit={handleOnSubmit} className="searchbar">
					<input type="text" placeholder="Tìm kiếm trên Travel" onChange={(event) => setSearchValue(event.target.value)} />
					<div className="searchIcon" onClick={handleOnSubmit}>
						<AiOutlineSearch />
					</div>
				</form>
			</div>

			<div className="topbarRight">
				{isLogin ?
					<>

						{/* <Dropdown overlay={menu} trigger={['click']}>
							<div className="iconRightSide">
								<div className="subIconRight">
									<IoMdNotifications className="topbarIcon-2" />
									<span className="iconBadge">1</span>
								</div>
								<p>Thông báo</p>
							</div>
						</Dropdown> */}
						<Notify />
						<Dropdown overlay={menu} trigger={['click']}>
							<div className="account-manager">
								<div className="topbarAvata">
									<img src={currentUser.avatar || avatarDefault} alt="avatar" className="avt-topbar" />
								</div>
								<p>{currentUser.fullName}</p>
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
		</div >
	)
}