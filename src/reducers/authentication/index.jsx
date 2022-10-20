import { LOGIN_SUCCESS } from "./actionTypes"
const initialState = {
	isLoggedIn: localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('isLogin')) : false,
};
export const authentication = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const newState = { isLoggedIn: true }
			return newState
		default:
			return state
	}
}