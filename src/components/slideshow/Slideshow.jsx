
import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import "./slideshow.scss"
export default function Slideshow() {
	return (
		<Carousel autoplay>
			<div className='carousel-container'>
				<div className="text-carousel">ĐI VÀ KHÁM PHÁ THEO CÁCH CỦA BẠN</div>
				<img alt="carousel" src="img/img_snow_wide.jpg" className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src="img/slideshow-2.jpg" className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src="img/slideshow-1.jpg" className="imgSlideshow" />
			</div>
			<div className='carousel-container'>
				<img alt="carousel" src="img/slideshow-2.jpg" className="imgSlideshow" />
			</div>
		</Carousel>
	)
}
