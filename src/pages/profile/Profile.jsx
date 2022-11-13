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

export default function Profile() {
	let { userId, tab } = useParams()
	const [accountInfo, setAccountInfo] = useState({})
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [listPost, setListPost] = useState([])
	const [followStatus, setFollowStatus] = useState(false)
	useEffect(() => {
		window.scrollTo(0, 0);
		const getUserInfo = async () => {
			try {
				const params = { userId: userId }
				const response = await authApi.getUserInfoApi(params)
				if (response.status_code === 9999) {
					await setAccountInfo((state) => ({ ...state, ...response.payload }))
				}
				if (response.status_code === -9999) {
					console.log(response.message)
				}
			} catch (error) {
				console.log(error)
			}
		}
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
		getUserInfo()
		getAllPost()
	}, [userId])
	useEffect(() => {
		const getMyFollowUser = async () => {
			const params = {
				page: 1,
				size: 10,
				userId: currentUser._id
			}
			try {
				const response = await followApi.getFollowUser(params)
				if (response.status_code === 9999) {
					const listFollowerId = response.payload.map((ele) => ele.userIdTarget)
					console.log('ttttttttttt', listFollowerId)
					if (listFollowerId.includes(userId)) {
						setFollowStatus(true)
					}
				}
				if (response.status_code === -9999) {
					console.log(response.message)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getMyFollowUser()
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
			<div className="profile">
				<Row justify='center'>
					<Col span={16} className="profile-image">
						<div className="coverImg">
							<img src={accountInfo.avatar || avatarDefault} alt="cover" />
						</div>
						<div className="containAvtImg">
							<div className="avataProfile">
								<img src={accountInfo.avatar || avatarDefault} alt="avt Img" className="avataProfileImg" />
							</div>
							<p className="text-name-user-top-profile">{accountInfo.fullName}</p>
							<p className="text-top-profile">Cấp thành viên:<span style={{ fontWeight: 500 }}>VIP</span></p>
							<div>
								<span style={{ marginRight: 50 }}>Bài đã đăng: <span style={{ fontWeight: 500 }}>23</span></span>
								<span>Lượt theo dõi: <span style={{ fontWeight: 500 }}>182</span></span>
							</div>
						</div>
						<hr className="rightbarHr" />
						<div className="controlProfile">
							<div className="sub-controlProfile">
								<div className={tab === 'newfeed' ? "tab-profile-active" : "tab-profile"}>
									<Link to={`/profile/${accountInfo._id}/newfeed`}>
										Bài viết
									</Link>
								</div>
								<div className={tab === 'about' ? "tab-profile-active" : "tab-profile"}>
									<Link to={`/profile/${accountInfo._id}/about`}>
										Giới thiệu
									</Link>
								</div>
								<div className={tab === 'follower' ? "tab-profile-active" : "tab-profile"}>
									<Link to={`/profile/${accountInfo._id}/follower`}>
										Người theo dõi
									</Link>
								</div>
								<div className={tab === 'following' ? "tab-profile-active" : "tab-profile"}>
									<Link to={`/profile/${accountInfo._id}/following`}>
										Đang theo dõi
									</Link>
								</div>
							</div>
							{

								currentUser._id !== accountInfo._id &&
								<button className="btn-follow" onClick={handleFolowBtn}>{followStatus ? <span><BsCheck /> <span>Đang theo dõi</span></span> : <span><HiOutlineUserAdd /> <span>Theo dõi</span></span>}</button>
							}
						</div>
					</Col>
				</Row>
				<div className="downProfile">
					<Row justify="center">
						<Col span={12} >
							{
								tab === 'newfeed' &&
								<>
									{
										currentUser._id === accountInfo._id &&
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
								<ProfileAbout accountInfo={accountInfo} />
							}
							{
								tab === 'follower' &&
								<ProfileFollow typetab={'follower'} />
							}
							{
								tab === 'following' &&
								<ProfileFollow typetab={'following'} />
							}
						</Col>
					</Row>
				</div>
			</div>
		</div >
	)
}
