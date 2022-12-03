import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 40,
			color: '#000',
		}}
		spin
	/>
);
export default function Loading() {

	return (
		<Spin indicator={antIcon} />
	)
}
