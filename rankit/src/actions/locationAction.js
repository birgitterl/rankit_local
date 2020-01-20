import axios from 'axios';
import { GET_LOCATION } from './types';

// Get location
export const getLocation = () => async dispatch => {
	const geolocation = navigator.geolocation;

	const location = new Promise((resolve, reject) => {
		if (!geolocation) {
			reject(new Error('Not supported'));
		}

		geolocation.getCurrentPosition(
			position => {
				resolve(position);
			},
			() => {
				reject(new Error('Permission denied'));
			}
		);
	});
	return {
		type: GET_LOCATION,
		payload: location
	};
};
