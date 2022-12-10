import './EditPostDialogStyle.scss'
import React, { useEffect, useState } from 'react'
import avatarDefault from 'assets/img/avatarDefault.jpg'
import { useSelector } from 'react-redux'
import { Form, message, Modal, Select } from 'antd';
import postApi from 'api/postApi';
const { Option } = Select;

const EditPostDialog = (props) => {
	const { open, onClose, data } = props

	useEffect(() => {
		if (open) {
			document.documentElement.style.overflow = 'hidden';
		}
		return () => {
			document.documentElement.style.overflow = 'unset';

		};
	}, [open]);

	const currentUser = useSelector(state => state.authentication.currentUser)

	const [dataSubmit, setDataSubmit] = useState(data)
	const handleFinish = async () => {
		try {
			const res = await postApi.updatePost(dataSubmit)
			if (res.status_code === 9999) {
				message.success('Cập nhật bài viết thành công!')
				onClose()
			}
			if (res.status_code === -9999) {
				message.warning('Đã xảy ra lỗi!')
			}
		} catch (error) {

		}
	}
	return (
		<div>

			<Modal
				getContainer={false}
				title={
					<div className="header-share">
						<img src={currentUser.avatar || avatarDefault} alt="avate user" className="avt-user" />
						<div>
							<p>{currentUser.fullName}</p>
							<Select
								className='select-status'
								value={dataSubmit.status}
								style={{
									width: 118,
								}}
								onChange={value => setDataSubmit({ ...dataSubmit, status: value })}
							>
								<Select.Option value="public">Công khai</Select.Option>
								<Select.Option value="Follower">Bạn bè</Select.Option>
								<Select.Option value="private">Chỉ mình tôi</Select.Option>
							</Select>
						</div>
					</div>
				}
				centered
				open={open}
				onCancel={onClose}
				footer={null}
				className="share-modal">
				<Form
					onFinish={handleFinish}
				>
					<Form.Item
						rules={[{ required: true, message: 'Bài viết chưa có tiêu đề!' }]}
					>
						<input value={dataSubmit.title} name='title' type="text" placeholder='Tiêu đề bài viết' className='input-title'
							onChange={e => setDataSubmit({ ...dataSubmit, title: e.target.value })} />
					</Form.Item>

					<Form.Item
						rules={[{ required: true, message: 'Bài viết chưa có nội dung!' }]}
					>
						<textarea value={dataSubmit.content} name="content" className='text-area-share' placeholder='Bạn muốn chia sẻ điều gi?' rows={4}
							onChange={e => setDataSubmit({ ...dataSubmit, content: e.target.value })} />
					</Form.Item>
					<div className='sub-form'>
						<div>
							<Form.Item
								rules={[{ required: true, message: 'Vui lòng nhập địa điểm !' }]}
							>
								<input value={dataSubmit.destination} name="destination" type="text" placeholder='Địa điểm' className='input-location'
									onChange={e => setDataSubmit({ ...dataSubmit, destination: e.target.value })} />
							</Form.Item>
						</div>
						<div>
							<Form.Item
								rules={[{ required: true, message: 'Vui lòng chọn kiểu du lịch!' }]}
							>
								<Select style={{}}
									name='type'
									value={dataSubmit.type}
									placeholder='Chọn kiểu du lịch'
									className='select-type-travel'
									onChange={value => setDataSubmit({ ...dataSubmit, type: value })}
								>
									<Option value="Du lịch sinh thái">Du lịch sinh thái</Option>
									<Option value="Du lịch văn hóa">Du lịch văn hóa</Option>
									<Option value="Du lịch nghỉ dưỡng">Du lịch nghỉ dưỡng</Option>
									<Option value="Du lịch giải trí">Du lịch giải trí</Option>
									<Option value="Du lịch thể thao">Du lịch thể thao</Option>
									<Option value="Du lịch khám phá">Du lịch khám phá</Option>
									<Option value="Du lịch mạo hiểm">Du lịch mạo hiểm</Option>
									<Option value="Du lịch kết hợp">Du lịch kết hợp</Option>
								</Select>
							</Form.Item>
						</div>
					</div>
					<div>
						<button type='submit' className='btn-share-create'>Lưu lại</button>
					</div>
				</Form>
			</Modal>
		</div>

	)
}

export default EditPostDialog