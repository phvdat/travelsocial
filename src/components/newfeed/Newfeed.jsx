import "./newfeed.scss"
import Share from './../share/Share';
import Post from "../post/Post";
import { message, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import { useSelector } from "react-redux";
import Loading from "components/baseUI/loading/Loading";
import { useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { LIST_PROVINCE } from 'common/province';
import axiosClient from 'api/axiosClient';
import { PROVINCE } from 'constants/common';

const options = [
	{
		value: 'Tất cả',
		label: 'Tất cả',
	},
	{
		value: 'Du lịch sinh thái',
		label: 'Du lịch sinh thái',
	},
	{
		value: 'Du lịch văn hóa',
		label: 'Du lịch văn hóa',
	},
	{
		value: 'Du lịch nghỉ dưỡng',
		label: 'Du lịch nghỉ dưỡng',
	},
	{
		value: 'Du lịch giải trí',
		label: 'Du lịch giải trí',
	},
	{
		value: 'Du lịch thể thao',
		label: 'Du lịch thể thao',
	},
	{
		value: 'Du lịch khám phá',
		label: 'Du lịch khám phá',
	},

	{
		value: 'Du lịch mạo hiểm',
		label: 'Du lịch mạo hiểm',
	},

	{
		value: 'Du lịch kết hợp',
		label: 'Du lịch kết hợp',
	},
]
export default function Newfeed() {
	const [listPost, setListPost] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	const [page, setPage] = useState(1)
	const [hasNextPage, setHasNextPage] = useState(false)
	const hasNextPageRef = useRef(hasNextPage)
	const [optionsDestination, setOptionsDestination] = useState([])
	const getAllPost = async (pageNum) => {
		setIsLoading(true)
		try {
			const data = {
				page: pageNum,
				size: 10,
				status: "public"
			}
			const response = await postApi.getAllPost(data)
			if (response.status_code === 9999) {
				setListPost(prev => [...prev, ...(response.payload.items)])
				setHasNextPage(response.payload.hasNext)
				hasNextPageRef.current = response.payload.hasNext
			}
			if (response.status_code === -9999) {
				message.warning('Tải bài viết không thành công!')
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		getAllPost(page)
	}, [page])

	const handleScroll = async () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.getElementById('root').offsetHeight) return;
		if (hasNextPageRef.current) {
			setTimeout(() => {
				setPage(prev => prev + 1)
			}, 100)
		}
	}

	const getProvince = async () => {
		const url = 'https://provinces.open-api.vn/api/p/'
		try {
			const response = await axiosClient.get(url)
			setOptionsDestination(response.map((item) => ({
				label: item.name,
				value: item.name
			})))
		} catch (error) {
			setOptionsDestination(PROVINCE.map((item) => ({
				label: item.name,
				value: item.name
			})))
		}
	}
	useEffect(() => {
		getProvince();
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);


	return (
		<div className="newfeed">

			{
				isLoggedIn && <Share />
			}
			<div className="filter-container">
				<FaFilter color="#ff8c01" />
				<span>Lọc theo </span>
				<Select
					showSearch
					maxLength={4}
					style={{ width: 200 }}
					placeholder="Địa điểm"
					optionFilterProp="children"
					filterOption={(input, option) => (option?.label ?? '').includes(input)}
					options={options}
				/>
				<Select
					showSearch
					maxLength={4}
					style={{ width: 200 }}
					placeholder="Kiểu du lịch"
					optionFilterProp="children"
					filterOption={(input, option) => (option?.label ?? '').includes(input)}
					options={options}
				/>
			</div>
			{listPost.length !== 0 &&
				listPost.map((ele) => {
					return <Post postData={ele} key={ele._id} />
				})
			}
			{isLoading && <Loading position="center-loading" />}
		</div>
	)
}
