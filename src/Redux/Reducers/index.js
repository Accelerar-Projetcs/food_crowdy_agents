import { combineReducers } from '@reduxjs/toolkit';
import Cart from './Cart/index';
import FLRegistration from './FLRegistration/';
import Marketers from './Marketers/';

const rootReducer = combineReducers({
	Cart,
	Marketers,
	FLRegistration
});

export default rootReducer;
