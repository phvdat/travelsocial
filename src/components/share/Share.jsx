import { Form, message, Modal, Select } from 'antd';
import { useState } from 'react';
import './share.scss'
import Dragger from 'antd/lib/upload/Dragger';
import { AiOutlineUpload } from 'react-icons/ai'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import postApi from 'api/postApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatarDefault from 'assets/img/avatarDefault.jpg'
const { Option } = Select;

export default function Share() {
	const navigate = useNavigate()
	const currentUser = useSelector(state => state.authentication.currentUser)
	const [form] = Form.useForm();
	const storage = getStorage();
	const [dataSubmit, setDataSubmit] = useState({
		title: '',
		content: '',
		type: '',
		destination: '',
		status: 'public',
		mediaList: [],
	})
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// upload
	const [fileUploaded, setFileUploaded] = useState([]);
	const props = {
		name: 'file',
		listType: "picture-card",
		multiple: true,
		customRequest({ file, onSuccess }) {
			const handleUpload = async () => {
				try {
					const typeMedia = file.type.split('/')[0]
					var nameOnCloud = typeMedia === "video" ? `videos/${file.name + v4()}` : `images/${file.name + v4()}`
					const storageRef = ref(storage, nameOnCloud);
					await uploadBytes(storageRef, file)
					try {
						const link = await getDownloadURL(storageRef)
						setFileUploaded(previousValues => ([...fileUploaded,
						{
							name: file.name,
							link: link,
							nameOnCloud: nameOnCloud,
							type: typeMedia
						}
						]))
					} catch (error) {
						console.log(error)
					}
					onSuccess('ok')
				} catch (error) {
					console.log(error)
				}
			}
			handleUpload()
		},
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log('uploading')
			}
			if (status === 'done') {
				console.log('upload done')
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		beforeUpload(file) {
			if (!["image/jpeg", "image/png", "video/mp4"].includes(file.type)) {
				message.error(`${file.name} is not a valid image/video type`, 2);
				return null;
			}
			return true;
		},
		onRemove(file) {
			var removal = fileUploaded.find(item => item.name === file.name)
			const desertRef = ref(storage, removal.nameOnCloud);
			deleteObject(desertRef).then(() => {
				console.log('already deleted.')
				setFileUploaded(fileUploaded.filter(x => x.name !== file.name))
			}).catch((error) => {
				console.log(error)
			});
		},
		onPreview(file) {

		}
	};

	const handleFinish = async () => {
		const dataPostSubmit = {
			...dataSubmit, mediaList: fileUploaded.map(item => {
				var temp = { ...item }
				delete temp.nameOnCloud
				delete temp.name
				return temp;
			})
		}
		const postLoginData = async () => {
			try {
				const response = await postApi.createPost(dataPostSubmit)
				console.log(response)
				if (response.status_code === 9999) {
					message.success('Tạo bài viết thành công!')
					form.resetFields();
					setFileUploaded([])
					setIsModalOpen(false)
				}
				if (response.status_code === -9999) {
					message.warning('Đã xảy ra lỗi!')
				}
			} catch (error) {
				console.log(error, 'error')
			}
		}
		postLoginData()
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className='shareContain' >
			<div className="shareBox">
				<div className="inputShare">
					<img src={currentUser.avatar || avatarDefault} alt="avate user" className="avt-user" />
					<button onClick={() => showModal()} type="button" className='btn-share'>Viết bài đăng</button>
				</div>

				<Modal getContainer={false} title={
					<div className="header-share">
						<img src={currentUser.avatar || avatarDefault} alt="avate user" className="avt-user" />
						<div>
							<p>{currentUser.fullName}</p>
							<Select
								className='select-status'
								defaultValue="public"
								style={{
									width: 118,
								}}
								onChange={value => setDataSubmit({ ...dataSubmit, status: value })}
							>
								<Option value="public">Công khai</Option>
								<Option value="Follower">Bạn bè</Option>
								<Option value="private">Chỉ mình tôi</Option>
							</Select>
						</div>
					</div>
				} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
					footer={null}
					className="share-modal">
					<Form
						onFinish={handleFinish}
						onFinishFailed={onFinishFailed}
					>
						<Form.Item
							name="title"
							rules={[{ required: true, message: 'Bài viết chưa có tiêu đề!' }]}
						>
							<input name='title' type="text" placeholder='Tiêu đề bài viết' className='input-title'
								onChange={e => setDataSubmit({ ...dataSubmit, title: e.target.value })} />
						</Form.Item>

						<Form.Item
							name="content"
							rules={[{ required: true, message: 'Bài viết chưa có nội dung!' }]}
						>
							<textarea name="content" className='text-area-share' placeholder='Bạn muốn chia sẻ điều gi?' rows={4}
								onChange={e => setDataSubmit({ ...dataSubmit, content: e.target.value })} />
						</Form.Item>
						<div className='sub-form'>
							<div>
								<Form.Item
									name="destination"
									rules={[{ required: true, message: 'Vui lòng nhập địa điểm !' }]}
								>
									<input name="address" type="text" placeholder='Địa điểm' className='input-location'
										onChange={e => setDataSubmit({ ...dataSubmit, destination: e.target.value })} />
								</Form.Item>
							</div>
							<div>
								<Form.Item
									name="username"
									rules={[{ required: true, message: 'Vui lòng chọn kiểu du lịch!' }]}
								>

									<Select value='discover' style={{}}
										placeholder='Chọn kiểu du lịch'
										className='select-type-travel'
										onChange={value => setDataSubmit({ ...dataSubmit, type: value })}
									>
										<Option value="ecotourism">Du lịch sinh thái</Option>
										<Option value="cultural">Du lịch văn hóa</Option>
										<Option value="resort">Du lịch nghỉ dưỡng</Option>
										<Option value="leisure">Du lịch giải trí </Option>
										<Option value="sports">Du lịch thể thao</Option>
										<Option value="discover">Du lịch khám phá</Option>
										<Option value="adventure">Du lịch mạo hiểm</Option>
										<Option value="combined">Du lịch kết hợp</Option>
									</Select>
								</Form.Item>
							</div>
						</div>
						<Dragger {...props}
						>
							<AiOutlineUpload style={{ 'fontSize': 30 }} />
							<div className="uploadText">
								<p>Kéo và thả ở đây hoặc click để chọn</p>
							</div>
						</Dragger>

						<div>
							<button type='submit' className='btn-share-create'>Chia sẻ</button>
						</div>
					</Form>
				</Modal>
			</div>
		</div >
	)
}
