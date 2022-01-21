import { Link } from "react-router-dom";
import './login.scss'

export default function Login() {
	return <div className="login-container">
		<form className="loginForm">
			<h1>Bạn đã có tài khoản ?</h1>
			<input type="email" placeholder="Nhập email của bạn" className="emailInput" />
			<input type="password" placeholder="Mật khẩu" className="passInput" />
			<button className="loginForm__SignBtn">Đăng nhập</button>
			<div className="loginForm__FgPass">
				<Link to='/register' style={{ textDecoration: 'none', color: '#fff'}}>Đăng ký</Link>
				<Link to='/fogotPassword' style={{ textDecoration: 'none', color: '#fff'}}>Quên mật khẩu</Link>
			</div>
			<p>-Hoặc đăng nhập bằng-</p>
			<div className="SignBtnWith">
				<button className="loginForm__SignBtn2">Facebook</button>
				<button className="loginForm__SignBtn2">Google</button>
			</div>
		</form>
	</div>;
}
