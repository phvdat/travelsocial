import './StatisticStyle.scss'
import ColumnChart from 'components/columnChart/ColumnChart'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import postApi from 'api/postApi'
import { useSelector } from 'react-redux'
import { Link, NavLink, useSearchParams } from 'react-router-dom'
import moment from 'moment'

const Statistic = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(6)
	const [totalItems, setTotalItems] = useState(1)
	const [listPost, setListPost] = useState([])
	const [series, setSeries] = useState([])
	const [titleChart, setTitleChart] = useState({
		title: "",
		_id: ""
	})
	const handleShowChart = async () => {
		try {
			const params = {
				id: searchParams.get('postId')
			}
			const response = await postApi.getPostById(params)
			if (response.status_code === 9999) {
				const { likeSize, commentSize, rateSize, title, _id } = response.payload
				setSeries(
					[{
						name: 'Số lượng',
						data: [likeSize, commentSize, rateSize]
					}]
				)
				setTitleChart({
					title: title,
					_id: _id
				})
			}
			if (response.status_code === -9999) {
				console.log('fail')
			}
		} catch (error) {
			console.log(error)
		}
	}
	// const getListPostById = async () => {
	// 	try {
	// 		const params = {
	// 			page: page,
	// 			size: pageSize,
	// 			userId: currentUser._id
	// 		}
	// 		const response = await postApi.getAllPostByUserId(params)
	// 		if (response.status_code === 9999) {
	// 			const { items, totalItems } = response.payload
	// 			setListPost(items)
	// 			setTotalItems(totalItems)
	// 			setSearchParams({ postId: items[0]._id })
	// 		}
	// 		if (response.status_code === -9999) {
	// 			console.log('fail')
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
	const getAllPost = async (pageNum) => {
		try {
			const params = {
				page: page,
				size: pageSize,
				status: "public"
			}

			const response = await postApi.getAllPost(params)
			if (response.status_code === 9999) {
				const { items, totalItems } = response.payload
				setListPost(items)
				setTotalItems(totalItems)
				setSearchParams({ postId: items[0]._id })
			}
			if (response.status_code === -9999) {
				console.log('fail')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAllPost(page)
	}, [page])

	useEffect(() => {
		handleShowChart()
	}, [searchParams])

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
									<NavLink to={`/statistic?postId=${item._id}`} className={(item._id === searchParams.get('postId') ? "activeItemChart" : "")}>
										<div className='wrapper-post-item' onClick={() => handleShowChart()} >
											<h4 className='show-one-line'>{item.title}</h4>
											<span className='show-two-line'>{item.content}</span>
											<span className='time-create'>{moment(item.createTime).lang('en').format("hh:s A DD/MM/YYYY")}</span>
										</div>
									</NavLink>
								</li>
							)
						})
					}
				</ul>

				<Pagination
					onChange={e => setPage(e)}
					showSizeChanger={false}
					defaultCurrent={page}
					pageSize={pageSize}
					total={totalItems}
					size='small' />
			</div>
			<div className='chart-wrapper'>
				<ColumnChart series={series} />
				<Link to={`/post/${titleChart._id}`}>
					<span className='title-chart show-two-line'>Bài viết: {titleChart.title}</span>
				</Link>
			</div>
		</div>
	)
}

export default Statistic