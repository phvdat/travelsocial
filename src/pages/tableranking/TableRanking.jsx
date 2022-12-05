import './tableRanking.scss'
import rankingApi from 'api/rankingApi';
import { getUsersInfoById } from 'function/callApi';
import React, { useEffect, useState } from 'react'
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { Link } from 'react-router-dom';
import Loading from 'components/baseUI/loading/Loading';

export default function TableRankingPage() {
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		window.scrollTo(0, 0);
		const getListRanking = async () => {
			try {
				const params = { page: 1, size: 10 }
				const response = await rankingApi.getListLeaderBoardUser(params)
				Promise.all(response.payload.map((item) => {
					return getUsersInfoById(item.userId)
				})).then((res) => {
					setList(prev => [...prev, ...res])
				})
				setIsLoading(false)
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
						<Link to={`/profile/${list[2]._id}/newfeed`}>
							<div className='item-card two'>
								<img src={list[2].avatar || avatarDefault} alt="avatar" />
								<h6 className='item-level'>3</h6>
								<h6 className='name'>{list[2].fullName}</h6>
								<h6 className='point'>{list[2].experiencePoint}</h6>
							</div>
						</Link>
					}
					{list[0] &&
						<Link to={`/profile/${list[0]._id}/newfeed`}>
							<div className='item-card one'>
								<img src={list[0].avatar || avatarDefault} alt="avatar" />
								<h6 className='item-level'>1</h6>
								<h6 className='name'>{list[0].fullName}</h6>
								<h6 className='point'>{list[0].experiencePoint}</h6>
							</div>
						</Link>
					}
					{list[1] &&
						<Link to={`/profile/${list[1]._id}/newfeed`}>
							<div className='item-card three'>
								<img src={list[1].avatar || avatarDefault} alt="avatar" />
								<h6 className='item-level'>2</h6>
								<h6 className='name'>{list[1].fullName}</h6>
								<h6 className='point'>{list[1].experiencePoint}</h6>
							</div>
						</Link>
					}
				</div>
				<div className='out-of-top-three'>
					{
						list.slice(3).map((item, idx) =>
							<Link to={`/profile/${item._id}/newfeed`} key={idx}>
								<div className='item-list' key={idx}>
									<h6 className='item-level'>{idx + 3}</h6>
									<img alt='avatar' src={item.avatar || avatarDefault} />
									<h6 className='name'>
										{item.fullName}
									</h6>
									<h6 className='point'>{item.experiencePoint} </h6>
								</div>
							</Link>
						)
					}
				</div>
				{
					isLoading &&
					<Loading />
				}
			</div>
		</div>
	)
}
