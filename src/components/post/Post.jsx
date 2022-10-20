import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import './post.scss';
import { useState } from 'react/cjs/react.development';
export default function Post(props) {
	const data = props.data
	// console.log(data)
	const [like, setLike] = useState(true)

	return (
		<div className='postContain'>
			<div className="postBox">
				<div className="topPost">
					<img src="img/myavt.jpg" alt="avt user" className='avt-user' />
					<span className='nameUser'>
						<span className='textName'>Pham Dat</span>
						<span className='textTime'>4 giờ</span>
					</span>
				</div>
				<p className="statusText">{data.title}</p>
				<img src={data.imgUrl} alt="" className='postImg' />
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
						<div className= {like?'likeActive btnPost': 'btnPost'} onClick={()=>{
							setLike(!like)
							console.log("like", like)
						}}>
							<AiOutlineLike className='iconBtn' />
							<span>Thích</span>
						</div>
						<div className="btnPost">
							<BiCommentDetail className='iconBtn' />
							<span>Bình luận</span>
						</div>
						<div className="btnPost">
							<RiShareForwardLine className='iconBtn' />
							<span>Chia sẻ</span>
						</div>
					</div>
					{
						false &&
						<hr className='postHr' />
					}
				</div>
			</div>
		</div >
	)
}
