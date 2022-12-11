import './MoreActionStyles.scss'
import { Button, Dropdown, Menu, message, Modal, Space } from 'antd'
import React, { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import authApi from 'api/authApi'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'router/routePath'

const MoreAction = (props) => {
	const { userId } = props
	const [isOpenBlock, setIsOpenBlock] = useState(false)
	const [isOpenDelete, setIsOpenDelete] = useState(false)

	const navigate = useNavigate()
	const menuAction = () => (
		< Menu
			items={
				[
					{
						label: <span onClick={() => setIsOpenBlock(true)}>Block tài khoản</span>,
						key: '0',
					},
					{
						label: <span onClick={() => setIsOpenDelete(true)}>Xoá tài khoản</span>,
						key: '1',
					},
				]}
		/>
	)
	const handleDeleteAcc = async () => {
		const params = { userId: userId }
		try {
			const res = await authApi.deleteUser(params)
			if (res.status_code === 9999) {
				message.success('Đã xoá tài khoản')
				navigate(RoutePath.Home)
			}
			if (res.status_code === -9999) {
				message.error('Không thành công')
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleBlockAcc = async () => {
		const params = { userId: userId }
		try {
			const res = await authApi.blockUser(params)
			if (res.status_code === 9999) {
				message.success('Đã khoá tài khoản')
			}
			if (res.status_code === -9999) {
				message.error('Không thành công')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='more-action-profile'>
			<Modal className='confirm-dialog'
				footer={null} open={isOpenBlock} onCancel={() => setIsOpenBlock(false)}>
				<h3>Khoá tài khoản này</h3>
				<div className='btns-container'>
					<button className='ok' onClick={() => handleBlockAcc()}>Tiếp khoá tài khoản</button>
					<button className='cancel' onClick={() => setIsOpenBlock(false)}>Huỷ</button>
				</div>
			</Modal>
			<Modal className='confirm-dialog'
				footer={null} open={isOpenDelete} onCancel={() => setIsOpenDelete(false)}>
				<h3>Xoá tài khoản này</h3>
				<div className='btns-container'>
					<button className='ok' onClick={() => handleDeleteAcc()}>Tiếp tục xoá</button>
					<button className='cancel' onClick={() => setIsOpenDelete(false)}>Huỷ</button>
				</div>
			</Modal>
			<Dropdown overlay={menuAction()} trigger={['click']} placement="bottomLeft">
				<Button>
					<Space>
						Quản lý
						<AiOutlineDown />
					</Space>
				</Button>
			</Dropdown>
		</div >
	)
}

export default MoreAction