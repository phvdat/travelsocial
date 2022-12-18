import { Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'router/routePath';
import authApi from '../../api/authApi';
import './register.scss'

export default function RegisterPage() {
	const navigate = useNavigate()
	const onFinish = (values) => {
		var data = { ...values }
		delete data.passwordConfirm
		const postRegisterData = async () => {
			try {
				const response = await authApi.registerApi(data)
				if (response.status_code === 9999) {
					message.success('Đăng ký thành công!')
					navigate(RoutePath.Home)
				}
				if (response.status_code === -9999) {
					message.error('Tên đăng nhập đã được đăng ký')
				}
			} catch (error) {
				console.log(error)
			}
		}
		postRegisterData()
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className="register-container">
			<Form
				name="basic"
				labelCol={{ span: 1 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				className="register-form">
				<h1>Đăng ký tài khoản</h1>
				<Form.Item name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
					<Input placeholder="Nhập họ tên" className="input-field" />
				</Form.Item>
				<Form.Item name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
					<Input type="number" placeholder="Số điện thoại" className="ant-input ant-input-status-error input-field" />
				</Form.Item>
				<Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
					<Input placeholder="Username" className="input-field" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' },
				{ min: 8, message: 'Mật khẩu phải ít nhất 8 ký tự' },]}>
					<Input.Password placeholder="Mật khẩu" className="input-field" />
				</Form.Item>
				<Form.Item name="passwordConfirm" rules={[
					{ required: true, message: 'Vui lòng nhập lại mật khẩu' },
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('Mật khẩu không khớp!');
						},
					}),
				]}>
					<Input.Password placeholder="Xác nhận mật khẩu" className="input-field" />
				</Form.Item>
				<button type='submit' className="btn-register">Đăng ký</button>
			</Form>
		</div>
	)
}