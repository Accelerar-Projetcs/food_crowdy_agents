import { combineReducers } from '@reduxjs/toolkit';
import Cart from './Cart/index';
import FLRegistration from './FLRegistration/';

const rootReducer = combineReducers({
	Cart,
	FLRegistration
});

export default rootReducer;
