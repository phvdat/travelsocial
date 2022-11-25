import "./topbar.scss"
import { AiFillHome, AiOutlineSearch } from "react-icons/ai"
import { FaUserFriends } from 'react-icons/fa'
import { IoMdNotifications } from "react-icons/io";
import LoginModal from "../loginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LOGOUT_SUCCESS } from "reducers/authentication/actionTypes";
import { HiOutlineLogout } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'
import avatarDefault from 'assets/img/avatarDefault.jpg'

export default function Topbar() {
	const navigate = useNavigate()
	const { tab } = useParams()
	const isLogin = useSelector(state => state.authentication.isLoggedIn)
	const currentUser = useSelector(state => state.authentication.currentUser)
	const dispatch = useDispatch();
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
					label: <a onClick={() => { navigate(`/profile/${currentUser._id}/about`) }} className="menu-item-logout">
						<FiEdit></FiEdit>
						Chỉnh sửa thông tin</a>,
					key: '1',
				},
				{
					type: 'divider',
				},
				{
					label: <a onClick={handleLogout} className="menu-item-logout">
						<HiOutlineLogout></HiOutlineLogout>
						Đăng xuất</a>,
					key: '2',
				},
			]}
		/>
	)
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/home">
					<span className="logo">Travel</span>
				</Link>
			</div>

			<div className="topbarCenter">
				<div className="topbarLink">
					<Link to='/home' className={tab === 'home' ? "activeLink" : "noactiveLink"}>
						<AiFillHome className="topbarIcon-1" />Trang Chủ
					</Link>
					<Link to='/table-ranking' className={tab === 'table-ranking' ? "activeLink" : "noactiveLink"}>
						<FaUserFriends className="topbarIcon-1" />Bảng xếp hạng
					</Link>
				</div>

				<div className="searchbar">
					<AiOutlineSearch className="searchIcon" />
					<input type="text" className="searchInput" placeholder="Tìm kiếm trên Travel" />
				</div>
			</div>

			<div className="topbarRight">
				{isLogin ?
					<>
						<div className="iconRightSide">
							<div className="subIconRight">
								<IoMdNotifications className="topbarIcon-2" />
								<span className="iconBadge">1</span>
							</div>
							<p>Thông báo</p>
						</div>
						<Dropdown overlay={menu} trigger={['click']}>
							<div className="iconRightSide">
								<div className="topbarAvata">
									<img src={currentUser.avatar || avatarDefault} alt="avatar" className="avt-topbar" />
								</div>
								<p>{currentUser.fullName}</p>
							</div>
						</Dropdown>
					</>
					:
					<LoginModal />
				}

			</div >
		</div >
	)
}