import * as ActionTypes from '../../actions/board';

var initialState = {
	// 总舆情计数
	total: {
		totalOpinion: 0,
		totalHeat: 0,
		totalBrowseCount: 0,
		totalReplyCount: 0
	},
	// 分级舆情计数
	level: [],
	// 长虹负面舆情走势
	chiqTrend: [],
	chiqTrendStamp: 0,
	// 品牌热点舆情计数
	brandData: [],
	// 论坛舆情走势
	forumTrend: [],
	forumTrendStamp: 0,

	loading: false,
	error: false,
	msg: "",

	// 弹框状态
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

// 处理总舆情数据请求状态
function fetchTotalProcess (state, action) {
	switch (action.status) {
		case 0: 
			return state;
		case 1: 
			return state;
		case 200:
			return Object.assign({}, state, {total: action.data});
		default:
			return state;
	}
}

// 处理分级舆情数据请求状态
function fetchLevelProcess (state, action) {
	switch (action.status) {
		case 0: 
			return state;
		case 1: 
			return state;
		case 200:
			return Object.assign({}, state, {level: action.data});
		default:
			return state;
	}	
}

// 处理长虹负面舆情走势数据情况状态
function fetchChiqTrendProcess (state, action) {
	switch (action.status) {
		case 0: 
			return state;
		case 1: 
			return state;
		case 200:
			return Object.assign({}, state, {chiqTrend: action.data, chiqTrendStamp: new Date().getTime()});
		default:
			return state;
	}
}

// 处理论坛负面舆情走势数据情况状态
function fetchForumTrendProcess (state, action) {
	switch (action.status) {
		case 0: 
			return state;
		case 1: 
			return state;
		case 200:
			return Object.assign({}, state, {forumTrend: action.data, forumTrendStamp: new Date().getTime()});
		default:
			return state;
	}
}

// 处理品牌舆情统计 
function fetchBrandDataProcess (state, action) {
	switch (action.status) {
		case 0: 
			return state;
		case 1: 
			return state;
		case 200:
			return Object.assign({}, state, {brandData: action.data});
		default:
			return state;
	}	
}

// reducer
var board = function (state = initialState, action) {
	switch (action.type) {
		// case ActionTypes.FETCH_BOARD_DATA:
		// 	return fetchProcess(state, action);

		case ActionTypes.FETCH_BOARD_TOTAL_NUM:
			return fetchTotalProcess(state, action);

		case ActionTypes.FETCH_BOARD_LEVEL:
			return fetchLevelProcess(state, action);

		case ActionTypes.FETCH_BOARD_CHIQ_TREND:
			return fetchChiqTrendProcess(state, action);

		case ActionTypes.FETCH_BOARD_FORUM_TREND:
			return fetchForumTrendProcess(state, action);

		case ActionTypes.FETCH_BOARD_FORUM_DATA:
			return fetchBrandDataProcess(state, action);

		// case ActionTypes.FETCH_BOARD_POPUP_DATA:
		// 	return fetchPopupProcess(state, action);

		// case ActionTypes.TOGGLE_BOARD_POPUP:
		// 	return popupStatus(state, action);

		// case ActionTypes.CANCEL_BOARD_WARNING:
		// 	return cancelWarning(state, action);

		default:
			return state;
	}
};

export default board;