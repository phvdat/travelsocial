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
import Post from 'components/post/Post';

function App() {
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	const data = {
		"createTime": 1666186775714,
		"lastUpdateTime": 1666186775714,
		"isDeleted": false,
		"_id": "634ffe177a4e9b5784766f5c",
		"userId": "634ffb8d4d041221591b92f8",
		"title": "This is title",
		"content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		"destination": "Ho Chi Minh",
		"type": "ecotourism",
		"status": "public",
		"mediaList": [
			{
				"createTime": 1665533482379,
				"lastUpdateTime": 1665533482379,
				"isDeleted": false,
				"_id": "6346062acd3cfd5550f64939",
				"postId": "6345ffcce321cc39c2992363",
				"userId": null,
				"commentId": null,
				"type": "image",
				"link": "https://picsum.photos/id/237/500/800"
			},
			{
				"createTime": 1665533482379,
				"lastUpdateTime": 1665533482379,
				"isDeleted": false,
				"_id": "6346062acd3cfd5550f64939",
				"postId": "6345ffcce321cc39c2992363",
				"userId": null,
				"commentId": null,
				"type": "image",
				"link": "https://picsum.photos/id/27/500/800"
			}
		]
	}
	return (
		<BrowserRouter>
			<div style={{ width: '600px' }}>

				<Post data={data} />
			</div>
		</BrowserRouter>
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


