import Dialog from 'components/dialog/Dialog'
import SwiperMedia from '../swiperMedia/SwiperMedia'
import React, { useState } from 'react'
import './showMedia.scss'
import { FaPlus } from 'react-icons/fa'
import { AiFillPlayCircle } from 'react-icons/ai'

const RecognizeMedia = (props) => {
	const { media } = props
	return (
		media.type === 'image' ?
			<img src={media.link} alt="media" />
			:
			<>
				<div className="play-button">
					<AiFillPlayCircle size='50px' color='gray' />
				</div>
				<video>
					<source src={media.link} type="video/mp4"></source>
				</video>
			</>
	)
}
const OneMedia = (props) => {
	const { dataMedia } = props
	return (
		<div className="one-media">
			<RecognizeMedia media={dataMedia[0]} />
		</div>
	)
}
const TwoMedia = (props) => {
	const { dataMedia } = props
	return (
		<div className="two-media">

			<div className="left" >
				<RecognizeMedia media={dataMedia[0]} />
			</div>
			<div className="right">
				<RecognizeMedia media={dataMedia[1]} />
			</div>
		</div>
	)
}
function ManyMedia(props) {
	const { dataMedia } = props
	return (
		<div className="two-media">
			<div className="left" >
				<RecognizeMedia media={dataMedia[0]} />
			</div>
			<div className="right">
				<div className="plus-media">
					<FaPlus size='50px' color='white' />
				</div>
				<RecognizeMedia media={dataMedia[1]} />
			</div>
		</div >
	)
}
export default function ShowMedia(props) {
	const { dataMedia } = props
	const [visible, setVisible] = useState(false)
	return (
		<div>
			<div className="media-container" onClick={setVisible}>
				{
					dataMedia?.length === 1 &&
					<OneMedia dataMedia={dataMedia} />
				}
				{
					dataMedia?.length === 2 &&
					<TwoMedia dataMedia={dataMedia} />
				}
				{
					dataMedia?.length > 2 &&
					<ManyMedia dataMedia={dataMedia} />
				}
			</div>
			<Dialog visible={visible} onClose={() => setVisible(false)}>
				<SwiperMedia dataMedia={dataMedia} />
			</Dialog>
		</div>
	)
}
