import "./newfeed.scss"
import Share from './../share/Share';
import Post from "../post/Post";
import { message } from "antd";
import { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import { useSelector } from "react-redux";
import Loading from "components/baseUI/loading/Loading";
import { useRef } from "react";

export default function Newfeed() {
	const [listPost, setListPost] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	const [page, setPage] = useState(1)
	const [hasNextPage, setHasNextPage] = useState(false)

	const hasNextPageRef = useRef(hasNextPage)
	const getAllPost = async (pageNum) => {
		setIsLoading(true)
		try {
			const data = {
				page: pageNum,
				size: 10,
				status: "public"
			}
			const response = await postApi.getAllPost(data)
			if (response.status_code === 9999) {
				setListPost(prev => [...prev, ...(response.payload.items)])
				setHasNextPage(response.payload.hasNext)
				hasNextPageRef.current = response.payload.hasNext
			}
			if (response.status_code === -9999) {
				message.warning('Tải bài viết không thành công!')
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const getPostRelative = async (pageNum) => {
		setIsLoading(true)
		try {
			const data = {
				page: pageNum,
				size: 10,
				status: "public"
			}
			const response = await postApi.getAllPostRelated(data)
			if (response.status_code === 9999) {
				console.log(response.payload.hasNext)
				setListPost(prev => [...prev, ...(response.payload.items)])
				setHasNextPage(response.payload.hasNext)
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
		getAllPost(page)
	}, [page])

	const handleScroll = async () => {
		console.log(1)
		if (window.innerHeight + document.documentElement.scrollTop !== document.getElementById('root').offsetHeight) return;
		if (hasNextPageRef.current) {
			setTimeout(() => {
				setPage(prev => prev + 1)
			}, 100)
		}
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
