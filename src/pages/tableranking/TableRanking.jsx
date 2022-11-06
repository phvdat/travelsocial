import { Avatar, Button, List, Skeleton } from 'antd'
import rankingApi from 'api/ranking';
import React, { useEffect, useState } from 'react'

export default function TableRanking() {
	const count = 3;
	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	useEffect(() => {
		const getListRanking = async () => {
			try {
				const params = { page: 1, size: 10 }
				const response = await rankingApi.getListRankingUser(params)
				setInitLoading(false);
				setData(response.results);
				setList(response.results);
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
				<Button onClick={onLoadMore}>loading more</Button>
			</div>
		) : null;
	return (
		<div>
			<List
				className="top-ranking-list"
				loading={initLoading}
				itemLayout="horizontal"
				loadMore={loadMore}
				dataSource={list}
				renderItem={(item) => (
					<List.Item
						actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
					>
						<Skeleton avatar title={false} loading={item.loading} active>
							<List.Item.Meta
								avatar={<Avatar src={item.picture.large} />}
								title={<a href="https://ant.design">{item.name?.last}</a>}
								description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
							<div>content</div>
						</Skeleton>
					</List.Item>
				)}
			/>
		</div>
	)
}
