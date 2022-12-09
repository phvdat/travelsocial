import './LoadingStyle.scss'
import React from 'react'
/**
 * position: "center-loading" | ""
 */
export default function Loading(props) {
	const { position } = props
	return (
		<div className={position} >
			<div className="loader">
			</div>
		</div >
	)
}
