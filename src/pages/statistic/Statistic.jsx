import './StatisticStyle.scss'
import ColumnChart from 'components/columnChart/ColumnChart'
import React, { useState } from 'react'

const Statistic = () => {
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
	return (
		<div className='statistic-container'>
			<ul className='list-post-container'>
				<h3>Bài viết</h3>
				<hr className='postHr' />
				{
					listPost.length !== 0 &&
					listPost.map((item, idx) => {
						return (
							<li key={idx}>
								<div className='wrapper-post-item' >
									<h4 className='show-one-line'>{idx + 1}. {item.title}</h4>
									<p className='show-two-line'>{item.content}</p>
								</div>
							</li>
						)
					})
				}
			</ul>
			<div className='chart-wrapper'>
				<ColumnChart series={series} />
				<span></span>
			</div>
		</div>
	)
}

export default Statistic