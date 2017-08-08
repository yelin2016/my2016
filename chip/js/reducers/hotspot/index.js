import { combineReducers } from 'redux';
import distribution from './distribution';
import monitor from './monitor';
import cab from './cab';

var hotspot = combineReducers({
    distribution,
    monitor,
    cab
});

export default hotspot;