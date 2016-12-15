import testPageReducer from './testPage.js';
import userReducer from './user';
import { combineReducers } from 'redux';

export default combineReducers({
	testPageReducer, userReducer
})