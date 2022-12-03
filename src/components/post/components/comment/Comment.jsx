import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { Dropdown, Menu, message } from 'antd';
import { createComment, deteleCommentPost, loadCommentPost } from 'components/post/functions/callApi';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import reactPostApi from 'api/reactPostApi';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Comment(props) {
	const { postData } = props
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [listComment, setListComment] = useState([])

	useEffect(() => {
		handleLoadCommentPost()
	}, [])

	const handleLoadCommentPost = () => {
		const params = {
			postId: postData._id,
			page: 1,
			size: 20
		}
		loadCommentPost(params).then((res, req) => {
			setListComment(res)
		})
	}

	const handleDeteleComment = async (commentId) => {
		await deteleCommentPost({ commentId: commentId })
		handleLoadCommentPost()
	}

	const handleOnkeyDown = async (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const dataComment = {
				postId: postData._id,
				content: e.target.value
			}
			await createComment(dataComment)
			handleLoadCommentPost()
			inputRef.current.value = ''//clear input
		}
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
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
	const inputRef = useRef()
	return (
		<>
			<hr className='postHr' />
			<div className='boxComment'>
				<img src={currentUser.avatar || avatarDefault} alt="avt user" className='avt-user-comment' />
				<textarea ref={inputRef} type="text" placeholder='Viết bình luận...' rows={1}
					onKeyDown={handleOnkeyDown}
				/>
			</div>
			{
				listComment.map((item) => {
					return (
						<div className='listComment' key={item._id}>
							<div className="primary-comment-item">
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
		</>
	)
}
