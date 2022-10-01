import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './loginModal.scss';

const LoginModal = () => {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setModalText('Đang đăng nhập...');
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 500);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setOpen(false);
	};

	const onFinish = (values) => {
		console.log('Success:', values);
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
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input className='ant-input-username' placeholder='Username' />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
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