import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Newfeed from '../../components/newfeed/Newfeed';
import Rightbar from '../../components/rightbar/Rightbar';
import Slideshow from '../../components/slideshow/Slideshow';
import Topbar from '../../components/topbar/Topbar';

export default function Home() {
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)

	return <div>
		<Topbar />
		<Slideshow />
		<div className="homeContainer">
			<Row>
				<Col span={20}>
					<Row justify='center'>
						<Col span={12}>
							<Newfeed />
						</Col>
					</Row>
				</Col>
				{
					true &&
					<Col span={4}>
						<Rightbar />
					</Col>
				}
			</Row>
		</div>
	</div>;
}
