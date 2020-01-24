import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	GET_USERS,
	GET_USER,
	FETCH_LOCATION,
	UPDATE_VOTE,
	USER_ERROR,
	LOGOUT_SUCCESS,
	LOCATION_ERROR,
	UPDATE_LOCATION
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	users: [],
	authLoading: true,
	userLoading: true,
	isAuthenticated: null,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				authLoading: false,
				user: payload
			};

		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				authLoading: false
			};

		case GET_USERS:
			return {
				...state,
				users: payload,
				userLoading: false
			};

		case GET_USER:
		case FETCH_LOCATION:
		case UPDATE_VOTE:
		case UPDATE_LOCATION:
			return {
				...state,
				user: payload,
				userLoading: false
			};

		case USER_ERROR:
			return {
				...state,
				error: payload,
				userLoading: false,
				user: null
			};

		case LOCATION_ERROR:
			return {
				...state,
				error: payload
			};

		case REGISTER_FAIL:
		case LOGOUT_SUCCESS:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				authLoading: false
			};

		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				authLoading: false
			};

		default:
			return state;
	}
}
