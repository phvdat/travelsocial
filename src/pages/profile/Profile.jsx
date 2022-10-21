import { Col, Row } from "antd";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import Topbar from "../../components/topbar/Topbar";
import "./profile.scss";
// import Newfeed from "../../components/newfeed/Newfeed"
// import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
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
								<div className={true ? "itemActive" : "itemcontrol"}>Bài viết</div>
								<div className="itemcontrol">Giới thiệu</div>
								<div className="itemcontrol">Bạn bè</div>
							</div>
						</Col>
					</Row>
				</div>
				<div className="downProfile">
					<Row justify="center">
						<Col span={2}></Col>
						<Col span={20}>
							<Share />
							{dataPost.map((ele, idx) => {
								return <Post data={ele} key={idx} />
							})
							}
						</Col>
						<Col span={2}></Col>

					</Row>
				</div>
			</div>
		</div>
	)
}

const dataPost = [{
	title: '"VỊNH HẠ LONG THU NHỎ" TRONG 2 NGÀY CUỐI TUẦN',
	imgUrl: "img/songDa.jpg",
	like: 40,
	comment: [],
},
{
	title: 'Du lịch',
	imgUrl: "img/dulichvietnam.jpg",
	like: 30,
	comment: [],
},
{
	title: '"VỊNH HẠ LONG THU NHỎ" TRONG 2 NGÀY CUỐI TUẦN',
	imgUrl: "img/songDa.jpg",
	like: 40,
	comment: [],
},
{
	title: 'Du lịch',
	imgUrl: "img/dulichvietnam.jpg",
	like: 30,
	comment: [],
},
]