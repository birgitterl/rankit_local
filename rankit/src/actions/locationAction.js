import axios from 'axios';
import { FETCH_LOCATION, LOCATION_ERROR, UPDATE_LOCATION } from './types';

// Get location
export const fetchLocation = () => async dispatch => {
	const geolocation = navigator.geolocation;

	geolocation.getCurrentPosition(position => {
		console.log(position.coords);
		dispatch({
			type: FETCH_LOCATION,
			payload: position
		});
	});
	try {
		const res = await axios.put(`api/users/location`);
		dispatch({
			type: UPDATE_LOCATION,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: LOCATION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
