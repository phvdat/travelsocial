import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import './post.scss';
import { useState } from 'react/cjs/react.development';
import { Dropdown, Menu, message, Rate } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
export default function Post(props) {
	const data = props.data
	console.log(data)
	const navigate = useNavigate()
	const [like, setLike] = useState(true)
	const [rate, setRate] = useState(0)
	const [showComment, setShowComment] = useState(false)
	const listComment = [

		{
			name: 'Nguyễn Văn A',
			avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			content: 'Có thể mua được không?Có thể mua được không Có thể mua được không Có thể mua được không Có thể mua được không',
		},
		{
			name: 'Nguyễn Văn B',
			avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			content: 'Có thể mua được không?',
		},
		{
			name: 'Nguyễn Văn C',
			avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			content: 'Có thể mua được không?',
		},
	]
	const handleDetelePost = async () => {
		try {
			const params = { postId: data._id }
			console.log(params)
			const response = await postApi.deletePost(params)
			console.log(response)
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
	const menu = (
		<Menu
			items={[
				// {
				// 	label: <Link to="profile">Chỉnh sửa</Link>,
				// 	key: '0',
				// },
				// {
				// 	type: 'divider',
				// },
				{
					label: <a onClick={handleDetelePost}>Xoá bài viết</a>,
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
						<img src="img/myavt.jpg" alt="avt user" className='avt-user' />
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
				<p className="statusText">{data.title}</p>
				<p className="statusText" style={{ whiteSpace: "pre-line" }}>{data.content}</p>
				<img src={data?.mediaList[0]?.link} alt="" className='postImg' />
				<div className="bottomPost">
					<div className='inforReact'>
						<div className="numberLikeShare">
							<AiFillLike className='smLikeIcon' />
							<span className='numberReact'>{data.like}</span>
						</div>
						<span className="numberComment">21 bình luận</span>
					</div>
					<hr className='postHr' />
					<div className='boxControl'>
						<div className={like ? 'likeActive btnPost' : 'btnPost'} onClick={() => {
							setLike(!like)
							console.log("like", like)
						}}>
							<AiOutlineLike className='iconBtn' />
							<span>Thích</span>
						</div>

						<div className="btnPost" onClick={() => setShowComment(!showComment)}>
							<BiCommentDetail className='iconBtn' />
							<span>Bình luận</span>
						</div>
						<div className="btnPost">
							<Rate />
						</div>
					</div>
					{
						showComment &&
						<>
							<hr className='postHr' />
							<div className='boxComment'>
								<img src="img/myavt.jpg" alt="avt user" className='avt-user-comment' />
								<textarea type="text" placeholder='Viết bình luận...' rows={1}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											console.log('post comment');
										}
										e.target.style.height = 'inherit';
										e.target.style.height = `${e.target.scrollHeight}px`;
									}}
								/>
							</div>
							{
								listComment.map((item, index) => {
									return (
										<div className='listComment' key={index}>
											<div className="primary-comment-item">
												<img src={item.avatar} alt="avt user" className='avt-user-comment' />
												<div className='comment-item'>
													<a className='comment-username'>{item.name}</a>
													<p>{item.content}</p>
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
