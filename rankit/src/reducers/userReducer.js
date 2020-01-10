import {
	ADD_USER,
	DELETE_USER,
	GET_USERS,
	USERS_LOADING,
	USER_ERROR
} from '../actions/types';

const initialState = {
	users: [],
	user: null,
	loading: true,
	error: {},
	isAuthenticated: null
};
//TODO add case UPDATE_VOTE and UPDATE_LOCATION
export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS:
			return {
				...state,
				users: payload,
				loading: false
			};
		case ADD_USER:
			return {
				...state,
				user: payload,
				isAuthenticated: true
			};
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter(user => user._id !== action.payload)
			};
		case USER_ERROR:
			return {
				...state,
				error: payload,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case USERS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
