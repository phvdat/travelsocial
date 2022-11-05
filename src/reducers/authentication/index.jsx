import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_CURRENT_USER } from "./actionTypes"
const initialState = {
	isLoggedIn: localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('isLogin')) : false,
	currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {},
};
export const authentication = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const newState = { ...state, isLoggedIn: true }
			return newState
		case LOGOUT_SUCCESS:
			return { isLoggedIn: false, currentUser: {} }
		case SET_CURRENT_USER:
			return { ...state, currentUser: action.payload }

		default:
			return state
	}
}