import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import locationReducer from './locationReducer';

export default combineReducers({ userReducer, alertReducer });
