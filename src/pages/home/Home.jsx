import { Col, Row } from 'antd';
import TableRanking from 'pages/tableranking/TableRanking';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Newfeed from '../../components/newfeed/Newfeed';
import Rightbar from '../../components/rightbar/Rightbar';
import Slideshow from '../../components/slideshow/Slideshow';
import Topbar from '../../components/topbar/Topbar';
import './home.scss'
export default function Home() {
	useEffect(() => {

		window.scrollTo(0, 0);
	}, [])
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	const { tab } = useParams()
	return (

		<div className='home-container'>
			<Topbar />
			<Slideshow />
			{
				tab === 'home' &&
				<div>
					<div className='content-home'>
						<div className="wrapper-newfeed">
							<Row justify='center'>
								<Col md={24} lg={16}>
									<Newfeed />
								</Col>
							</Row>
						</div>
						<div className='home-rightbar'>
							<Rightbar />
						</div>
					</div>
				</div>
			}
			{
				tab === 'table-ranking' &&
				<TableRanking />
			}
		</div >
	);
}
