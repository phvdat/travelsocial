import { Avatar, Button, Col, List, Row, Skeleton } from 'antd'
import rankingApi from 'api/rankingApi';
import { getUsersInfoById } from 'function/callApi';
import React, { useEffect, useState } from 'react'
import avatarDefault from 'assets/img/avatarDefault.jpg';

import './tableRanking.scss'
export default function TableRanking() {
	const [list, setList] = useState([]);
	useEffect(() => {
		const getListRanking = async () => {
			try {
				const params = { page: 1, size: 10 }
				const response = await rankingApi.getListLeaderBoardUser(params)
				console.log('tessss', response.payload)
				response.payload.map(
					(ele, idx) => {
						getUsersInfoById(ele.userId).then(
							(res, req) => {
								setList(prev => [...prev, { ...res, position: ele.position }]);
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
	return (
		<div className='container-ranking'>
			<div className='wapper-ranking'>
				<div className="top-three">
					{list[2] &&
						<div className='item-card two'>
							<img src={list[2].avatar || avatarDefault} alt="avatar" />
							<h6 className='item-level'>{list[2].position + 1}</h6>
							<h6 className='name'>{list[2].fullName}</h6>
							<h6 className='point'>{list[2].experiencePoint}</h6>
						</div>
					}
					{list[0] &&
						<div className='item-card one'>
							<img src={list[0].avatar || avatarDefault} alt="avatar" />
							<h6 className='item-level'>{list[0].position + 1}</h6>
							<h6 className='name'>{list[0].fullName}</h6>
							<h6 className='point'>{list[0].experiencePoint}</h6>
						</div>
					}
					{list[1] &&
						<div className='item-card three'>
							<img src={list[1].avatar || avatarDefault} alt="avatar" />
							<h6 className='item-level'>{list[1].position + 1}</h6>
							<h6 className='name'>{list[1].fullName}</h6>
							<h6 className='point'>{list[1].experiencePoint}</h6>
						</div>
					}
				</div>
				<div className='out-of-top-three'>
					{
						list.slice(3).map((item, idx) =>
							<div className='item-list' key={idx}>
								<h6 className='item-level'> {item.position + 1}</h6>
								<img alt='avatar' src={item.avatar || avatarDefault} />
								<h6 className='name'>
									{item.fullName}
								</h6>
								<h6 className='point'>{item.experiencePoint}</h6>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}
