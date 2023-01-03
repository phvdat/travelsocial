import './SearchUserStyle.scss'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from 'components/baseUI/loading/Loading'
import elasticSearchApi from 'api/elasticSearchApi'
import avatarDefault from 'assets/img/avatarDefault.jpg';
import { Link } from 'react-router-dom'

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
				setResult(res.payload)
			}
			if (res.status_code === -9999) {
				console.log('not found')
			}
		} catch (error) {
			console.log('search user failed')
		}
		setLoading(false)
	}
	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		if (!searchValue) {
			setLoading(false)
			setResult([])
			return
		}
		setLoading(true)
		const delayDebounceFn = setTimeout(() => {
			handleOnSubmit(searchValue)
			// setLoading(false)
		}, 500)
		return () => clearTimeout(delayDebounceFn)

	}, [searchValue]);

	return (
		<div className='search-user-container'>
			<form onSubmit={(e) => handleOnSubmit(e)} className="searchbar">
				<input type="text" placeholder="Tìm kiếm người dùng" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
				<div className="searchIcon" onClick={handleOnSubmit}>
					<AiOutlineSearch />
				</div>
			</form>
			<div className='result-search-user'>
				{
					loading ?
						<Loading position="center-loading" /> :
						<ul className='show-result-list'>
							{
								result.length !== 0 ?
									result.map(item => {
										return (
											<li key={item._id}>
												<Link className="search-user-item" to={`/profile/${item._id}/newfeed`} >
													<img src={item.avatar || avatarDefault} alt="avatar" className="avt-user" />
													<span>{item.fullName}</span>
												</Link>
											</li>
										)
									})
									:
									(
										searchValue &&
										<h4 style={{ textAlign: 'center' }}>Không tìm thấy</h4>
									)
							}
						</ul>
				}
			</div>
		</div>
	)
}

export default SearchUser