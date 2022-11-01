import "./rightbar.css"
import React from "react";
import {
	Link
} from "react-router-dom";
import { FaUserFriends } from 'react-icons/fa';

export default function Rightbar(props) {
	const { user } = props
	const friendsArray = [
		{ name: "Nguyễn B ", url: "https://bom.so/6unBRC" },
		{ name: "Nguyen Van A", url: "https://bom.so/6unBRC" },
		{ name: "Trần Lê", url: "https://bom.so/6unBRC" },
		{ name: "Hoàng Đức", url: "https://bom.so/6unBRC" },
		{ name: "Nguyễn", url: "https://bom.so/6unBRC" },
		{ name: "Phạm Van Dat", url: "https://bom.so/6unBRC" },
		{ name: "Lê Hoàng", url: "https://bom.so/6unBRC" },
		{ name: "Nguyen Van A", url: "https://bom.so/6unBRC" },
		{ name: "Trần Lê", url: "https://bom.so/6unBRC" },
		{ name: "Hoàng Đức", url: "https://bom.so/6unBRC" },
		{ name: "Nguyễn", url: "https://bom.so/6unBRC" },
		{ name: "Phạm Van Dat", url: "https://bom.so/6unBRC" },
		{ name: "Lê Hoàng", url: "https://bom.so/6unBRC" },
		{ name: "Nguyen Van A", url: "https://bom.so/6unBRC" },
		{ name: "Trần Lê", url: "https://bom.so/6unBRC" },
		{ name: "Hoàng Đức", url: "https://bom.so/6unBRC" },
		{ name: "Nguyễn", url: "https://bom.so/6unBRC" },
		{ name: "Phạm Van Dat", url: "https://bom.so/6unBRC" },
		{ name: "Lê Hoàng", url: "https://bom.so/6unBRC" },
		{ name: "Nguyen Van A", url: "https://bom.so/6unBRC" },
		{ name: "Trần Lê", url: "https://bom.so/6unBRC" },
		{ name: "Hoàng Đức", url: "https://bom.so/6unBRC" },
		{ name: "Nguyễn", url: "https://bom.so/6unBRC" },
		{ name: "Phạm Van Dat", url: "https://bom.so/6unBRC" },
		{ name: "Lê Hoàng", url: "https://bom.so/6unBRC" },
		{ name: "Nguyen Van A", url: "https://bom.so/6unBRC" },
		{ name: "Trần Lê", url: "https://bom.so/6unBRC" },
		{ name: "Hoàng Đức", url: "https://bom.so/6unBRC" },
		{ name: "Nguyễn", url: "https://bom.so/6unBRC" },
		{ name: "Phạm Van Dat", url: "https://bom.so/6unBRC" },
	]

	const HomeRightbar = () => {
		return (
			<>
				<div className="rightbar">
					<div className="wrapRightbar">
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
					<Link to="/friends" style={{ textDecoration: "none" }}>
						<p>Bạn bè</p>
					</Link>
					<div className="friendItemsProfile">
						{friends_9.map((friend, idx) => {
							return (
								<Link to="/" style={{ textDecoration: "none", marginTop: '10px' }}>
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
