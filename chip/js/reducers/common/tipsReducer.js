import * as ActionTypes from '../../actions/common/tips';

//tips组件在store中的初始状态，各字段意义
//show：是否显示，text：提示框内容，okAction：确定时分配的事件，cancelAction：取消时分配的事件
var initialState = {
		show: false,
		text: '确定要删除文本吗？',
		pureTip: false,
		okAction: null,
		cancelAction: null
};

var reducer = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SHOW_TIPS:
			return Object.assign({}, state, {show: true, text: action.text, okAction: action.ok, cancelAction: action.cancel, pureTip: action.pureTip});
		case ActionTypes.HIDE_TIPS:
			return Object.assign({}, state, {show: false, text: '', okAction: null, cancelAction: null});
		default:
			return state;
	}
};

export default reducer;