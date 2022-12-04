import "./newfeed.scss"
import Share from './../share/Share';
import Post from "../post/Post";
import { message } from "antd";
import { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import { useSelector } from "react-redux";
import Loading from "components/baseUI/loading/Loading";

export default function Newfeed() {
	const [listPost, setListPost] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	useEffect(() => {
		console.log(isLoading)
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
		setIsLoading(false)
	}, [])

	return (
		<div className="newfeed">
			{
				isLoggedIn && <Share />
			}
			{isLoading && <Loading />}
			{listPost ?
				listPost.map((ele) => {
					return <Post postData={ele} key={ele._id} />
				})
				:
				<h1 style={{ textAlign: 'center' }}>Không có bài viết nào</h1>
			}
		</div>
	)
}
