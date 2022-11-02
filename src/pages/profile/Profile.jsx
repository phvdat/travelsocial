import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import postApi from "../../api/postApi";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import Topbar from "../../components/topbar/Topbar";
import ProfileAbout from "./components/profileabout/ProfileAbout";
import ProfileFollow from "./components/profilefollow/ProfileFollow";
import "./profile.scss";

export default function Profile() {
	let { tab } = useParams()
	const [listPost, setListPost] = useState([])
	useEffect(() => {
		const getAllPost = async () => {
			try {
				const data = {
					page: 1,
					size: 20,
					status: "public"
				}
				const response = await postApi.getAllPost(data)
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
		getAllPost()
	}, [])

	return (
		<div className="container">
			<Topbar />
			<div className="profile">
				<Row justify='center'>
					<Col span={16} className="profile-image">
						<div className="coverImg">
							<img src='https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg' alt="cover" />
						</div>
						<div className="containAvtImg">
							<div className="avataProfile">
								<img src="https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg" alt="avt Img" className="avataProfileImg" />
							</div>
							<p className="text-name-user-top-profile">Phạm Văn Đạt</p>
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
									<Link to='/profile/newfeed'>
										Bài viết
									</Link>
								</div>
								<div className={tab === 'about' ? "tab-profile-active" : "tab-profile"}>
									<Link to='/profile/about'>
										Giới thiệu
									</Link>
								</div>
								<div className={tab === 'follower' ? "tab-profile-active" : "tab-profile"}>
									<Link to='/profile/follower'>
										Người theo dõi
									</Link>
								</div>
								<div className={tab === 'following' ? "tab-profile-active" : "tab-profile"}>
									<Link to='/profile/following'>
										Đang theo dõi
									</Link>
								</div>
							</div>
							<button className="btn-follow">{true ? "Theo dõi" : "Đăng theo dõi"}</button>
						</div>
					</Col>
				</Row>
				<div className="downProfile">
					<Row justify="center">
						<Col span={12} >
							<>
							</>
							{
								tab === 'newfeed' &&
								<>
									<Share />
									{listPost.map((ele, idx) => {
										return <Post data={ele} key={idx} />
									})
									}
								</>
							}
							{
								tab === 'about' &&
								<ProfileAbout />
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
