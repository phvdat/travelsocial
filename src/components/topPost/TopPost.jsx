import postApi from 'api/postApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TopPostStyle.scss'

const TopPost = () => {
	const [listPost, setListPost] = useState([])
	const getPostById = async (postId) => {
		try {
			const param = { id: postId }
			const res = await postApi.getPostById(param)
			if (res.status_code === 9999) {
				return res
			}
			if (res.status_code === -9999) {
				console.log('get post error')
			}
		} catch (error) {
			console.log(error);
		}
	}
	const getTopPost = async () => {
		const params = {
			page: 1,
			size: 10
		}
		try {
			const res = await postApi.getTopPost(params)
			Promise.all(res.payload.items.map(item => {
				return getPostById(item.postId)
			})).then(res => {
				console.log(res)
				setListPost(res)
			})
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTopPost()
	}, [])

	return (
		<div className='top-post-container'>
			<ul className='top-post-list'>
				<h3>Top bài viết</h3>
				<hr className='hr-post' />
				{
					listPost.length !== 0 &&
					listPost.map((item, idx) => {
						return (
							<li key={item.payload._id}>
								<Link to={`/post/${item.payload._id}`}>
									<div className='top-post-item' >
										<h4 className='show-one-line'>{idx + 1}. {item.payload.title}</h4>
										<p className='show-two-line'>{item.payload.content}</p>
									</div>
								</Link>
							</li>
						)
					})
				}
			</ul>
		</div >
	)
}

export default TopPost