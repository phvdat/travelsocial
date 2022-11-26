
import { Carousel } from "antd";
import React from "react";
import "./slideshow.scss"
import SLIDE_01 from 'assets/img/carosel/city-3062042_1920.jpg'
import SLIDE_02 from 'assets/img/carosel/landscape-2846777_1920.jpg'
import SLIDE_03 from 'assets/img/carosel/mountain.jpg'
import SLIDE_04 from 'assets/img/carosel/sunrise.jpg'
import SLIDE_05 from 'assets/img/carosel/vietnam.jpg'
export default function Slideshow() {
	return (
		<Carousel autoplay>
			<div className='carousel-container'>
				<div className="text-carousel">ĐI VÀ KHÁM PHÁ THEO CÁCH CỦA BẠN</div>
				<img alt="carousel" src={SLIDE_01} className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src={SLIDE_02} className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src={SLIDE_03} className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src={SLIDE_04} className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src={SLIDE_05} className="imgSlideshow" />
			</div>
		</Carousel>
	)
}
