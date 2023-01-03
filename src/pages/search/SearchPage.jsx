import elasticSearchApi from 'api/elasticSearchApi'
import Loading from 'components/baseUI/loading/Loading'
import Post from 'components/post/Post'
import Slideshow from 'components/slideshow/Slideshow'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './searchPage.scss'

export default function SearchPage() {
	const [listPost, setListPost] = useState([])
	const [isLoading, setIsLoading] = useState(true)

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
				setListPost(response.payload.items)
			} catch (error) {
				console.log(error)
			}
			setIsLoading(false)
		}
		handleSearch()
	}, [searchParams])

	return (
		<div className='search-page-container'>
			<Slideshow />
			<div className="wrapper-search-result">
				{isLoading ? <Loading /> :
					<div>
						{
							listPost.length === 0 ?
								<h3 className='lable'>Không tìm thấy kết quả cho: <span>{searchParams.get('keyword')}</span></h3>
								:
								<h3 className='lable'>Kết quả tìm kiếm cho: <span>{searchParams.get('keyword')}</span></h3>
						}
						{
							listPost?.map((item) => {
								return <Post postData={item} key={item._id} />
							})
						}
					</div>
				}
			</div>
		</div >
	)
}
