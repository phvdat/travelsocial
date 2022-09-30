import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import './loginModal.scss';

const LoginModal = () => {
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
				<p>Tham gia ngay cộng đồng du lịch hàng đầu Việt Nam và tận hưởng những điều tuyệt vời nhất từ Travel</p>
				<button className='btn-facebook'>Đăng nhập bằng Facebook</button>
				<button className='btn-google'>Đăng nhập bằng Google</button>
				<p className='text-2'>Đăng nhập bằng tài khoản</p>
				<Input placeholder='Username' className='ant-input-username'/>
				<Input.Password placeholder='Mật khẩu'/>
				<button className='btn-login'>Đăng nhập</button>
				<button className='btn-register'>Đăng ký</button>
			</Modal>
		</>
	);
};

export default LoginModal;