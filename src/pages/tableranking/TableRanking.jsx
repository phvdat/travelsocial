import { Avatar, Button, Col, List, Row, Skeleton } from 'antd'
import rankingApi from 'api/rankingApi';
import { getUsersInfoById } from 'function/callApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './tableRanking.scss'
export default function TableRanking() {
	const dataFake = [
		{
			avatar: 'https://picsum.photos/200/300',
			fullName: 'Pham Dat',
			point: 30
		},
		{
			avatar: 'https://picsum.photos/200/300',
			fullName: 'Pham Dat',
			point: 30
		},
		{
			avatar: 'https://picsum.photos/200/300',
			fullName: 'Pham Dat',
			point: 30
		},
		{
			avatar: 'https://picsum.photos/200/300',
			fullName: 'Pham Dat',
			point: 30
		},
		{
			avatar: 'https://picsum.photos/200/300',
			fullName: 'Pham Dat',
			point: 30
		},
	]
	const { tabTableRanking } = useParams()
	// const [listUsersInfo, setListUsersInfo] = useState([])
	const count = 10;
	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	useEffect(() => {
		setData(prev => dataFake)
		setList(prev => dataFake)
		setInitLoading(false)
	}, [])
	// useEffect(() => {
	// 	const getListRanking = async () => {
	// 		try {
	// 			const params = { page: 1, size: 10 }
	// 			const response = await rankingApi.getListLeaderBoardUser(params)

	// 			setInitLoading(false);
	// 			// setData(response.payload);
	// 			// setList(response.payload);
	// 			response.payload.map(
	// 				(ele, idx) => {

	// 					getUsersInfoById(ele.userId).then(
	// 						(res, req) => {
	// 							console.log('tessss', res)
	// 							setData(prev => [...prev, { ...res, point: ele.point }]);
	// 							setList(prev => [...prev, { ...res, point: ele.point }]);
	// 						}
	// 					).catch(err => console.log(err))
	// 				}
	// 			)
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// 	getListRanking()
	// }, []);
	const onLoadMore = () => {
		setLoading(true);
		setList(
			data.concat(
				[...new Array(count)].map(() => ({
					loading: true,
					name: {},
					picture: {},
				})),
			),
		);
	}
	const loadMore =
		!initLoading && !loading ? (
			<div
				style={{
					textAlign: 'center',
					marginTop: 12,
					height: 32,
					lineHeight: '32px',
				}}
			>
				<Button onClick={onLoadMore}>Tải thêm</Button>
			</div>
		) : null;
	return (
		<div>
			<div className='tab-container'>
				<button>
					Top User
				</button>
				<button>
					Top Post
				</button>
			</div>
			<Row justify='center'>
				<Col md={24} lg={12} className='top-ranking-container'>
					<div className="top-three">
						{list[1] &&
							<div className='item-card two'>
								<img src={list[1].avatar} alt="avatar" />
								<h6 className='item-level'>2</h6>
								<h6 className='name'>{list[1].fullName}</h6>
								<h6 className='score'>{list[1].point}</h6>
							</div>
						}
						{list[0] &&
							<div className='item-card one'>
								<img src={list[0].avatar} alt="avatar" />
								<h6 className='item-level'>1</h6>
								<h6 className='name'>{list[0].fullName}</h6>
								<h6 className='score'>{list[0].point}</h6>
							</div>
						}
						{list[2] &&
							<div className='item-card three'>
								<img src={list[1].avatar} alt="avatar" />
								<h6 className='item-level'>3</h6>
								<h6 className='name'>{list[1].fullName}</h6>
								<h6 className='score'>{list[1].point}</h6>
							</div>
						}
					</div>

					<List
						loading={initLoading}
						itemLayout="horizontal"
						loadMore={loadMore}
						dataSource={list}
						renderItem={(item, idx) => {
							if ([0, 1, 2].includes(idx)) {
								return null
							}
							return (
								<Skeleton avatar title={false} loading={item.loading} active className='list-container'>
									<div className='item-list'>

										<h6 className='item-level'>{idx}</h6>
										<img alt='avatar' src={item.avatar} />
										<h6 className='name'>
											{item.fullName}
										</h6>
										<h6 className='point'>{item.point}</h6>
									</div>
								</Skeleton>
							)
						}}
					/>
				</Col>
			</Row>

		</div>
	)
}
