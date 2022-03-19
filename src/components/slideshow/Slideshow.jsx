
import React, { useEffect, useState } from "react";
import "./slideshow.scss"
export default function Slideshow() {
	const [show, setShow] = useState(1)
	const handleSlideShow = (val) => {
		if (show == 1 && val == -1) {
			setShow(3)
		}
		else if (show == 3 && val == 1) {
			setShow(1)
		}
		else {
			setShow(val + show)
		}
	}
	return (
		<div className="slideshow-container">
			{
				show == 1 ?
					<div className="mySlides fade">
						<img src="img/slideshow-2.jpg" className="imgSlideshow" />
						<div className="text">Caption Text</div>
					</div>
					: <div style={{ display: "none" }}></div>
			}
			{
				show == 2 ?
					<div className="mySlides fade">
						<img src="img/slideshow-1.jpg" className="imgSlideshow" />
						<div className="text">Caption Text</div>
					</div>
					: <div style={{ display: "none" }}></div>
			}
			{
				show == 3 ?
					<div className="mySlides fade">
						<img src="img/slideshow-3.jpg" className="imgSlideshow" />
						<div className="text">Caption Text</div>
					</div>
					: <div style={{ display: "none" }}></div>
			}

			<a className="prev" onClick={() => { handleSlideShow(-1) }}>&#10094;</a>
			<a className="next" onClick={() => { handleSlideShow(1) }}>&#10095;</a>

		</div>
	)
}
