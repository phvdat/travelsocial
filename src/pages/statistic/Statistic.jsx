import './StatisticStyle.scss'
import ColumnChart from 'components/columnChart/ColumnChart'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

const Statistic = () => {
	const [page, setPage] = useState(1)
	const [totalItems, setTotalItems] = useState(1)
	const [series, setSeries] = useState(
		[{
			name: 'Số lượng',
			data: [100, 30, 56]
		}]
	)
	const [listPost, setListPost] = useState([
		{
			title: "abc",
			content: "abc"
		},
		{
			title: "abc",
			content: "abc"
		}

	])
	useEffect(() => {
		// getListPostById(page)
	}, [page])
	return (
		<div className='statistic-container'>
			<div className='list-post-container'>
				<h3>Bài viết</h3>
				<hr className='postHr' />
				<ul>
					{
						listPost.length !== 0 &&
						listPost.map((item, idx) => {
							return (
								<li key={idx}>
									<div className='wrapper-post-item' >
										<h4 className='show-one-line'>{idx + 1}. {item.title}</h4>
										<span className='show-two-line'>{item.content}</span>
										<span className='time-crete'>20:12 20/12/2022</span>
									</div>
								</li>
							)
						})
					}
				</ul>

				<Pagination onChange={e => setPage(e)} showSizeChanger={false} defaultCurrent={page} total={totalItems} />
			</div>
			<div className='chart-wrapper'>
				<ColumnChart series={series} />
				<span></span>
			</div>
		</div>
	)
}

export default Statistic