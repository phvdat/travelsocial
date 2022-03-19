import React from 'react';
import Newfeed from '../../components/newfeed/Newfeed';
import Slideshow from '../../components/slideshow/Slideshow';
import Topbar from '../../components/topbar/Topbar';

export default function Home() {
	return <div>
		<Topbar/>
		<Slideshow/>
		<div className="homeContainer">
				{/* <Sidebar /> */}
				<div className="homeNewfeed">
					<Newfeed />
				</div>
				{/* <Rightbar /> */}
			</div>
	</div>;
}
