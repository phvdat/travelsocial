import elasticSearchApi from 'api/elasticSearchApi'
import Post from 'components/post/Post'
import Slideshow from 'components/slideshow/Slideshow'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './searchPage.scss'

export default function SearchPage() {
	const [listPost, setListPost] = useState([])

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const handleSearch = async () => {
			try {
				const params = {
					page: 1,
					size: 20,
					keyword: searchParams.get('keyword')
				}
				const response = await elasticSearchApi.searchPost(params)
				setListPost(response.payload)
			} catch (error) {
				console.log(error)
			}
		}
		handleSearch()
	}, [searchParams])

	return (
		<div className='search-page-container'>
			<Slideshow />
			<div className="wrapper-search-result">
				<h3 className='lable'>Kết quả tìm kiếm cho: <span>{searchParams.get('keyword')}</span></h3>
				{
					listPost?.map((item, idx) => {
						return <Post data={item} key={item._id} />
					})
				}
			</div>
		</div >
	)
}
