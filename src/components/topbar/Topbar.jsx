import "./topbar.scss"
import { AiFillHome, AiOutlineSearch } from "react-icons/ai"
import { FaUserFriends } from 'react-icons/fa'
import { IoMdNotifications } from "react-icons/io";
import LoginModal from "../loginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_SUCCESS } from "../../reducers/authentication/actionTypes";


export default function Topbar() {
	const navigate = useNavigate()
	const isLogin = useSelector(state => state.authentication.isLoggedIn)
	const dispatch = useDispatch();
	const handleLogout = () => {
		window.localStorage.clear()
		dispatch({
			type: LOGOUT_SUCCESS,
			payload: [],
		})
	}
	const menu = (
		<Menu
			items={[
				{
					label: <a onClick={()=>{navigate('/profile/newfeed')}}>Trang cá nhân</a>,
					key: '0',
				},
				{
					type: 'divider',
				},
				{
					label: <a onClick={handleLogout}>Đăng xuất</a>,
					key: '1',
				},
			]}
		/>
	)
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/">
					<span className="logo">Travel</span>
				</Link>
			</div>

			<div className="topbarCenter">
				<div className="topbarLink">
					<span className={true ? "activeLink" : "noactiveLink"}><AiFillHome className="topbarIcon-1" />Trang Chủ</span>
					<span className="noactiveLink"><FaUserFriends className="topbarIcon-1" />Bạn Bè</span>
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
									<img src="img/myavt.jpg" alt="avata" className="avt-topbar" />
								</div>
								<p className="name-user">Pham Dat</p>
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