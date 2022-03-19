import './App.css';
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
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


