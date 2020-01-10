import axios from 'axios';
import {
	ADD_USER,
	DELETE_USER,
	DELETE_USERS,
	GET_USER,
	GET_USERS,
	USERS_LOADING
} from './types';
import { setAlert } from './alertActions';

//TODO add updateVote and updateLocation methods

export const getUsers = () => dispatch => {
	dispatch(setUsersLoading());
	axios.get('/api/users').then(res =>
		dispatch({
			type: GET_USERS,
			payload: res.data
		})
	);
};

export const getUser = id => dispatch => {
	axios.get(`/api/users/${id}`).then(res =>
		dispatch({
			type: GET_USER,
			payload: id
		})
	);
};

export const addUser = user => async dispatch => {
	try {
		const res = await axios.post('api/users/user', user);
		dispatch({
			type: ADD_USER,
			payload: res.data
		});
		dispatch(setAlert('User added', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

export const deleteUser = id => dispatch => {
	axios.delete(`/api/users/${id}`).then(res =>
		dispatch({
			type: DELETE_USER,
			payload: id
		})
	);
};

export const deleteUsers = () => dispatch => {
	axios.delete('api/users').then(res =>
		dispatch({
			type: DELETE_USERS,
			payload: res.data
		})
	);
};

export const setUsersLoading = () => {
	return {
		type: USERS_LOADING
	};
};
