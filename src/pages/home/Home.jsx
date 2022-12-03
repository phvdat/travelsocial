import React, { useEffect } from 'react';
import Newfeed from '../../components/newfeed/Newfeed';
import Slideshow from '../../components/slideshow/Slideshow';
import './home.scss'
export default function HomePage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])
	return (

		<div className='home-container'>
			<Slideshow />
			<Newfeed />
		</div >
	);
}
