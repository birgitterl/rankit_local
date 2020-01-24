import axios from 'axios';
import {
	GET_USER,
	GET_USERS,
	DELETE_USER,
	DELETE_USERS,
	USER_ERROR,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS,
	UPDATE_VOTE,
	FETCH_LOCATION,
	UPDATE_LOCATION,
	LOCATION_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertActions';

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Register a user
export const registerUser = ({ name }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name });

	try {
		const res = await axios.post('api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		await dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Logout /& Delete User
export const logout = () => async dispatch => {
	try {
		await axios.delete(`/api/users/me`);

		dispatch({
			type: LOGOUT_SUCCESS
		});
		dispatch(setAlert('Your user has been permanently deleted', 'danger'));
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get all Users
export const getUsers = () => async dispatch => {
	try {
		const res = await axios.get('/api/users');
		dispatch({
			type: GET_USERS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// TODO: check if still needed --> not used to load user in landing page or players view
// Get current user
export const getCurrentUser = () => async dispatch => {
	try {
		const res = await axios.get('/api/users/:id');
		dispatch({
			type: GET_USER,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//update votes
export const updateVote = () => async dispatch => {
	try {
		const res = await axios.put(`api/users/points`);
		dispatch({
			type: UPDATE_VOTE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// update Location
export const updateLocation = (
	{ latitude },
	{ longitude }
) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ latitude, longitude });

	try {
		const res = await axios.put('api/users/location', body, config);
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

// TODO: check if still neede --> else check if route is needed?
// Get user by ID
export const getUser = id => dispatch => {
	axios.get(`/api/users/${id}`).then(res =>
		dispatch({
			type: GET_USER,
			payload: id
		})
	);
};

// TODO: check if still needed after logout of admin?
// delete all users
export const deleteUsers = () => async dispatch => {
	if (window.confirm('Are you sure? All users will be permanently deleted')) {
		try {
			await axios.delete('api/users');
			dispatch({
				type: DELETE_USERS
			});
			dispatch(setAlert('All users have been permanently deleted'));
		} catch (err) {
			dispatch({
				type: USER_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};

// TODO: add auth to route
// Delete a user by id
export const deleteUser = id => async dispatch => {
	if (window.confirm('Are you sure? You user will be permanently deleted')) {
		try {
			await axios.delete(`/api/users/${id}`);

			dispatch({
				type: DELETE_USER
			});
			dispatch(setAlert('Your user has been permanently deleted'));
		} catch (err) {
			dispatch({
				type: USER_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};

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
