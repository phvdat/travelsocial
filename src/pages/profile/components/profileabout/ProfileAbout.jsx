import { Col, DatePicker, Form, message, Row } from 'antd';
import React, { useState } from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import './profileAbout.scss'
import moment from 'moment';
import authApi from '../../../../api/authApi';
export default function ProfileAbout() {
	const [data, setData] = useState({
		fullName: 'Nguyễn Văn A',
		phone: '0912312',
		email: 'viethungmytho123@gmail.com',
		birthday: '111',
		avatar: 'aa',
		cover: 'aa',
		address: 'bbb'
	})
	console.log('dataa', data)
	const [showEditFullName, setShowEditFullName] = useState(false)
	const [showEditPhone, setShowEditPhone] = useState(false)
	const [showEditAddress, setShowEditAddress] = useState(false)
	const [showEditEmail, setShowEditEmail] = useState(false)
	const [showEditBirth, setShowEditBirth] = useState(false)

	const dateFormat = "DD/MM/YYYY";
	const handleChangeDate = (date, dateString) => {
		setData({ ...data, birthday: dateString });
	}
	const handleSaveChange = async () => {
		try {
			const response = await authApi.upadateUserInfoApi(data)
			if (response.status_code === 9999) {
				console.log('success')
			}
			if (response.status_code === -9999) {
				console.log('fail')
			}
		} catch (error) {
			console.log('error', error)
		}
	}
	return (
		<div className='profile-about-container'>
			<h1>Giới thiệu</h1>

			<div className='sub-title-about'>
				<MdOutlineAccountCircle />
				<h2>Thông tin cá nhân</h2>
			</div>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Avata</h3>
				</Col>
				<Col span={18}>
					<div className='about-col-2'>
						<img src="https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg" alt="avata" />
						<span>
							<BiPencil /> Chỉnh sửa
						</span>
					</div>
				</Col>
			</Row>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Tên Tài khoản</h3>
				</Col>
				<Col span={18}>
					{
						showEditFullName ?
							<form className='form-edit'>
								<input type="text" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />
								<button onClick={() => handleSaveChange()} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => setShowEditFullName(false)}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>Phạm Văn Đạt</h3>
								<span onClick={() => {
									setShowEditFullName(true)
								}}>
									<BiPencil /> Chỉnh sửa
								</span>
							</div>
					}
				</Col>
			</Row>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Email</h3>
				</Col>
				<Col span={18}>
					{
						showEditEmail ?
							<form className='form-edit'>
								<input type="text" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
								<button onClick={() => handleSaveChange()} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setShowEditEmail(false)
								}}
								>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>phamvandat.hcmut@gmail.com</h3>
								<span onClick={() => {
									setShowEditEmail(true)
								}}>
									<BiPencil /> Chỉnh sửa
								</span>
							</div>
					}
				</Col>
			</Row>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Ngày sinh</h3>
				</Col>
				<Col span={18}>
					{
						showEditBirth ?
							<form className='form-edit-birth'>
								<div className='date-picker-container'>
									<DatePicker defaultValue={moment(data.birthday, dateFormat)} format={dateFormat} onChange={handleChangeDate} />
								</div>
								<button onClick={() => handleSaveChange()} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => setShowEditBirth(false)}>Huỷ</button>
							</form>

							:

							<div className='about-col-2'>
								<h3>20/01/2000</h3>
								<span onClick={() => { setShowEditBirth(true) }}>
									<BiPencil /> Chỉnh sửa
								</span>
							</div>
					}
				</Col>
			</Row >
			<hr className='custome-hr' />
			<div className='sub-title-about'>
				<BsTelephone />
				<h2>Thông tin Liên hệ</h2>
			</div>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Số điện thoại</h3>
				</Col>
				<Col span={18}>
					{
						showEditPhone ?
							<form className='form-edit'>
								<input type="number" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
								<button onClick={() => handleSaveChange()} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setShowEditPhone(false)
								}
								}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>0123456789</h3>
								<span onClick={setShowEditPhone}>
									<BiPencil /> Chỉnh sửa
								</span>
							</div>
					}
				</Col>
			</Row>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Địa chỉ</h3>
				</Col>
				<Col span={18}>
					{
						showEditAddress ?
							<form className='form-edit'>
								<input type="text" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
								<button onClick={() => handleSaveChange()} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setShowEditAddress(false)
								}
								}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>Tân Bình</h3>
								<span onClick={() => setShowEditAddress(true)}>
									<BiPencil /> Chỉnh sửa
								</span>
							</div>
					}
				</Col>
			</Row>
			<hr className='custome-hr' />
		</div >
	)
}
