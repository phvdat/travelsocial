import { Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import app from '../../configs/firebaseConfig';
import './loginModal.scss';
import { LOGIN_SUCCESS, SET_CURRENT_USER } from '../../reducers/authentication/actionTypes';
import { useDispatch } from 'react-redux';

const LoginModal = () => {
	const dispach = useDispatch();
	const auth = getAuth(app);
	const navigate = useNavigate()
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [data, setData] = useState({})
	const showModal = () => {
		setOpen(true);
	};
	const handleCancel = () => {
		console.log('Clicked cancel button');
		setOpen(false);
	};
	const onFinish = async (values) => {
		setData({ ...values, kind: 'internal', isAdmin: false })
		const postLoginData = async () => {
			try {
				const response = await authApi.loginApi(data)
				if (response.status_code === 9999) {
					setOpen(false)
					message.success('Đăng nhập thành công!')
					navigate('/')
					window.localStorage.setItem('access_token', JSON.stringify(response.payload.accessToken));
					window.localStorage.setItem('refresh_token', JSON.stringify(response.payload.refreshToken));
					window.localStorage.setItem('isLogin', JSON.stringify(true));
					dispach({
						type: LOGIN_SUCCESS,
						payload: [],
					})
				}
				if (response.status_code === -9999) {
					message.warning('Username hoặc mật khẩu không đúng!')
				}
			} catch (error) {
				console.log(error, 'login fail')
			}
		}
		const getUserInfo = async () => {
			console.log('get me')
			try {
				const response = await authApi.getUserInfoApi()
				if (response.status_code === 9999) {
					window.localStorage.setItem('user_info', JSON.stringify(response.payload));
					dispach({
						type: SET_CURRENT_USER,
						payload: response.payload,
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
		postLoginData()
		getUserInfo()
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const authWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((result) => {
			const user = result.user;
			console.log(user);
			message.success('Đăng nhập thành công!')
			setOpen(false)
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			message.error('Đăng nhập thất bại!')
		});
	}
	const authWithFacebook = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider).then((result) => {
			const user = result.user;
			console.log(user);
			message.success('Đăng nhập thành công!')
			setOpen(false)
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			message.error('Đăng nhập thất bại!')
		});
	}
	return (
		<>
			<div onClick={showModal} className="iconRightSide">
				<div className="subIconRight">
					<AiOutlineLogin className="topbarIcon-2" />
				</div>
				<p>Đăng nhập</p>
			</div>
			<Modal
				title="Đăng nhập"
				open={open}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				footer={null}
				className="login-modal"
			>
				<p className='login-text-1'>Tham gia ngay cộng đồng du lịch hàng đầu Việt Nam và tận hưởng những điều tuyệt vời nhất từ Travel</p>
				<button className='btn-facebook' onClick={() => authWithFacebook()}>Đăng nhập bằng Facebook</button>
				<button className='btn-google' onClick={() => authWithGoogle()}>Đăng nhập bằng Google</button>
				<p className='login-text-2'>Đăng nhập bằng tài khoản</p>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className='login-form'>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
					>
						<Input className='ant-input-username' placeholder='Username' />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
					>
						<Input.Password placeholder='Password' />
					</Form.Item>
					<div className='btn-container'>
						<button type='submit' className='btn-login'>Đăng nhập</button>
						<button type='button' className='btn-register'
							onClick={() => {
								navigate('/register')
								handleCancel()
							}}>Đăng ký</button>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default LoginModal;