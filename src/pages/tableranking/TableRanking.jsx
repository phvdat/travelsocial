import { Avatar, Button, Col, List, Row, Skeleton } from 'antd'
import rankingApi from 'api/rankingApi';
import { getUsersInfoById } from 'function/callApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './tableRanking.scss'
export default function TableRanking() {
	const { tabTableRanking } = useParams()
	// const [listUsersInfo, setListUsersInfo] = useState([])
	const count = 10;
	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	useEffect(() => {
		const getListRanking = async () => {
			try {
				const params = { page: 1, size: 10 }
				const response = await rankingApi.getListLeaderBoardUser(params)

				setInitLoading(false);
				// setData(response.payload);
				// setList(response.payload);
				response.payload.map(
					(ele, idx) => {

						getUsersInfoById(ele.userId).then(
							(res, req) => {
								console.log('tessss', res)
								setData(prev => [...prev, { ...res, point: ele.point }]);
								setList(prev => [...prev, { ...res, point: ele.point }]);
							}
						).catch(err => console.log(err))
					}
				)
			} catch (error) {
				console.log(error)
			}
		}
		getListRanking()
	}, []);
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
					<List
						loading={initLoading}
						itemLayout="horizontal"
						loadMore={loadMore}
						dataSource={list}
						renderItem={(item) => (
							<List.Item
							>
								<Skeleton avatar title={false} loading={item.loading} active>
									<div className='tableField'>
										<Avatar src={item.avatar} />
										<h5>
											{item.fullName}
										</h5>
										<h5>{item.point}</h5>
										<h6></h6>
									</div>
								</Skeleton>
							</List.Item>
						)}
					/>
				</Col>
			</Row>

		</div>
	)
}
