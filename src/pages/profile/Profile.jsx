import { message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import postApi from "../../api/postApi";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import ProfileAbout from "./components/profileabout/ProfileAbout";
import "./profile.scss";
import avatarDefault from "assets/img/avatarDefault.jpg";
import followApi from "api/followApi";
import { BsCheck } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import { getFollower, getFollowUser, getUsersInfoById } from "function/callApi";
import ProfileFollower from "./components/profilefollower/ProfileFollower";
import ProfileFollowUser from "./components/profilefollowUser/ProfileFollowUser";
import MoreAction from "./components/moreAction/MoreAction";
import LoginModal from "components/loginModal/LoginModal";

export default function ProfilePage() {
	let { userId, tab } = useParams()
	const [userInfo, setUserInfo] = useState({})
	const currentUser = useSelector(state => state.authentication.currentUser)
	const isLogin = useSelector(state => state.authentication.isLoggedIn)
	const [listPost, setListPost] = useState([])
	const [followStatus, setFollowStatus] = useState(false)
	const [numOfFollower, setNumOfFollower] = useState(0)
	const [open, setOpen] = useState(false)
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [tab])
	useEffect(() => {
		window.scrollTo(0, 0)
		const getAllPost = async () => {
			try {
				const data = {
					page: 1,
					size: 20,
					userId: userId,
				}
				const response = await postApi.getAllPostByUserId(data)
				if (response.status_code === 9999) {
					setListPost(response.payload.items)
				}
				if (response.status_code === -9999) {
					message.warning('Tải bài viết không thành công!')
				}
			} catch (error) {
				console.log(error)
			}
		}
		getUsersInfoById(userId).then((res) => {
			setUserInfo(res)
			console.log(res)
		})
		getAllPost()
	}, [userId])

	useEffect(() => {
		getFollowUser(currentUser._id, 1, 999999).then((res) => {
			const idx = res.items.findIndex((item) => userId === item.userIdTarget)
			if (idx !== -1) {
				setFollowStatus(true)
			}
		})
		getFollower(currentUser._id, 1, 999999).then(res => {
			setNumOfFollower(res.items.length)
		})
	}, [userId, currentUser._id])

	const handleFolowBtn = async () => {
		if (!isLogin) {
			setOpen(true)
			return
		}
		if (currentUser.status !== 'active') {
			message.warning('Tài khoản của bạn đã bị khoá')
			return
		}
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
			<LoginModal open={open} onClose={() => setOpen(false)} />
			<div className="wrapper-profile">
				<div className="top-profile">
					<div className="coverImg">
						<img src={userInfo?.avatar || avatarDefault} referrerPolicy='no-referrer' alt="cover" />
					</div>
					<div className="containAvtImg">
						<div className="avataProfile">
							<img src={userInfo?.avatar || avatarDefault} alt="avt Img" className="avataProfileImg" />
						</div>
						<p className="text-name-user-top-profile">{userInfo?.fullName}</p>
						<p className="text-top-profile">Điểm tích luỹ thành viên:<span style={{ fontWeight: 500 }}>{userInfo.experiencePoint}</span></p>
						<div>
							<span style={{ marginRight: 50 }}>Bài đã đăng: <span style={{ fontWeight: 500 }}>{listPost?.length || 0}</span></span>
							<span>Lượt theo dõi: <span style={{ fontWeight: 500 }}>{numOfFollower}</span></span>
						</div>
					</div>
					<hr className="rightbarHr" />
					<div className="controlProfile">
						<div className="sub-controlProfile">
							<NavLink className={({ isActive }) => (isActive ? "tab-profile-active" : "tab-profile")}
								to={`/profile/${userInfo?._id}/newfeed`}>
								<span>Bài viết</span>
							</NavLink>
							<NavLink className={({ isActive }) => (isActive ? "tab-profile-active" : "tab-profile")}
								to={`/profile/${userInfo?._id}/about`}>
								Giới thiệu
							</NavLink>
							<NavLink className={({ isActive }) => (isActive ? "tab-profile-active" : "tab-profile")}
								to={`/profile/${userInfo?._id}/follower`}>
								Người theo dõi
							</NavLink>
							<NavLink className={({ isActive }) => (isActive ? "tab-profile-active" : "tab-profile")}
								to={`/profile/${userInfo?._id}/following`}>
								Đang theo dõi
							</NavLink>
						</div>
						<div style={{ display: 'flex' }}>
							{/* <AiFillLock className="lock-icon" /> */}
							{
								currentUser._id !== userInfo?._id &&
								<button className="btn-follow" onClick={handleFolowBtn}>{followStatus ? <span><BsCheck /> <span>Đang theo dõi</span></span> : <span><HiOutlineUserAdd /> <span>Theo dõi</span></span>}</button>
							}
							{
								currentUser.isAdmin &&
								<MoreAction userInfo={userInfo} />
							}
						</div>
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
							{listPost.length !== 0 ? listPost.map((ele, idx) => {
								return <Post postData={ele} key={idx} />
							}) :
								<div className="container-no-data">
									<h1>Chưa có bài viết nào</h1>
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
						<ProfileFollower userInfo={userInfo} />
					}
					{
						tab === 'following' &&
						<ProfileFollowUser userInfo={userInfo} />
					}
				</div>
			</div>
		</div >
	)
}
