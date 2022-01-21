import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
	return <div className="login-container">
		<form className="loginForm">
			<h1>Đăng ký tài khoản</h1>
			<input type="email" placeholder="Nhập email của bạn" className="emailInput" />
			<input type="password" placeholder="Mật khẩu" className="passInput" />
			<input type="password" placeholder="Xác nhận mật khẩu" className="passInput" />
			<button className="loginForm__SignBtn">Đăng ký</button>
			<div className="loginForm__FgPass">
				<Link to='/login' style={{ textDecoration: 'none', color: '#fff' }}>Đã có tài khoản</Link>
			</div>
		</form>
	</div>;
}