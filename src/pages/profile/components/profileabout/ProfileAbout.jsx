import { Col, DatePicker, Form, Row } from 'antd';
import React, { useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import './profileAbout.scss'
import moment from 'moment';
export default function ProfileAbout() {
	const dataUser = {
		name: 'Pham Van Dat'
	}
	const [showEditFullName, setShowEditFullName] = useState(false)
	const [fullName, setFullName] = useState('')
	const [showEditPhone, setShowEditPhone] = useState(false)
	const [phone, setPhone] = useState('')
	const [showEditAddress, setShowEditAddress] = useState(false)
	const [address, setAddress] = useState('')
	const [showEditBirth, setShowEditBirth] = useState(false)

	const dateFormat = "DD/MM/YYYY";
	const handleChangeDate = (date, dateString) => {
		console.log(dateString);
	}
	return (
		<div className='profile-about-container'>
			<h1>Giới thiệu</h1>
			<div className='sub-title-about'>
				<MdAccountCircle />
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
								<input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
								<button className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => setShowEditFullName(false)}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>Phạm Văn Đạt</h3>
								<span onClick={() => {
									setShowEditFullName(true)
									setFullName(dataUser.name)
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
									<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={handleChangeDate} />
								</div>
								<button className='first-child'>Lưu thay đổi</button>
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

			<h2>Thông tin Liên hệ</h2>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Số điện thoại</h3>
				</Col>
				<Col span={18}>
					{
						showEditPhone ?
							<form className='form-edit'>
								<input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
								<button className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setPhone('12345')
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
								<input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />
								<button className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setAddress('Tân Bình')
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
