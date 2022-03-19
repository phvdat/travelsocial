import "./rightbar.css"
import React from "react";
import {
	Link
} from "react-router-dom";
import { FaUserFriends } from 'react-icons/fa';

export default function Rightbar(props) {
	const { user } = props
	const friendsArray = [
		{ name: "Trương Thị Thu Thảo ", url: "/assets/person/avt-06.jpg" },
		{ name: "Thúy Ngân", url: "/assets/person/avt-05.jpg" },
		{ name: "Ngọc Diễm", url: "/assets/person/avt-04.jpg" },
		{ name: "Hoàng Đức", url: "/assets/person/avt-03.jpg" },
		{ name: "Trương Thủy", url: "/assets/person/avt-02.jpg" },
		{ name: "Minh Thư", url: "/assets/person/avt-01.jpg" },
		{ name: "Thu Thảo", url: "/assets/person/avt-06.jpg" },
		{ name: "Thúy Ngân", url: "/assets/person/avt-05.jpg" },
		{ name: "Ngọc Diễm", url: "/assets/person/avt-04.jpg" },
		{ name: "Hoàng Đức", url: "/assets/person/avt-03.jpg" },
		{ name: "Trương Thủy", url: "/assets/person/avt-02.jpg" },
		{ name: "Minh Thư", url: "/assets/person/avt-01.jpg" },
		{ name: "Thu Thảo", url: "/assets/person/avt-06.jpg" },
		{ name: "Thúy Ngân", url: "/assets/person/avt-05.jpg" },
		{ name: "Ngọc Diễm", url: "/assets/person/avt-04.jpg" },
		{ name: "Hoàng Đức", url: "/assets/person/avt-03.jpg" },
		{ name: "Trương Thủy", url: "/assets/person/avt-02.jpg" },
		{ name: "Minh Thư", url: "/assets/person/avt-01.jpg" },
		{ name: "Thu Thảo", url: "/assets/person/avt-06.jpg" },
		{ name: "Thúy Ngân", url: "/assets/person/avt-05.jpg" },
		{ name: "Ngọc Diễm", url: "/assets/person/avt-04.jpg" },
		{ name: "Hoàng Đức", url: "/assets/person/avt-03.jpg" },
		{ name: "Trương Thủy", url: "/assets/person/avt-02.jpg" },
		{ name: "Minh Thư", url: "/assets/person/avt-01.jpg" },
		{ name: "Thu Thảo", url: "/assets/person/avt-06.jpg" },
		{ name: "Thúy Ngân", url: "/assets/person/avt-05.jpg" },
		{ name: "Ngọc Diễm", url: "/assets/person/avt-04.jpg" },
		{ name: "Hoàng Đức", url: "/assets/person/avt-03.jpg" },
		{ name: "Trương Thủy", url: "/assets/person/avt-02.jpg" },
		{ name: "Minh Thư", url: "/assets/person/avt-01.jpg" },
	]

	const HomeRightbar = () => {
		return (
			<>
				<div className="rightbar">
					<div className="wrapRightbar">
						<div className="friendReqList">
							<FaUserFriends className="friendReqIcon" />
							<span className="friendRedText">Lời mời kết bạn</span>
							<div className="friendReq">
								<img src="/assets/person/avt-04.jpg" alt="avt-user" className="avt-user" />
								<div>
									<p className="friend-name">Thúy Ngân</p>
									<div className="btnCtrl">
										<button className="acceptBtn">Xác nhận</button>
										<button className="cancelBtn">Xóa</button>
									</div>
								</div>
							</div>
						</div>
						<hr className="rightbarHr" />
						<p className="rightbarText">Người liên hệ</p>
						<ul className="listFriends">
							{
								friendsArray.map((friend, idx) => {
									return <li className="friendsItem" key={idx}>
										<img src={friend.url} alt="avt-frd" className="avt-friend" />
										<div className="onlStatus"></div>
										<span>{friend.name}</span>
									</li>
								})
							}
						</ul>

						<hr className="rightbarHr" />
					</div>
				</div >
			</>
		);
	};
	const ProfileRightbar = () => {
		const friends_9 = friendsArray.slice(0, 9)
		console.log(friends_9)
		return (
			<>
				<div className="friendsProfile">
					<Link to="/friends" style={{textDecoration:"none"}}>
						<p>Bạn bè</p>
					</Link>
					<div className="friendItemsProfile">
						{friends_9.map((friend, idx) => {
							return (
								<Link to="/" style={{textDecoration:"none", marginTop: '10px'}}>
									<div className="friendItemProfile" key={idx}>
										<img src={friend.url} alt="" className="avt-frd-prof" />
										<p>{friend.name}</p>
									</div>
								</Link>
							)
						})
						}
					</div>
				</div>
			</>
		)
	}
	return (
		<div>
			{user ? <ProfileRightbar /> : <HomeRightbar />}
		</div>
	)
}
