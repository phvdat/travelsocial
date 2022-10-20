import './App.css';
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { useSelector } from 'react-redux';

function App() {
	
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
	console.log(isLoggedIn)
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Home />}/>
				<Route path="/register" element={<Register />}/>
				<Route path="/profile" element={<Profile />}/>
			</Routes>
		</BrowserRouter>
  );
}

export default App;


