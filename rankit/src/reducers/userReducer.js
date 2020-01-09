import {
	ADD_USER,
	DELETE_USER,
	GET_USERS,
	USERS_LOADING
} from '../actions/types';

const initialState = {
	users: [],
	loading: false
};
//TODO add case UPDATE_VOTE and UPDATE_LOCATION
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};
		case ADD_USER:
			return {
				...state,
				users: [action.payload, ...state.users]
			};
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter(user => user._id !== action.payload)
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
