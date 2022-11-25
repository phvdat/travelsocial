import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { useSelector } from 'react-redux';
import TableRanking from 'pages/tableranking/TableRanking';
import Dialog from 'components/dialog/Dialog';
import { useState } from 'react';
import SwiperMedia from 'components/post/swiperMedia/SwiperMedia';

function App() {
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	const [visible, setVisible] = useState(false)
	const dataMedia = [
		{
			type: 'image',
			url: 'https://picsum.photos/200/300'
		},
		{
			type: 'image',
			url: 'https://picsum.photos/1200/1300'
		}
		, {
			type: 'image',
			url: 'https://picsum.photos/200/300'
		}
		, {
			type: 'video',
			url: 'https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_7MB_MP4.mp40'
		}
	]
	return (
		<div style={{ height: '2000px' }}>
			container
			<button onClick={() => setVisible(true)}>Toggle</button>
			<Dialog visible={visible} onClose={() => setVisible(false)}>
				<SwiperMedia dataMedia={dataMedia} />
			</Dialog>
		</div >
		// <BrowserRouter>
		// 	<Routes>
		// 		<Route path='/' element={<Navigate to='/home' replace />} />
		// 		<Route path='/'>
		// 			<Route path=":tab" element={<Home />} />
		// 		</Route>
		// 		<Route path="/register" element={<Register />} />
		// 		<Route path="/profile">
		// 			<Route path=":userId">
		// 				<Route path=":tab" element={isLoggedIn ? <Profile /> : <Navigate to="/home" replace={true} />} />
		// 			</Route>
		// 		</Route>
		// 		<Route path='*' element={<Navigate to='/home' replace />} />
		// 	</Routes>
		// </BrowserRouter>
	);
}

export default App;


