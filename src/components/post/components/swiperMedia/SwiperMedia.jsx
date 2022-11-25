import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import './swiperMedia.scss'
import { useEffect } from "react";
const SwiperByKeys = ({ children }) => {
	const swiper = useSwiper()
	const handleNextPrev = (event) => {
		if (event.keyCode === 37) {
			swiper.slidePrev()
		}
		if (event.keyCode === 39) {
			swiper.slideNext();
		}
	}
	useEffect(() => {
		window.addEventListener("keydown", handleNextPrev);
		return () => {
			document.removeEventListener("keydown", handleNextPrev);
		};
	}, [])
	return <></>
};
export default function swiperRef(props) {
	const { dataMedia } = props

	return (
		<Swiper
			className="swiper-container"
			slidesPerView={1}
			onSwiper={(swiper) => {
				swiperRef.current = swiper;
			}}
		>
			<SwiperByKeys></SwiperByKeys>
			{
				dataMedia.map((ele, idx) => {
					if (ele.type === 'image') {
						return (
							<SwiperSlide key={idx}>
								<img alt="media" src={ele.url} />
							</SwiperSlide>
						)
					}
					if (ele.type === 'video') {
						return (
							<SwiperSlide key={idx}>
								<video width="320" height="240" autoPlay controls preload="auto">
									<source
										src={ele.url}
										type="video/mp4"
									></source>
								</video>
							</SwiperSlide>
						)
					}
				})
			}
		</Swiper>
	);
};
