import "./topbar.scss"
import { AiFillHome, AiOutlineSearch, AiTwotoneEdit } from "react-icons/ai"
import { FaUserFriends } from 'react-icons/fa'
import { TiGroup } from "react-icons/ti"
import { IoMdNotifications } from "react-icons/io";
import { BsFillChatDotsFill, BsFillCaretDownFill } from "react-icons/bs"

export default function Topbar() {
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<span className="logo">Travel</span>
			</div>

			<div className="topbarCenter">
				<div className="topbarLink">
					<span className={true ? "activeLink" : "noactiveLink"}><AiFillHome className="topbarIcon-1" />Trang Chủ</span>
					<span className="noactiveLink"><FaUserFriends className="topbarIcon-1" />TravelMap</span>
					<span className="noactiveLink"><TiGroup className="topbarIcon-1" />Shop & Service</span>
				</div>

				<div className="searchbar">
					<AiOutlineSearch className="searchIcon" />
					<input type="text" className="searchInput" placeholder="Tìm kiếm trên Travel" />
				</div>
			</div>

			<div className="topbarRight">

				<div className="iconRightSide">
					<div className="subIconRight">
						<AiTwotoneEdit className="topbarIcon-2" />
					</div>
					<p>Viết ngay</p>
				</div>

				<div className="iconRightSide">
					<div className="subIconRight">
						<IoMdNotifications className="topbarIcon-2" />
						<span className="iconBadge">1</span>
					</div>
					<p>Thông báo</p>
				</div>

				<div className="iconRightSide">
					<div className="topbarAvata">
						<img src="img/myavt.jpg" alt="avata" className="avt-topbar" />
					</div>
					<p className="name-user">Pham Dat</p>
				</div>
			</div>
		</div>
	)
}