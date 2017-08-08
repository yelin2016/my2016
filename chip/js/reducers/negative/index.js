import { combineReducers } from 'redux';
import monitor from './monitor';
import rank from './rank';
import list from './list';
import history from './history';
import distribution from './distribution';
import trend from './trend';

var negativeReducer = combineReducers({
	monitor,
	rank,
	list,
	history,
	distribution,
	trend
});
export default negativeReducer;