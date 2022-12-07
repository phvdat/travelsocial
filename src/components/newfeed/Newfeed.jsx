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
	const [page, setPage] = useState(1)

	const getAllPost = async (pageNum) => {
		try {
			const data = {
				page: pageNum,
				size: 10,
				status: "public"
			}
			const response = await postApi.getAllPost(data)
			if (response.status_code === 9999) {
				setListPost(prev => [...prev, ...(response.payload.items)])
			}
			if (response.status_code === -9999) {
				message.warning('Tải bài viết không thành công!')
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
		getAllPost(page)
	}, [page])

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.getElementById('root').offsetHeight) return;
		setPage(prev => prev + 1)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="newfeed">
			{
				isLoggedIn && <Share />
			}
			{listPost.length !== 0 &&
				listPost.map((ele) => {
					return <Post postData={ele} key={ele._id} />
				})
			}
			{isLoading && <Loading position="center-loading" />}
		</div>
	)
}
