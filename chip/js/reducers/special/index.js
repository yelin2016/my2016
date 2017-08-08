import { combineReducers } from 'redux';
import topic from './topic';
import activity from './activity';


var special = combineReducers({
    topic,
    activity,
});

export default special;