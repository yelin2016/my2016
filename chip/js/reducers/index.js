import { combineReducers } from 'redux';
import common from './common';
import board from './board';
import negative from './negative';
import digging from './digging';
import hotspot from './hotspot';
import special from './special';

var appReducer = combineReducers({
	common,
	board,
	negative,
	digging,
    hotspot,
    special
});

export default appReducer;