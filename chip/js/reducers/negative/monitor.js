import * as ActionTypes from '../../actions/negative/monitor';

var initialState = {
	// 总舆情计数
	total: {
		totalOpinion: 0,
		totalFocus: 0,
		totalBrowseCount: 0,
		totalReplyCount: 0,
		trend: ''
	},
	// 分级舆情计数
	level: [],
	// 分类统计数据
	category: [
		{typeLabel: "品牌", typeLabelList: []},
		{typeLabel: "产品", typeLabelList: []},
		{typeLabel: "功能", typeLabelList: []},
		{typeLabel: "服务", typeLabelList: []}
	],
	// 走势图数据
	trend: [],
	trendStamp: 0,

	Loading: false,
	error: false,
	msg: "",

	// 弹出框状态
	popupStatus: {
		show: false,
		type: 'level',	//level brand
		subType: '品牌',
		level: 'red',
		brand: '长虹',
		loading: false,
		msg: '',
		cancelId: 0,
		cancelMsg: ''
	},
	popupData: []
};

// 设置弹出窗口的参数
function popupStatus (state, action) {
	var tmpStatus = Object.assign({}, state.popupStatus, action.params);
	return Object.assign({}, state, {popupStatus: tmpStatus, popupData: []})
}

// 处理弹出窗口数据请求状态
function fetchPopupProcess (state, action) {
	var tmpStatus;
	switch (action.status) {
		case 0:
			tmpStatus = Object.assign({}, state.popupStatus, {loading: true});
			return Object.assign({}, state, {popupStatus: tmpStatus});
		case 1:
			tmpStatus = Object.assign({}, state.popupStatus, {msg: action.msg, loading: false});
			return Object.assign({}, state, {popupStatus: tmpStatus});
		case 200:
			tmpStatus = Object.assign({}, state.popupStatus, {loading: false});
			return Object.assign({}, state, {popupData: action.data, popupStatus: tmpStatus});
		default:
			return state;
	}
}

// 弹框中解除一条预警数据。
// status为pending的事件是由tips提示框分派的，用于点击确定之后设置准备要解除预警的数据的id。
function cancelWarning (state, action) {
	var tmpStatus;
	switch (action.status) {
		case 'pending':
			tmpStatus = Object.assign({}, state.popupStatus, {cancelId: action.id, cancelMsg: ''});
			return Object.assign({}, state, {popupStatus: tmpStatus});
		case 1:
			tmpStatus = Object.assign({}, state.popupStatus, {cancelId: 0, cancelMsg: '解除预警出错'});
			return Object.assign({}, state, {popupStatus: tmpStatus});
		case 200:
			return cancelWarningSucc(state, action);
		default:
			return state;
	}
}
// 解除预警的数据成功，清除要解除数据的id，剔除popupData中已解除预警的数据(后期：并添加一条新的数据)。
function cancelWarningSucc (state, action) {
	var i, tmpStatus, tmp = [];
	for (i = 0; i < state.popupData.length; i++) {
		if (state.popupData[i].objectId != action.id) {
			tmp.push(state.popupData[i]);
		}
	}
	tmpStatus = Object.assign({}, state.popupStatus, {cancelId:0, cancelMsg: ''});
	return Object.assign({}, state, {popupData: tmp, popupStatus: tmpStatus});
}

// reducer
var board = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.FETCH_NEGATIVE_TOTAL_NUM:
			return Util.fetchProcess(state, action, {data: 'total'});

		case ActionTypes.FETCH_NEGATIVE_LEVEL:
			return Util.fetchProcess(state, action, {data: 'level'});
			// return fetchLevelProcess(state, action);

		case ActionTypes.FETCH_NEGATIVE_CATEGORY:
			return Util.fetchProcess(state, action, {data: 'category'});
			// return fetchCategoryProcess(state, action);

		case ActionTypes.FETCH_NEGATIVE_TREND:
			return Util.fetchProcess(state, action, {data: 'trend', stamp: 'trendStamp'});
			// return fetchTrendProcess(state, action);

		case ActionTypes.TOGGLE_NEGATIVE_POPUP:
			return popupStatus(state, action);

		case ActionTypes.FETCH_NEGATIVE_POPUP_DATA:
			return fetchPopupProcess(state, action);

		case ActionTypes.CANCEL_NEGATIVE_WARNING:
			return cancelWarning(state, action);

		default:
			return state;
	}
};

export default board;