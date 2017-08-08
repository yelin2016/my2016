import * as ActionTypes from '../../actions/negative/trend';
var initialState ={
	data: [],
	stamp: 0
};

// reducer
var trend = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.NEGATIVE_TREND_DATA:
			// return Object.assign({}, state, {data: action.data, stamp: new Date().getTime()});
			return Util.fetchProcess(state, action, {data: 'data', stamp: 'stamp'});
		default:
			return state;
	}
};
export default trend;