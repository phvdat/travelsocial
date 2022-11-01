import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import './post.scss';
import { useState } from 'react/cjs/react.development';
import { Dropdown, Menu, message, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
import reactPostApi from '../../api/reactPostApi';
export default function Post(props) {
	const data = props.data
	const navigate = useNavigate()
	const [like, setLike] = useState(false)
	const [showComment, setShowComment] = useState(false)
	const [listComment, setListComment] = useState([])

	const handleDetelePost = async () => {
		try {
			const params = { postId: data._id }
			const response = await postApi.deletePost(params)
			if (response.status_code === 9999) {
				message.success('Xóa bài viết thành công!')
				navigate(0)
			}
			if (response.status_code === -9999) {
				message.warning('Xoá bài viết không thành công!')
			}

		} catch (error) {
			console.log(error)
		}
	}
	const handleOnkeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const createComment = async () => {
				try {
					console.log('post comment', data._id);
					const dataComment = {
						postId: data._id,
						content: e.target.value
					}
					const response = await reactPostApi.postComment(dataComment)
					console.log(response)
					if (response.status_code === 9999) {
						message.success('Bình luận thành công!')
						// navigate(0)
					}
					if (response.status_code === -9999) {
						message.warning('Tạo comment không thành công!')
					}
				} catch (error) {
					console.log(error)
				}
			}
			createComment()
			handleCommentPost()
		}
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;

	}
	const handleLikePost = async () => {
		try {
			const dataLike = {
				postId: data._id,
			}
			if (like === false) {
				setLike(true)
				const response = await reactPostApi.postLike(dataLike)
				console.log(response)
			}
			if (like === true) {
				setLike(false)
				const response = await reactPostApi.postUnLike(dataLike)
				console.log(response)
			}

		} catch (error) {
			console.log(error)
		}
	}
	const handleRatePost = async (value) => {
		try {
			const dataRate = {
				postId: data._id,
				point: value
			}
			const response = await reactPostApi.postRate(dataRate)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
	const handleCommentPost = async () => {
		try {
			const params = {
				postId: data._id,
				page: 1,
				size: 20
			}
			const response = await reactPostApi.loadComment(params)
			setListComment(response.payload)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
	const handleDeteleComment = async (commentId) => {
		try {
			const params = {
				commentId: commentId,
			}
			console.log(commentId)
			const response = await reactPostApi.deleteComment(params)
			if (response.status_code === 9999) {
				console.log("delete comment succcess", response)
				handleCommentPost()
			}
			if (response.status_code === -9999) {
				console.log("delete comment fail", response)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const menu = (
		<Menu
			items={[
				{
					label: <a onClick={handleDetelePost}>Xoá bài viết</a>,
					key: '0',
				},
			]}
		/>
	)
	const menuComment = (commentId) => (
		<Menu
			items={[
				{
					label: <a onClick={() => handleDeteleComment(commentId)}>Xoá bình luận</a>,
					key: '0',
				},
			]}
		/>
	)
	return (
		<div className='postContain'>
			<div className="postBox">
				<div className="topPost">
					<div className='sub-topPost'>
						<img src="img/avatar-default.jpg" alt="avt user" className='avt-user' />
						<span className='nameUser'>
							<span className='textName'>Pham Dat</span>
							<span className='textTime'>4 giờ</span>
						</span>
					</div>
					<Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
						<span className='btn-modify-post'>
							<BsThreeDots />
						</span>
					</Dropdown>
				</div>
				<p className="titleText">{data.title}</p>
				<p className="statusText" style={{ whiteSpace: "pre-line" }}>{data.content}</p>
				<p className="destinationText">Địa điểm: {data.destination}</p>
				<img src={data?.mediaList[0]?.link} alt="" className='postImg' />
				<div className="bottomPost">
					<div className='inforReact'>
						<div className="numberLikeShare">
							<AiFillLike className='smLikeIcon' />
							<span className='numberReact'>{data.likeSize}</span>
						</div>
						<span className="numberComment">{data.commentSize} bình luận</span>
					</div>
					<hr className='postHr' />
					<div className='boxControl'>
						<div className={like ? 'likeActive btnPost' : 'btnPost'} onClick={() => handleLikePost()}>
							<AiOutlineLike className='iconBtn' />
							<span>Thích</span>
						</div>

						<div className="btnPost" onClick={() => {
							setShowComment(true)
							handleCommentPost()
						}}>
							<BiCommentDetail className='iconBtn' />
							<span>Bình luận</span>
						</div>
						<div className="btnPost">
							<Rate onChange={(value) => handleRatePost} />
						</div>
					</div>
					{
						showComment &&
						<>
							<hr className='postHr' />
							<div className='boxComment'>
								<img src="img/avatar-default.jpg" alt="avt user" className='avt-user-comment' />
								<textarea type="text" placeholder='Viết bình luận...' rows={1}
									onKeyDown={handleOnkeyDown}
								/>
							</div>
							{
								listComment.map((item) => {
									return (
										<div className='listComment' key={item._id}>
											<div className="primary-comment-item">
												<img src={item.avatar || "img/avatar-default.jpg"} alt="avt user" className='avt-user-comment' />
												<div className='comment-item'>
													<a className='comment-username'>{item.name || "User"}</a>
													<p>{item.content}</p>
												</div>
												<div className='modify-comment-btn'>
													<Dropdown overlay={menuComment(item._id)} trigger={['click']} placement="bottomLeft">
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
					}
				</div>
			</div>
		</div >
	)
}
