import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import postApi from "../../api/postApi";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import Topbar from "../../components/topbar/Topbar";
import ProfileAbout from "./components/profileabout/ProfileAbout";
import ProfileFollow from "./components/profilefollow/ProfileFollow";
import "./profile.scss";
import avatarDefault from "assets/img/avatarDefault.jpg";
import authApi from "api/authApi";
import followApi from "api/followApi";
import { BsCheck } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import { getFollowUser, getUsersInfoById } from "function/callApi";

export default function Profile() {
	let { userId, tab } = useParams()
	const [userInfo, setUserInfo] = useState({})
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [listPost, setListPost] = useState([])
	const [followStatus, setFollowStatus] = useState(false)
	useEffect(() => {
		window.scrollTo(0, 0);
		const getAllPost = async () => {
			try {
				const data = {
					page: 1,
					size: 20,
					userId: userId,
				}
				const response = await postApi.getAllPostByUserId(data)
				if (response.status_code === 9999) {
					setListPost(response.payload)
				}
				if (response.status_code === -9999) {
					message.warning('Tải bài viết không thành công!')
				}
			} catch (error) {
				console.log(error)
			}
		}
		getUsersInfoById(userId).then((res, req) => {
			setUserInfo(res)
		})
		getAllPost()
	}, [userId])
	useEffect(() => {
		getFollowUser(currentUser._id).then((res, req) => {
			const listFollowerId = res.map((ele) => ele.userIdTarget)
			if (listFollowerId.includes(userId)) {
				setFollowStatus(true)
			}
		})
	}, [userId])
	const handleFolowBtn = async () => {
		const data = {
			userIdTarget: userId
		}
		if (!followStatus) {
			try {
				const response = await followApi.follow(data)
				if (response.status_code === 9999) {
					message.success('Theo dõi thành công!')
					setFollowStatus(true)
				}
				if (response.status_code === -9999) {
					message.warning('Theo dõi không thành công!')
				}
			} catch (error) {
				console.log(error)
			}
		}
		if (followStatus) {
			try {
				const response = await followApi.unFollow(data)
				if (response.status_code === 9999) {
					message.success('Bỏ theo dõi thành công!')
					setFollowStatus(false)
				}
				if (response.status_code === -9999) {
					message.warning('Bỏ theo dõi không thành công!')
				}
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<div className="container">
			<Topbar />
			<div className="wrapper-profile">
				<div className="top-profile">
					<div className="coverImg">
						<img src={userInfo?.avatar || avatarDefault} alt="cover" />
					</div>
					<div className="containAvtImg">
						<div className="avataProfile">
							<img src={userInfo?.avatar || avatarDefault} alt="avt Img" className="avataProfileImg" />
						</div>
						<p className="text-name-user-top-profile">{userInfo?.fullName}</p>
						<p className="text-top-profile">Cấp thành viên:<span style={{ fontWeight: 500 }}>VIP</span></p>
						<div>
							<span style={{ marginRight: 50 }}>Bài đã đăng: <span style={{ fontWeight: 500 }}>{listPost?.length || 0}</span></span>
							<span>Lượt theo dõi: <span style={{ fontWeight: 500 }}>1</span></span>
						</div>
					</div>
					<hr className="rightbarHr" />
					<div className="controlProfile">
						<div className="sub-controlProfile">
							<div className={tab === 'newfeed' ? "tab-profile-active" : "tab-profile"}>
								<Link to={`/profile/${userInfo?._id}/newfeed`}>
									Bài viết
								</Link>
							</div>
							<div className={tab === 'about' ? "tab-profile-active" : "tab-profile"}>
								<Link to={`/profile/${userInfo?._id}/about`}>
									Giới thiệu
								</Link>
							</div>
							<div className={tab === 'follower' ? "tab-profile-active" : "tab-profile"}>
								<Link to={`/profile/${userInfo?._id}/follower`}>
									Người theo dõi
								</Link>
							</div>
							<div className={tab === 'following' ? "tab-profile-active" : "tab-profile"}>
								<Link to={`/profile/${userInfo?._id}/following`}>
									Đang theo dõi
								</Link>
							</div>
						</div>
						{
							currentUser._id !== userInfo?._id &&
							<button className="btn-follow" onClick={handleFolowBtn}>{followStatus ? <span><BsCheck /> <span>Đang theo dõi</span></span> : <span><HiOutlineUserAdd /> <span>Theo dõi</span></span>}</button>
						}
					</div>
				</div>
				<div className="downProfile">
					{
						tab === 'newfeed' &&
						<>
							{
								currentUser._id === userInfo?._id &&
								<Share />
							}
							{listPost ? listPost.map((ele, idx) => {
								return <Post data={ele} key={idx} />
							}) :
								<div className="container-no-data">
									<h1>Chưa có bài viêt nào</h1>
								</div>
							}
						</>
					}
					{
						tab === 'about' &&
						<ProfileAbout userInfo={userInfo} />
					}
					{
						tab === 'follower' &&
						<ProfileFollow typetab={'follower'} userInfo={userInfo} />
					}
					{
						tab === 'following' &&
						<ProfileFollow typetab={'following'} userInfo={userInfo} />
					}
				</div>
			</div>
		</div >
	)
}
