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

function App() {
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				{/* <Route path="/profile">
					<Route path=":tab" element={isLoggedIn ? <Profile /> : <Navigate to="/home" replace={true} />} />
				</Route> */}
				<Route path="/profile">
					<Route path=":userId">
						<Route path=":tab" element={isLoggedIn ? <Profile /> : <Navigate to="/home" replace={true} />} />
					</Route>
				</Route>
				<Route path='*' element={<Navigate to='/home' replace />} />
			</Routes>

		</BrowserRouter>
	);
}

export default App;


