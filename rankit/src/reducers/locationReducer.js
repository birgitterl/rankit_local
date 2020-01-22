import { FETCH_LOCATION, LOCATION_ERROR } from '../actions/types';

const initialState = {
	location: {
		latitude: 0,
		longitude: 0
	},
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_LOCATION:
			return {
				...state,
				location: payload
			};
		case LOCATION_ERROR:
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
}
