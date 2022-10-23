import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import Topbar from "../../components/topbar/Topbar";
import "./profile.scss";

export default function Profile() {
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
				<div className="topProfile">
					<Row justify='center'>
						<Col span={16} className="profile-image">
							<img src="img/dulichvietnam.jpg" alt="cover Img" className="coverImg" />
							<div className="containAvtImg">
								<div className="avataProfile">
									<img src="img/myavt.jpg" alt="avt Img" className="avataProfileImg" />
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
									<div className={true ? "itemActive" : "itemcontrol"}>Bài viết</div>
									<div className="itemcontrol">Giới thiệu</div>
									<div className="itemcontrol">Bạn bè</div>
								</div>
								<button className="btn-follow">{true ? "Theo dõi" : "Đăng theo dõi"}</button>
							</div>
						</Col>
					</Row>
				</div>
				<div className="downProfile">
					<Row justify="center">
						{/* <Col span={2}></Col> */}
						<Col span={12}>
							<Share />
							{listPost.map((ele, idx) => {
								return <Post data={ele} key={idx} />
							})
							}
						</Col>
						{/* <Col span={2}></Col> */}

					</Row>
				</div>
			</div>
		</div>
	)
}
