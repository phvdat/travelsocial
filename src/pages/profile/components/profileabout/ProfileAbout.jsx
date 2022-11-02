import React from 'react'
import { MdAccountCircle } from "react-icons/md";
import './profileAbout.scss'
export default function ProfileAbout() {
	return (
		<div className='profile-about-container'>
			<h1>Giới thiệu</h1>
			<h2>
				<MdAccountCircle />
				Thông tin cá nhân</h2>
			<h3>Tên Tài khoản: Phạm Văn Đạt</h3>
			<h3>Ngày sinh: 20/01/2000</h3>
			<h2>Liên hệ</h2>
			<h3>Số điện thoại</h3>
			<h3>Địa chi</h3>
		</div>
	)
}
