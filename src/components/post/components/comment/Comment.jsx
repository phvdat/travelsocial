import './CommentStyle.scss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { Dropdown, Menu, message } from 'antd';
import { createComment, loadCommentPost } from 'components/post/functions/callApi';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import TextArea from 'antd/lib/input/TextArea';
import Loading from 'components/baseUI/loading/Loading';
import reactPostApi from 'api/reactPostApi';

export default function Comment(props) {
	const { postData, setNoComment } = props
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [listComment, setListComment] = useState([])
	const [valueComment, setValueComment] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [hasNextPage, setHasNextPage] = useState(false)
	const [modeEdit, setModeEdit] = useState(false)
	const [idComment, setIdComment] = useState()
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
				setHasNextPage(res.hasNext)
				setIsLoading(false)
			}, 300)
		})
	}

	const handleDeteleComment = async (commentId) => {
		const params = { commentId: commentId }
		try {
			const response = await reactPostApi.deleteComment(params)
			if (response.status_code === 9999) {
				setPage(1)
				setListComment([])
				handleLoadCommentPost(1)
				setNoComment(prev => prev - 1)
			}
			if (response.status_code === -9999) {
				message.warning("Xoá bình luận không thành công")
			}
		} catch (error) {
			console.log(error)
		}
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
			setListComment([])
			handleLoadCommentPost(1)
			setValueComment('')
			setIsLoading(false)
			setNoComment(prev => prev + 1)
		}
	}
	const updateComment = async () => {
		setPage(1)
		if (valueComment) {
			setIsLoading(true)
			const dataComment = {
				commentId: idComment,
				content: valueComment
			}
			const res = await reactPostApi.updateComment(dataComment)
			if (res.status_code === 9999) {
				message.success('Lưu bình luận thành công!')
			}
			if (res.status_code === -9999) {
				message.warning('Lưu bình luận không thành công!')
			}
			setListComment([])
			handleLoadCommentPost(1)
			setValueComment('')
			setIsLoading(false)
			setModeEdit(false)
		}
	}
	const handleLoadMoreCmt = () => {
		setPage(prev => prev + 1)
	}
	const handleEditComment = (commentId, content) => {
		setModeEdit(true)
		setValueComment(content)
		setIdComment(commentId)
	}
	const menuComment = (commentId, content) => (
		<Menu
			items={[
				{
					label: <span onClick={() => handleDeteleComment(commentId)}>Xoá bình luận</span>,
					key: '0',
				},
				{
					label: <span onClick={() => handleEditComment(commentId, content)}>Sửa bình luận</span>,
					key: '1',
				},
			]}
		/>
	)

	const menuCommentAdmin = (commentId) => (
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
		<div className='container-comment'>
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
				{!modeEdit &&
					<span type='submit' className='send-icon' onClick={handleCreateComment}>
						<IoSendSharp />
					</span>
				}
			</div>
			{modeEdit &&
				<div className='edit-btn-container'>
					<button onClick={() => {
						setValueComment('')
						setModeEdit(false)
					}}>Huỷ</button>
					<button onClick={updateComment} >Lưu</button>
				</div>
			}
			{
				listComment.map((item) => {
					return (
						<div className='listComment' key={item._id}>
							<div className="container-comment-item">
								<img src={item.avatar || avatarDefault} alt="avt user" className='avt-user-comment' />
								<div className='comment-item'>
									<Link to={`/profile/${item.userId}/newfeed`} className='comment-username'>{item.fullName || "User"}</Link>
									<p style={{ whiteSpace: "pre-line" }}>{item.content}</p>
								</div>
								{(item.userId === currentUser._id || currentUser.isAdmin) &&
									<div className='modify-comment-btn'>
										<Dropdown overlay={item.userId !== currentUser._id ? menuCommentAdmin(item._id) : menuComment(item._id, item.content)} trigger={['click']} placement="bottomRight">
											<span>
												<BsThreeDots />
											</span>
										</Dropdown>
									</div>
								}
							</div>
						</div>
					)
				})
			}
			{isLoading && <Loading position="center-loading" />}
			{
				hasNextPage &&
				<div >
					<span className='load-more-cmt' onClick={() => handleLoadMoreCmt()}>Tải thêm bình luận</span>
				</div>
			}
		</div>
	)
}
