import "./newfeed.css"
import Share from './../share/Share';
import Post from "../post/Post";

export default function Newfeed() {
	const dataPost = [{
		title:'"VỊNH HẠ LONG THU NHỎ" TRONG 2 NGÀY CUỐI TUẦN',
		imgUrl: "img/songDa.jpg",
		like: 40,
		comment: [],
	},
	{
		title:'Du lịch',
		imgUrl: "img/dulichvietnam.jpg",
		like: 30,
		comment: [],
	},
	{
		title:'"VỊNH HẠ LONG THU NHỎ" TRONG 2 NGÀY CUỐI TUẦN',
		imgUrl: "img/songDa.jpg",
		like: 40,
		comment: [],
	},
	{
		title:'Du lịch',
		imgUrl: "img/dulichvietnam.jpg",
		like: 30,
		comment: [],
	},
	]
	return (
		<div className="newfeed">
			<div className="content">
				<Share />
				{dataPost.map((ele) => {
					return <Post data={ele} />
				})
				}
			</div>
		</div>
	)
}
