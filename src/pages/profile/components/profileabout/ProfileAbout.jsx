import { Button, Col, DatePicker, Form, message, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import './profileAbout.scss'
import moment from 'moment';
import authApi from '../../../../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import avatarDefault from 'assets/img/avatarDefault.jpg'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { getUsersInfoById } from 'function/callApi';
import { SET_CURRENT_USER } from 'reducers/authentication/actionTypes';
export default function ProfileAbout(props) {
	const dispach = useDispatch();
	const { userInfo } = props
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [data, setData] = useState({
		fullName: '',
		phone: '',
		email: '',
		birthday: '',
		avatar: '',
		address: '',
	})
	useEffect(() => {
		window.scrollTo(0, 0);
		const { fullName, phone, email, birthday, avatar, address } = userInfo
		setData({
			fullName: fullName,
			phone: phone,
			email: email,
			birthday: birthday,
			avatar: avatar,
			address: address
		})
	}, [userInfo])
	const [showEditFullName, setShowEditFullName] = useState(false)
	const [showEditPhone, setShowEditPhone] = useState(false)
	const [showEditAddress, setShowEditAddress] = useState(false)
	const [showEditEmail, setShowEditEmail] = useState(false)
	const [showEditBirth, setShowEditBirth] = useState(false)

	const dateFormat = "DD/MM/YYYY";
	const handleChangeDate = (date, dateString) => {
		setData({ ...data, birthday: dateString });
	}
	const handleSaveChange = async (e) => {
		e?.preventDefault()
		try {
			const response = await authApi.upadateUserInfoApi(data)
			if (response.status_code === 9999) {
				console.log('update success')
				message.success('Cập nhật thành công')
				getUsersInfoById(response.payload.userId).then(
					(res, req) => {
						window.localStorage.setItem('currentUser', JSON.stringify(res));
						dispach({
							type: SET_CURRENT_USER,
							payload: response.payload,
						})
					}
				)
			}
			if (response.status_code === -9999) {
				console.log('update fail')
			}
		} catch (error) {
			console.log('update error', error)
		}
	}
	//upload avater
	const storage = getStorage();
	const uploadProps = {
		name: 'file',
		multiple: false,
		showUploadList: false,
		customRequest({ file, onSuccess }) {
			const handleUpload = async () => {
				try {
					const typeMedia = file.type.split('/')[0]
					var nameOnCloud = `avatar/${file.name + v4()}`
					const storageRef = ref(storage, nameOnCloud);
					await uploadBytes(storageRef, file)
					try {
						const link = await getDownloadURL(storageRef)
						setData({ ...data, avatar: link })
					} catch (error) {
						console.log(error)
					}
					onSuccess('ok')
				} catch (error) {
					console.log(error)
				}
			}
			handleUpload()
		},
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log('uploading')
			}
			if (status === 'done') {
				console.log('upload done')
				handleSaveChange()
				message.success('image uploaded successfully.');
				window.location.reload(false);
			} else if (status === 'error') {
				message.error(`${info.file.name
					} file upload failed.`);
			}
		},
		beforeUpload(file) {
			if (!["image/jpeg", "image/png"].includes(file.type)) {
				message.error(`${file.name} is not a valid image / video type`, 2);
				return null;
			}
			return true;
		},
	};
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
					<span className='about-col-2'>
						<img src={userInfo.avatar || avatarDefault} alt="avatar" />
						{
							currentUser._id === userInfo._id &&
							<span>
								<Upload {...uploadProps}>
									<BiPencil /> Chỉnh sửa
								</Upload>
							</span>
						}
					</span>
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
							<form className='form-edit' >
								<input type="text" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />
								<button type='submit' onClick={(e) => {
									handleSaveChange(e)
									setShowEditFullName(false)
								}} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => setShowEditFullName(false)}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>{data.fullName}</h3>
								{
									currentUser._id === userInfo._id &&
									<span onClick={() => {
										setShowEditFullName(true)
									}}>
										<BiPencil /> Chỉnh sửa
									</span>
								}
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
							<form className='form-edit'
							>
								<input type="email" value={data.email || ''} onChange={(e) => setData({ ...data, email: e.target.value })} />
								<button type='submit' onClick={(e) => {
									handleSaveChange(e)
									setShowEditEmail(false)
								}} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setShowEditEmail(false)
								}}
								>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>{data.email}</h3>
								{
									currentUser._id === userInfo._id &&
									<span onClick={() => {
										setShowEditEmail(true)
									}}>
										<BiPencil /> Chỉnh sửa
									</span>
								}
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
									<DatePicker defaultValue={data.birthday ? moment(data.birthday, dateFormat) : moment()} format={dateFormat} onChange={handleChangeDate} />
								</div>
								<button type='submit' onClick={(e) => {
									handleSaveChange(e)
									setShowEditBirth(false)
								}} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => setShowEditBirth(false)}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>{data.birthday}</h3>
								{
									currentUser._id === userInfo._id &&
									<span onClick={() => { setShowEditBirth(true) }}>
										<BiPencil /> Chỉnh sửa
									</span>
								}
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
								<button type='submit' onClick={(e) => {
									handleSaveChange(e)
									setShowEditPhone(false)
								}} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setShowEditPhone(false)
								}
								}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>{data.phone}</h3>
								{
									currentUser._id === userInfo._id &&
									<span onClick={setShowEditPhone}>
										<BiPencil /> Chỉnh sửa
									</span>
								}
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
								<button type='submit' onClick={(e) => {
									handleSaveChange(e)
									setShowEditAddress(false)
								}} className='first-child'>Lưu thay đổi</button>
								<button className='second-child' onClick={() => {
									setShowEditAddress(false)
								}
								}>Huỷ</button>
							</form>
							:
							<div className='about-col-2'>
								<h3>{data.address}</h3>
								{
									currentUser._id === userInfo._id &&
									<span onClick={() => setShowEditAddress(true)}>
										<BiPencil /> Chỉnh sửa
									</span>
								}
							</div>
					}
				</Col>
			</Row>
			<hr className='custome-hr' />
		</div >
	)
}
