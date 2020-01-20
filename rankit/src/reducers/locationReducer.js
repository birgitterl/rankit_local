import {
	GET_LOCATION,
	LOCATION_ERROR,
	UPDATE_LOCATION
} from '../actions/types';

const initialState = {
	position: {
		latitude: 0,
		longitude: 0
	},
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_LOCATION:
			return {
				...state,
				position: payload
			};
		default:
			return state;
	}
}
