import './CommentStyle.scss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { Dropdown, Menu } from 'antd';
import { createComment, deteleCommentPost, loadCommentPost } from 'components/post/functions/callApi';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import TextArea from 'antd/lib/input/TextArea';
import Loading from 'components/baseUI/loading/Loading';

export default function Comment(props) {
	const { postData } = props
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [listComment, setListComment] = useState([])
	const [valueComment, setValueComment] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [hasNextPage, setHasNextPage] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		handleLoadCommentPost(page)
	}, [page])

	const handleLoadCommentPost = (page) => {
		const params = {
			postId: postData._id,
			page: page,
			size: 5
		}
		loadCommentPost(params).then((res) => {
			setTimeout(() => {
				setListComment(prev => [...prev, ...(res.items)])
				setIsLoading(false)
			}, 300)
		})
	}

	const handleDeteleComment = async (commentId) => {
		await deteleCommentPost({ commentId: commentId })
		setPage(1)
		handleLoadCommentPost(1)
	}

	const handleCreateComment = async () => {
		setPage(1)
		if (valueComment) {
			setIsLoading(true)
			const dataComment = {
				postId: postData._id,
				content: valueComment
			}
			await createComment(dataComment)
			handleLoadCommentPost(1)
			setValueComment('')
			setIsLoading(false)
		}
	}
	const handleLoadMoreCmt = () => {
		setPage(prev => prev + 1)
	}
	const menuComment = (commentId) => (
		<Menu
			items={[
				{
					label: <span onClick={() => handleDeteleComment(commentId)}>Xoá bình luận</span>,
					key: '0',
				},
			]}
		/>
	)
	return (
		<>
			<hr className='postHr' />
			<div className='boxComment'>
				<img src={currentUser.avatar || avatarDefault} alt="avt user" className='avt-user-comment' />
				<TextArea
					value={valueComment}
					onChange={(e) => setValueComment(e.target.value)}
					placeholder="Viết bình luận..."
					autoSize={{
						minRows: 1,
						maxRows: 3
					}}
				/>
				<span type='submit' className='send-icon' onClick={handleCreateComment}>
					<IoSendSharp />
				</span>
			</div>
			{
				listComment.map((item) => {
					return (
						<div className='listComment' key={item._id}>
							<div className="container-comment-item">
								<img src={item.avatar || avatarDefault} alt="avt user" className='avt-user-comment' />
								<div className='comment-item'>
									<Link to={`/profile/${item.userId}/newfeed`} className='comment-username'>{item.fullName || "User"}</Link>
									<p>{item.content}</p>
								</div>
								<div className='modify-comment-btn'>
									<Dropdown overlay={menuComment(item.userId)} trigger={['click']} placement="bottomLeft">
										<span>
											<BsThreeDots />
										</span>
									</Dropdown>
								</div>
							</div>
						</div>
					)
				})
			}
			{isLoading && <Loading position="center-loading" />}
			{
				// hasNextPage &&
				<div >
					<span className='load-more-cmt' onClick={() => handleLoadMoreCmt()}>Tải thêm bình luận</span>
				</div>
			}
		</>
	)
}
