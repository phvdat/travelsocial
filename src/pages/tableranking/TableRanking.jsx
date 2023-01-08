import './tableRanking.scss'
import rankingApi from 'api/rankingApi';
import { getUsersInfoById } from 'function/callApi';
import React, { useEffect, useState } from 'react'
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { Link } from 'react-router-dom';
import Loading from 'components/baseUI/loading/Loading';
import { SCREEN_LG } from 'constants/common';

export default function TableRankingPage() {
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const getListRanking = async () => {
		try {
			const params = { page: 1, size: 100 }
			const response = await rankingApi.getListLeaderBoardUser(params)
			console.log(response);
			Promise.all(response.payload.items.map((item) => {
				return getUsersInfoById(item.userId)
			})).then((res) => {
				setList(prev => [...prev, ...res])
			})
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		window.scrollTo(0, 0);
		getListRanking()
	}, []);

	const { innerWidth } = window;
	return (
		<div className='container-ranking'>

			{innerWidth > SCREEN_LG &&
				<div className='instruction-point'>
					<h3>Quy định về cách tính điểm xếp hạng</h3>
					<hr className='postHr' />
					<ul>
						<li>Điểm cộng khi thích 1 bài viết: <b>2</b></li>
						<li>Điểm cộng khi bình luận 1 bài viết: <b>4</b></li>
						<li>Điểm cộng khi đánh giá 1 bài viết: <b>2</b></li>
						<li>Điểm cộng khi tạo mới 1 bài viết: <b>20</b></li>
						<li>Điểm cộng khi bài viết tăng 1 lượt thích: <b>1</b></li>
						<li>Điểm cộng khi bài viết tăng 1 lượt bình luận: <b>2</b></li>
						<li>Điểm cộng khi bài viết tăng 1 đánh giá: <b>Số điểm được đánh giá (1-&gt;5)</b></li>
					</ul>
					<h3 style={{ marginTop: '10px' }}>Quy định về cấp bậc thành viên</h3>
					<hr className='postHr' />
					<ul>
						<li>Thứ hạng thuộc top 3: <b>Tích cực</b></li>
						<li>Thứ hạng thuộc top 10: <b>Nhiệt tình</b></li>
						<li>Thứ hàng sau top 10: <b>Năng động</b></li>
					</ul>
				</div>
			}
			<div className='wapper-ranking'>
				<div className="top-three">
					{list[2] &&
						<Link to={`/profile/${list[2]._id}/newfeed`}>
							<div className='item-card two'>
								<img src={list[2].avatar || avatarDefault} alt="avatar" />
								<h6 className='item-level'>3</h6>
								<h6 className='name show-one-line'>{list[2].fullName}</h6>
								<h6 className='point'>{list[2].experiencePoint}</h6>
							</div>
						</Link>
					}
					{list[0] &&
						<Link to={`/profile/${list[0]._id}/newfeed`}>
							<div className='item-card one'>
								<img src={list[0].avatar || avatarDefault} alt="avatar" />
								<h6 className='item-level'>1</h6>
								<h6 className='name show-one-line'>{list[0].fullName}</h6>
								<h6 className='point'>{list[0].experiencePoint}</h6>
							</div>
						</Link>
					}
					{list[1] &&
						<Link to={`/profile/${list[1]._id}/newfeed`}>
							<div className='item-card three'>
								<img src={list[1].avatar || avatarDefault} alt="avatar" />
								<h6 className='item-level'>2</h6>
								<h6 className='name show-one-line'>{list[1].fullName}</h6>
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
									<h6 className='item-level'>{idx + 4}</h6>
									<img alt='avatar' src={item.avatar || avatarDefault} />
									<h6 className='name show-one-line'>
										{item.fullName}
									</h6>
									<h6 className='point'>{item.experiencePoint} </h6>
								</div>
							</Link>
						)
					}
				</div>
				{isLoading && <Loading position="center-loading" />}
			</div>
			{
				innerWidth > SCREEN_LG &&
				<div className='instruction-point'>
					<h3>Giải thưởng tháng này</h3>
					<hr className='postHr' />
					<ul>
						<li>Giải nhất: <b>Một chuyến du lịch Phú Quốc 3 ngày 3 đêm</b></li>
						<li>Giải nhì: <b>1.000.000 đồng</b></li>
						<li>Giải ba: <b>500.000 đồng</b></li>
					</ul>
				</div>
			}
		</div >
	)
}
