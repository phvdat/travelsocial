import "./topbar.scss"
import { AiFillHome, AiOutlineSearch } from "react-icons/ai"
import { FaUserFriends } from 'react-icons/fa'
import { TiGroup } from "react-icons/ti"
import { IoMdNotifications } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { BsFillChatDotsFill, BsFillCaretDownFill } from "react-icons/bs"

export default function Topbar() {
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<span className="logo">Travel</span>
				<span className="searchbar">
					<AiOutlineSearch className="searchIcon" />
					<input type="text" className="searchInput" placeholder="Tìm kiếm trên Travel" />
				</span>
			</div>
			<div className="topbarCenter">
				<div className="topbarLink">
					<span className={true ? "activeLink" : "noactiveLink"}><AiFillHome className="topbarIcon-1" />Trang Chủ</span>
					<span className="noactiveLink"><FaUserFriends className="topbarIcon-1" />Bạn Bè</span>
					<span className="noactiveLink"><TiGroup className="topbarIcon-1" />Nhóm</span>
				</div>
			</div>
			<div className="topbarRight">
				<div className="topbarAvata">
					<img src="assets/fake/myavt.jpg" alt="avata" className="avt-topbar" />
					<span className="name-user">Phạm Văn Đạt</span>
				</div>
				{/* <div className="topbarIconItem">
					<IoPersonAdd className="topbarIcon-2" />
					<span className="iconBadge">10</span>
				</div> */}
				<div className="topbarIconItem">
					<BsFillChatDotsFill className="topbarIcon-2" />
					<span className="iconBadge">1</span>
				</div>
				<div className="topbarIconItem">
					<IoMdNotifications className="topbarIcon-2" />
					<span className="iconBadge">1</span>
				</div>
				<div className="topbarIconItem">
					<BsFillCaretDownFill className="topbarIcon-2" />
					<span className="iconBadge">1</span>
				</div>
			</div>
		</div>
	)
}

