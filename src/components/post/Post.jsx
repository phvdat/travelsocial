import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import './post.scss';
import { useState } from 'react/cjs/react.development';
import { Dropdown, Menu, message, Rate } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import postApi from 'api/postApi';
import reactPostApi from 'api/reactPostApi';
import { useEffect } from 'react';
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { useSelector } from 'react-redux';
import { getUsersInfoById } from 'function/callApi';
import ShowMedia from './components/showMedia/ShowMedia';
import moment from 'moment';
import { deteleCommentPost, getAllRate, getListLike, loadCommentPost } from './functions/callApi';

export default function Post(props) {
	const data = props.data

	const currentUser = useSelector(state => state.authentication.currentUser)
	const navigate = useNavigate()
	const timeStamp = new Date(data.createTime)

	const [user, setUser] = useState({})
	const [like, setLike] = useState(false)
	const [noLike, setNoLike] = useState(data.likeSize)
	const [showComment, setShowComment] = useState(false)
	const [listComment, setListComment] = useState([])
	const [rateValue, setRateValue] = useState(0);
	const [rateAverage, setRateAverage] = useState(0);

	useEffect(() => {
		//check like or not
		const params = { postId: data._id, page: 1, size: 1000000 }
		getListLike(params).then((res, req) => {
			const index = res.findIndex(item => item.userId === currentUser._id)
			if (index !== -1) {
				setLike(true)
			}
		})
		// get user info by id
		getUsersInfoById(data.userId).then((res, req) => { setUser(res) })

		getAllRate(params).then((res, req) => {
			//average rate
			const rateSum = res.reduce((prev, current) => {
				return prev + current.point
			}, 0)
			const avg = (rateSum / res.length)
			setRateAverage(Number.isNaN(avg) ? 0 : avg.toFixed(1))
			// rate by me
			const rateByMe = res.find((ele) => ele.userId === currentUser._id)
			setRateValue(rateByMe?.point || 0)
		})
	}, [currentUser._id, data._id, data.userId])
	const handleOnkeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const createComment = async () => {
				try {
					const dataComment = {
						postId: data._id,
						content: e.target.value
					}
					const response = await reactPostApi.postComment(dataComment)
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
			handleLoadCommentPost()
		}
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	}
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
	const handleLikePost = async () => {
		try {
			const dataLike = {
				postId: data._id,
			}
			if (like === false) {
				setLike(true)
				setNoLike((state) => state + 1)
				await reactPostApi.postLike(dataLike)
			}
			if (like === true) {
				setLike(false)
				setNoLike((state) => state - 1)
				await reactPostApi.postUnLike(dataLike)
			}

		} catch (error) {
			console.log(error)
		}
	}

	const handleRatePost = async (value) => {
		setRateValue(value)
		try {
			const dataRate = {
				postId: data._id,
				point: value
			}
			const response = await reactPostApi.postRate(dataRate)
			if (response.status_code === -9999) {
				message.warning('Đánh giá không thành công!')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleLoadCommentPost = () => {
		const params = {
			postId: data._id,
			page: 1,
			size: 20
		}
		loadCommentPost(params).then((res, req) => {
			setListComment(res)
		})
		// try {
		// 	const params = {
		// 		postId: data._id,
		// 		page: 1,
		// 		size: 20
		// 	}
		// 	const response = await reactPostApi.loadComment(params)
		// 	setListComment(response.payload)
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	const handleDeteleComment = async (commentId) => {
		console.log('mày chạy bn lần')
		const params = {
			commentId: commentId,
		}
		await deteleCommentPost(params)
		handleLoadCommentPost()
	}

	const menu = (
		<Menu
			items={[
				{
					label: <span onClick={handleDetelePost}>Xoá bài viết</span>,
					key: '0',
				},
			]}
		/>
	)
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
		<div className='postContain'>
			<div className="postBox">
				<div className="topPost">
					<div className='sub-topPost'>
						<Link to={`/profile/${data.userId}/newfeed`}>
							<img src={user.avatar || avatarDefault} alt="avt user" className='avt-user' />
						</Link>
						<span className='nameUser'>
							<Link to={`/profile/${data.userId}/newfeed`}>
								<span className='textName'>{user.fullName}</span>
							</Link>
							<span className='textTime'>
								{moment.utc(timeStamp.toUTCString()).fromNow()}
							</span>
						</span>
					</div>
					{
						currentUser._id === data.userId &&
						<Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
							<span className='btn-modify-post'>
								<BsThreeDots />
							</span>
						</Dropdown>
					}
				</div>
				<div className='wrapper-rate-average'>
					<Rate style={{ fontSize: 12 }} allowHalf disabled value={Number(rateAverage)} />
				</div>
				<p className="titleText">{data.title}</p>
				<p className="statusText" style={{ whiteSpace: "pre-line" }}>{data.content}</p>
				<p className="destinationText">Địa điểm: {data.destination}</p>
				<ShowMedia dataMedia={data?.mediaList} />
				<div className="bottomPost">
					<div className='inforReact'>
						<div className="numberLikeShare">
							<AiFillLike className='smLikeIcon' />
							<span className='numberReact'>{noLike}</span>
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
							handleLoadCommentPost()
						}}>
							<BiCommentDetail className='iconBtn' />
							<span>Bình luận</span>
						</div>
						<div className="btnPost">
							<Rate value={rateValue} onChange={(value) => {
								handleRatePost(value)
							}
							} />
						</div>
					</div>
					{
						showComment &&
						<>
							<hr className='postHr' />
							<div className='boxComment'>
								<img src={currentUser.avatar || avatarDefault} alt="avt user" className='avt-user-comment' />
								<textarea type="text" placeholder='Viết bình luận...' rows={1}
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
													<a className='comment-username'>{item.fullName || "User"}</a>
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
					}
				</div>
			</div>
		</div >
	)
}