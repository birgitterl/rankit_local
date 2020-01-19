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
	LOGOUT,
	UPDATE_VOTE,
	UPDATE_LOCATION
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
		const res = await axios.post('api/users/user', body, config);
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

// Logout / Clear Profile
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};

// Delete a user by id
export const bla = id => async dispatch => {
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

// Get user by ID
export const getUser = id => dispatch => {
	axios.get(`/api/users/${id}`).then(res =>
		dispatch({
			type: GET_USER,
			payload: id
		})
	);
};

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

// delete all users
export const deleteUsers = () => dispatch => {
	axios.delete('api/users').then(res =>
		dispatch({
			type: DELETE_USERS,
			payload: res.data
		})
	);
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

/* update location
export const updatePosition = ({ latitude, longitude }) => async dispatch => {
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
			type: USER_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};*/
