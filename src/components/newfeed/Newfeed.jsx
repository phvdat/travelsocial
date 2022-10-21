import "./newfeed.css"
import Share from './../share/Share';
import Post from "../post/Post";
import { Col, Row } from "antd";

export default function Newfeed() {
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
	return (
		<div className="newfeed">
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
	)
}
