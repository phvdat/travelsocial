import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_CURRENT_USER } from "./actionTypes"
const initialState = {
	isLoggedIn: localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('isLogin')) : false,
	userInfo: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : {},
};
export const authentication = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const newState = { isLoggedIn: true }
			return newState
		case LOGOUT_SUCCESS:
			return { isLoggedIn: false , userInfo: {}}
		case SET_CURRENT_USER:
			return action.payload
		
		default:
			return state
	}
}