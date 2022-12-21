import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
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
import { createRate, getAllRate, getListLike, updateRate } from './functions/callApi';
import Comment from './components/comment/Comment';
import './post.scss';
import LoginModal from 'components/loginModal/LoginModal';
import viLocale from "moment/locale/vi";
import EditPostDialog from './components/editPost/EditPostDialog';

export default function Post(props) {
	const { postData } = props
	const dataEdit = {
		id: postData._id,
		status: postData.status,
		title: postData.title,
		destination: postData.destination,
		content: postData.content,
		type: postData.type,
		mediaList: postData.mediaList,
	}

	const isLogin = localStorage.getItem('isLogin')
	const currentUser = useSelector(state => state.authentication.currentUser)
	const navigate = useNavigate()
	moment.locale('vi', [viLocale])
	const timeStamp = new Date(postData?.createTime)

	const [user, setUser] = useState({})
	const [like, setLike] = useState(false)
	const [noLike, setNoLike] = useState(postData?.likeSize)
	const [noComment, setNoComment] = useState(postData?.commentSize)
	const [showComment, setShowComment] = useState(false)
	const [rateValue, setRateValue] = useState(0);
	const [rateAverage, setRateAverage] = useState(0);

	const [open, setOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);

	const [expand, setExpand] = useState(false)


	useEffect(() => {
		//check like or not
		const params = { postId: postData?._id, page: 1, size: 99999999 }
		getListLike(params).then((res) => {
			const index = res.items.findIndex(item => item.userId === currentUser._id)
			if (index !== -1) {
				setLike(true)
			}
		})
		// get user info by id
		getUsersInfoById(postData?.userId).then((res) => { setUser(res) })

		getAllRate(params).then((res) => {
			//average rate
			const rateSum = res.items.reduce((prev, current) => {
				return prev + current.point
			}, 0)
			const avg = (rateSum / res.items.length)
			setRateAverage(Number.isNaN(avg) ? 0 : avg.toFixed(1))
			// rate by me
			const rateByMe = res.items.find((ele) => ele.userId === currentUser._id)
			setRateValue(rateByMe?.point || 0)
		})
	}, [currentUser._id, postData?._id, postData?.userId])

	const handleDetelePost = async () => {
		try {
			const params = { postId: postData?._id }
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
		if (isLogin) {
			if (currentUser.status !== 'active') {
				message.warning('Tài khoản của bạn đã bị khoá')
				return
			}
			try {
				const dataLike = {
					postId: postData?._id,
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
		if (!isLogin) {
			setOpen(true)
		}
	}

	const handleRatePost = async (value) => {
		if (isLogin) {
			if (currentUser.status !== 'active') {
				message.warning('Tài khoản của bạn đã bị khoá')
				return
			}
			const dataRate = {
				postId: postData?._id,
				point: value
			}
			if (rateValue === 0) {
				await createRate(dataRate)
			}
			if (rateValue !== 0) {
				await updateRate(dataRate)
			}
			setRateValue(value)
		}
		if (!isLogin) {
			setOpen(true)
		}
	}

	const menu = (
		<Menu
			items={[
				{
					label: <span onClick={handleDetelePost}>Xoá bài viết</span>,
					key: '0',
				},
				{
					label: <span onClick={() => setIsEditOpen(true)} >Sửa bài viết</span >,
					key: '1',
				},
			]
			}
		/>)

	const menuAdmin = (
		<Menu
			items={[
				{
					label: <span onClick={handleDetelePost}>Xoá bài viết</span>,
					key: '0',
				},
			]
			}
		/>)
	return (
		<div className='postContain'>
			<LoginModal open={open} onClose={() => setOpen(false)} />
			{
				isEditOpen &&
				<EditPostDialog open={isEditOpen} onClose={() => setIsEditOpen(false)} data={dataEdit} />
			}
			<div className="postBox">
				<div className="top-post">
					<div className="header-post">
						<div className='account-container'>
							<Link to={`/profile/${postData?.userId}/newfeed`}>
								<img src={user?.avatar || avatarDefault} alt="avt user" className='avt-user' />
							</Link>
							<span className='nameUser'>
								<Link to={`/profile/${postData?.userId}/newfeed`}>
									<span className='textName'>{user?.fullName}</span>
								</Link>
								<span className='textTime'>
									{moment.utc(timeStamp.toUTCString()).fromNow()}
								</span>
							</span>
						</div>
						{
							(currentUser._id === postData?.userId || currentUser.isAdmin) &&
							<Dropdown overlay={currentUser._id !== postData?.userId ? menuAdmin : menu} trigger={['click']} placement="bottomRight">
								<span className='btn-modify-post'>
									<BsThreeDots />
								</span>
							</Dropdown>
						}
					</div>
					<Rate style={{ fontSize: 12 }} allowHalf disabled value={Number(rateAverage)} />
					<h2 className="title-post">{postData?.title}</h2>
					<p className={expand ? 'content-post' : 'content-post text-collapse'} style={{ whiteSpace: "pre-line" }}>{postData?.content}</p>
					{
						expand &&
						<>
							<p className="destinationText">Địa điểm: {postData?.destination}</p>
							<p className="typeTravel">Kiểu du lịch: {postData?.type}</p>
						</>
					}
					<span style={{ cursor: 'pointer', color: 'gray' }} onClick={() => setExpand(!expand)}><b>{!expand ? 'Xem thêm' : 'Thu gọn'}</b></span>
				</div>
				{postData.mediaList && <ShowMedia dataMedia={postData.mediaList} />}
				<div className="bottomPost">
					<div className='inforReact'>
						<div className="numberLikeShare">
							<AiFillLike className='smLikeIcon' />
							<span className='numberReact'>{noLike}</span>
						</div>
						<span className="numberComment">{noComment} bình luận</span>
					</div>

					<hr className='postHr' />

					<div className='boxControl'>
						<div className={like ? 'likeActive btnPost' : 'btnPost'} onClick={() => handleLikePost()}>
							<AiOutlineLike className='iconBtn' />
							<span>Thích</span>
						</div>

						<div className="btnPost" onClick={() => {
							setShowComment(() => {
								if (isLogin) {
									if (currentUser.status !== 'active') {
										message.warning('Tài khoản của bạn đã bị khoá')
										return false
									}
									return true
								}
							})
							setOpen(!isLogin)
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
						showComment && <Comment postData={postData} setNoComment={setNoComment} />
					}
				</div>
			</div>
		</div >
	)
}