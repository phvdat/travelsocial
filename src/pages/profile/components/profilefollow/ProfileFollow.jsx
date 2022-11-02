import React from 'react'
import { Col, Dropdown, Menu, Row } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import './profileFollow.scss'
export default function ProfileFollow(props) {
	const { typetab } = props
	const data = [
		{
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
			name: "Nguyễn Văn A"
		},
		{
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
			name: "Nguyễn Văn A"
		},
		{
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
			name: "Nguyễn Văn A"
		},
		{
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
			name: "Nguyễn Văn A"
		},
		{
			imgUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
			name: "Nguyễn Văn A"
		}
	];
	const menu = (
		<Menu
			items={[
				{
					label: <a onClick={() => { }}>Bỏ theo dõi</a>,
					key: '0',
				},
			]}
		/>
	)
	return (
		<div className='profile-follow-content'>
			<Row>
				{data.map((ele, idx) => {
					return (
						<Col xs={24} sm={12} key={idx} justify="center">
							<div className="container-item-friends">
								<div>
									<img alt="avata" src={ele.imgUrl} />
									<span>{ele.name}</span>

								</div>
								{typetab==='following' ?
									<Dropdown
										overlay={menu}
										trigger={["click"]}
										placement="bottomRight"
									>
										<BsThreeDotsVertical className="dropdown-btn" />
									</Dropdown>
									:
									<></>
								}

							</div>
						</Col>
					);
				})}
			</Row>
		</div>
	)
}
