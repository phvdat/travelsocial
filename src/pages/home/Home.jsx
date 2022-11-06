import { Col, Row } from 'antd';
import TableRanking from 'pages/tableranking/TableRanking';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Newfeed from '../../components/newfeed/Newfeed';
import Rightbar from '../../components/rightbar/Rightbar';
import Slideshow from '../../components/slideshow/Slideshow';
import Topbar from '../../components/topbar/Topbar';

export default function Home() {
	useEffect(() => {

		window.scrollTo(0, 0);
	}, [])
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	const { tab } = useParams()
	return <div>
		<Topbar />
		{
			tab === 'home' &&
			<div>
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
			</div>
		}
		{tab === 'table-ranking' ?
			<TableRanking />
			:
			<h1>404 not found</h1>
		}
	</div>;
}
