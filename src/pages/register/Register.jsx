import { Form, Input } from 'antd';
import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import './register.scss'

export default function Register() {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className="register-container">
			<Topbar />
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
				<Form.Item name="fullname" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
					<Input placeholder="Nhập họ tên" className="input-field" />
				</Form.Item>
				<Form.Item name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
					{/* <InputNumber placeholder="Số điện thoại" className="input-field" /> */}
					<input type="number" placeholder="Số điện thoại" className="ant-input ant-input-status-error input-field" />
				</Form.Item>
				<Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập username' }]}>
					<Input placeholder="Username" className="input-field" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập password' }]}>
					<Input.Password placeholder="Mật khẩu" className="input-field" />
				</Form.Item>
				<Form.Item name="password2" rules={[
					{ required: true, message: 'Vui lòng nhập lại password' },
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