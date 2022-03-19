import './share.css'
import { BsFillCameraReelsFill } from "react-icons/bs"
import { AiFillPicture } from 'react-icons/ai'
import { FaRegSmileWink } from 'react-icons/fa'
export default function Share() {
	return (
		<div className='shareContain'>
			<div className="shareBox">
				<div className="inputShare">
					<img src="img/myavt.jpg" alt="avate user" className="avt-user" />
					<input type="text" placeholder='Chia sẻ trải nghiệm, blog...' className="textShare" />
				</div>
				<div className="mediaShare">
					<div className="wrapIcon">
						<AiFillPicture className='mediaIcon' />
						<span>Ảnh/Video</span>
					</div>
					<div className="wrapIcon">
						<FaRegSmileWink className='flingIcon'/>
						<span>Cảm xúc</span>
					</div>
					<div className="wrapIcon">
						<span>Đăng bài</span>
					</div>
				</div>
			</div>
		</div >
	)
}
