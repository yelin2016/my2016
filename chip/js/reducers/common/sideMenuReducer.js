import * as ActionTypes from '../../actions/common/sideMenuActions';

var initialState = {
	"curPath": "",
	"curActive": ""
};

var reducer = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_CUR_PATH:
			return Object.assign({}, state, {curPath: action.path});
		case ActionTypes.SET_CUR_ACTIVE:
			return Object.assign({}, state, {curActive: action.active});
		case ActionTypes.SET_CUR_PATH_ACTIVE:
			return Object.assign({}, state, {curPath: action.path, curActive: action.active});
		default:
			return state;
	}
};

export default reducer;