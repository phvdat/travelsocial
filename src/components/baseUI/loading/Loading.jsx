import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 40,
			color: '#ff8c01',
		}}
		spin
	/>
);
export default function Loading() {

	return (
		<div style={{ textAlign: 'center' }}>
			<Spin indicator={antIcon} />
		</div>
	)
}
