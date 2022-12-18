import './SearchUserStyle.scss'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from 'components/baseUI/loading/Loading'
import elasticSearchApi from 'api/elasticSearchApi'

const SearchUser = () => {
	const [searchValue, setSearchValue] = useState('')
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState([])
	const handleOnSubmit = async (e) => {
		try {
			const params = {
				page: 1,
				size: 20,
				keyword: searchValue
			}
			const res = await elasticSearchApi.searchUser(params)
			if (res.status_code === 9999) {
				setResult(prev => [...prev, ...(res.payload.items)])
			}
			if (res.status_code === -9999) {
				console.log('not found')
			}
		} catch (error) {
			console.log('search user failed')
		}
	}
	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		setLoading(true)
		const delayDebounceFn = setTimeout(() => {
			setLoading(false)
			console.log(searchValue)
			handleOnSubmit(searchValue)
		}, 500)
		return () => clearTimeout(delayDebounceFn)

	}, [searchValue]);

	return (
		<div className='search-user-container'>
			<form onSubmit={(e) => handleOnSubmit(e)} className="searchbar">
				<input type="text" placeholder="Tìm kiếm tài khoản khác" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
				<div className="searchIcon" onClick={handleOnSubmit}>
					<AiOutlineSearch />
				</div>
			</form>
			<div className='result-search-user'>

			</div>
			{
				loading ?
					<Loading position="center-loading" /> :
					<ul>
						{
							result.length !== 0 &&
							result.map(item => {
								return (
									<li>
										abc
									</li>
								)
							})
						}
					</ul>
			}
			{
				!loading && searchValue &&
				<h4 style={{ textAlign: 'center' }}>Không tìm thấy</h4>
			}
		</div>
	)
}

export default SearchUser