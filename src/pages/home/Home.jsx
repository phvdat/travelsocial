import { Col, Row } from 'antd';
import React from 'react';
import Newfeed from '../../components/newfeed/Newfeed';
import Slideshow from '../../components/slideshow/Slideshow';
import Topbar from '../../components/topbar/Topbar';

export default function Home() {
	return <div>
		<Topbar />
		<Slideshow />
		<div className="homeContainer">
			<Row>
				<Col span={6}>
					{/* <Sidebar /> */}
				</Col>
				<Col span={12}>
					<Newfeed />
				</Col>
				<Col span={6}>
					{/* <Rightbar /> */}
				</Col>
			</Row>




		</div>
	</div>;
}
