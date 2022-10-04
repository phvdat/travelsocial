import { Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import './loginModal.scss';

const LoginModal = () => {
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
	const onFinish = (values) => {
		setData({ ...values, kind: 'internal', isAdmin: false })
		const postLoginData = async () => {
			try {
				const response = await authApi.loginApi(data)
				console.log(response)
				if (response.status_code === 9999) {
					setOpen(false)
					message.success('Đăng nhập thành công!')
				}
				if (response.status_code === -9999) {
					message.warning('Username hoặc mật khẩu không đúng!')
				}
			} catch (error) {
				console.log(error, 'login fail')
			}
		}
		postLoginData()
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

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
				<button className='btn-facebook'>Đăng nhập bằng Facebook</button>
				<button className='btn-google'>Đăng nhập bằng Google</button>
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