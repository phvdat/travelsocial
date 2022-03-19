import React from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import './register.scss'

export default function Register() {
	return <div className="login-container">
		<Topbar/>
		<form className="loginForm">
			<h1>Đăng ký tài khoản</h1>
			<input type="text" placeholder="Nhập họ tên" className="nameInput" />
			<input type="email" placeholder="Nhập email của bạn" className="emailInput" />
			<input type="password" placeholder="Mật khẩu" className="passInput" />
			<input type="password" placeholder="Xác nhận mật khẩu" className="passInput" />
			<div>
				<input type="checkbox" name="term" />
				<label htmlFor="term">Tôi đồng ý với các <Link to="/terms-services" style={{ textDecoration: 'none', color: 'rgb(250,146,19)' }}>quy định</Link> của Travel</label>
			</div>
			<button className="loginForm__SignBtn">Đăng ký</button>
			<div className="loginForm__FgPass">
			</div>
		</form>
	</div>;
}