import Backdrop from 'components/backdrop/Backdrop'
import React, { useEffect } from 'react'
import './dialog.scss'
import { AiOutlineClose } from "react-icons/ai";

export default function Dialog(props) {
	const { visible, onClose, children } = props
	useEffect(() => {
		if (visible) {
			document.documentElement.style.overflow = 'hidden';
		}
		return () => {
			document.documentElement.style.overflow = 'unset';

		};
	}, [visible]);
	const handleEsc = (event) => {
		if (event.keyCode === 27) {
			onClose();
		}
	}
	useEffect(() => {
		window.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);
	return (
		<>{
			visible ?
				<div >
					<Backdrop />
					<div className="body-dialog">
						<AiOutlineClose
							className="close-dialog"
							size="30px"
							color="white"
							onClick={() => onClose()}
						/>
						{children}
					</div>
				</div>
				: null
		}
		</>
	)
}
