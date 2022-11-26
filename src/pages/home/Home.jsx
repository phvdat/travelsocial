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
				<Newfeed />
			}
			{
				tab === 'table-ranking' &&
				<TableRanking />
			}
		</div >
	);
}
