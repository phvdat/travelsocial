import postApi from 'api/postApi'
import Post from 'components/post/Post'
import Slideshow from 'components/slideshow/Slideshow'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './indexStyle.scss'

export default function PostPage() {
	const { postId } = useParams('postId')
	const [postData, setPostData] = useState()
	useEffect(() => {
		const getPostById = async () => {
			try {
				const param = { id: postId }
				const res = await postApi.getPostById(param)
				if (res.status_code === 9999) {
					setPostData(prev => res.payload)
				}
				if (res.status_code === -9999) {
					console.log(res.message)
				}
			} catch (error) {
				console.log(error);
			}
		}
		getPostById()
	}, [postId])
	return (
		<div>
			<Slideshow />
			<div className="post-page-container">
				{
					postData &&
					<Post postData={postData} />
				}
			</div>
		</div>
	)
}
