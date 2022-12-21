import SearchUser from 'components/searchUser/SearchUser';
import TopPost from 'components/topPost/TopPost';
import { SCREEN_LG } from 'constants/common';
import React from 'react';
import Newfeed from '../../components/newfeed/Newfeed';
import Slideshow from '../../components/slideshow/Slideshow';
import './home.scss'
export default function HomePage() {
	const { innerWidth } = window;
	return (

		<div className='home-container'>
			<Slideshow />
			<div className='home-content'>
				{innerWidth > SCREEN_LG && <TopPost />}
				<Newfeed />
				{innerWidth > SCREEN_LG && <SearchUser />}
			</div>
		</div >
	);
}
