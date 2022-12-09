import React from 'react';
import Newfeed from '../../components/newfeed/Newfeed';
import Slideshow from '../../components/slideshow/Slideshow';
import './home.scss'
export default function HomePage() {
	return (

		<div className='home-container'>
			<Slideshow />
			<Newfeed />
		</div >
	);
}
