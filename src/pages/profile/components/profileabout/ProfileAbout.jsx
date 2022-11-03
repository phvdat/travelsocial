import { Col, Row } from 'antd';
import React from 'react'
import { MdAccountCircle } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import './profileAbout.scss'
export default function ProfileAbout() {
	return (
		<div className='profile-about-container'>
			<h1>Giới thiệu</h1>
			<div>
				<MdAccountCircle />
				<h2>Thông tin cá nhân</h2>
			</div>


			<hr className='custome-hr' />
			<Row vgutter={8}>
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
					<div className='about-col-2'>
						<h3>Phạm Văn Đạt</h3>
						<span>
							<BiPencil /> Chỉnh sửa
						</span>
					</div>
				</Col>
			</Row>

			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Ngày sinh</h3>
				</Col>
				<Col span={18}>
					<div className='about-col-2'>
						<h3>20/01/2000</h3>
						<span>
							<BiPencil /> Chỉnh sửa
						</span>
					</div>
				</Col>
			</Row>
			<hr className='custome-hr' />

			<h2>Thông tin Liên hệ</h2>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Số điện thoại</h3>
				</Col>
				<Col span={18}>
					<div className='about-col-2'>
						<h3>0123456789</h3>
						<span>
							<BiPencil /> Chỉnh sửa
						</span>
					</div>
				</Col>
			</Row>
			<hr className='custome-hr' />
			<Row>
				<Col span={6}>
					<h3>Địa chi</h3>
				</Col>
				<Col span={18}>
					<div className='about-col-2'>
						<h3>Tân Bình</h3>
						<span>
							<BiPencil /> Chỉnh sửa
						</span>
					</div>
				</Col>
			</Row>
			<hr className='custome-hr' />
		</div>
	)
}
