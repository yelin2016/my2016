import { combineReducers } from 'redux';
import forum from './forum';
import brand from './brand';
import area from './area';

var diggingReducer = combineReducers({
	forum,
	brand,
	area
});

export default diggingReducer;