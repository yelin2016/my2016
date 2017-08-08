import * as ActionTypes from '../../actions/digging/forum';

// 查询时间段，默认七天
var end = new Date();
var start = new Date(end - 6*24*3600*1000);
end = end.getFullYear() + '-' + (end.getMonth()+101+'').substring(1) + '-' + (end.getDate()+100+'').substring(1);
start = start.getFullYear() + '-' + (start.getMonth()+101+'').substring(1) + '-' + (start.getDate()+100+'').substring(1);

// 品牌图片映射
var logoMap = {
	'长虹':'./image/logo3.png',
	'奇珀':'./image/logo2.png',
	'ZNDS':'./image/logo2.png',
	'小米':'./image/logo2.png',
	'乐视':'./image/logo2.png',
	'创维':'./image/logo2.png',
	'TCL':'./image/logo2.png',
	'海信':'./image/logo2.png'
};

var initialState = {
	// 选中的论坛
	selBbs: {},
	duration: {
		start: start,
		end: end
	},
	query: false,
	// 可以对比的论坛列表
	bbsList: [],
	timestamp: 0,
	// 对比中状态标志
	comparing: false,
	// 选择的要对比的板块
	compareConditons: {
		left: [],
		right: []
	},
	// 板块对比顶部统计数据
	compareCountData: {
		left: {},
		right: {},
		loading: false,
		timestamp: 0
	},
	// 板块对比柱状图数据
	compareBarData: {
		left: [],
		right: [],
		loading: false,
		timestamp: 0
	},
	// 板块对比连线图数据
	compareLineData: {
		left: [],
		right: [],
		loading: false,
		timestamp: 0
	},
	// 板块对比列表数据
	compareListData: {
		left: [],
		right: [],
		loading: false,
		timestamp: 0
	},
	// 对比详情中的参数筛选条件
	barFilter: 1,
	lineFilter: 1,
	top10Filter: 1
};

// 处理对比论坛列表请求状态
function fetchForumProcess (state, action) {
	var bbs;
	switch (action.status) {
		case 1:
			return state;
		case 200:
			bbs = getBbs(action.data);
			return Object.assign({}, state, {bbsList: bbs.bbsList, selBbs: bbs.selBbs, timestamp: new Date().getTime()});
		default:
			return state;
	}
}
// 生成论坛列表、默认选择状态
function getBbs (data) {
	var i, bbsList = [], selBbs = {};
	for (i = 0; i < data.length; i++) {
		bbsList.push({
			info: data[i].sourceName,
			key: data[i].sourceId,
			logo: logoMap[data[i].sourceName]
		});
		// 默认将长虹放到第一个，并选中
		if (data[i].sourceName == "长虹") {
			selBbs[data[i].sourceId] = true;
			bbsList.unshift(bbsList.pop());
		}
	}
	return {
		bbsList: bbsList,
		selBbs: selBbs
	};
}

// 处理对比详情统计数据请求状态
function fetchCountProcess (state, action) {
	var tmpStatus;
	switch (action.status) {
		case 0:
			tmpStatus = Object.assign({}, state.compareCountData, {loading: true});
			return Object.assign({}, state, {compareCountData: tmpStatus});
		case 1:
			tmpStatus = Object.assign({}, state.compareCountData, {loading: false});
			return Object.assign({}, state, {compareCountData: tmpStatus});
		case 200:
			tmpStatus = {loading: false, timestamp: new Date().getTime()};
			tmpStatus[action.side] = action.data;
			tmpStatus = Object.assign({}, state.compareCountData, tmpStatus);
			return Object.assign({}, state, {compareCountData: tmpStatus});
		default:
			return state;
	}
}

// 处理对比详情柱状图数据请求状态
function fetchBarProcess (state, action) {
	var tmpStatus;
	switch (action.status) {
		case 0:
			tmpStatus = Object.assign({}, state.compareBarData, {loading: true});
			return Object.assign({}, state, {compareBarData: tmpStatus});
		case 1:
			tmpStatus = Object.assign({}, state.compareBarData, {loading: false});
			return Object.assign({}, state, {compareBarData: tmpStatus});
		case 200:
			tmpStatus = {loading: false, timestamp: new Date().getTime()};
			tmpStatus[action.side] = action.data;
			tmpStatus = Object.assign({}, state.compareBarData, tmpStatus);
			return Object.assign({}, state, {compareBarData: tmpStatus});
		default:
			return state;
	}
}

// 处理对比详情连线图数据请求状态
function fetchLineProcess (state, action) {
	var tmpStatus;
	switch (action.status) {
		case 0:
			tmpStatus = Object.assign({}, state.compareLineData, {loading: true});
			return Object.assign({}, state, {compareLineData: tmpStatus});
		case 1:
			tmpStatus = Object.assign({}, state.compareLineData, {loading: false});
			return Object.assign({}, state, {compareLineData: tmpStatus});
		case 200:
			tmpStatus = {loading: false, timestamp: new Date().getTime()};
			tmpStatus[action.side] = action.data;
			tmpStatus = Object.assign({}, state.compareLineData, tmpStatus);
			return Object.assign({}, state, {compareLineData: tmpStatus});
		default:
			return state;
	}
}

// 处理对比详情列表数据请求状态
function fetchListProcess (state, action) {
	var tmpStatus;
	switch (action.status) {
		case 0:
			tmpStatus = Object.assign({}, state.compareListData, {loading: true});
			return Object.assign({}, state, {compareListData: tmpStatus});
		case 1:
			tmpStatus = Object.assign({}, state.compareListData, {loading: false});
			return Object.assign({}, state, {compareListData: tmpStatus});
		case 200:
			tmpStatus = {loading: false, timestamp: new Date().getTime()};
			tmpStatus[action.side] = action.data;
			tmpStatus = Object.assign({}, state.compareListData, tmpStatus);
			return Object.assign({}, state, {compareListData: tmpStatus});
		default:
			return state;
	}
}

// reducer
var forum = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.DIGGING_FORUM_GET_FORUMS:
			return fetchForumProcess(state, action);

		case ActionTypes.DIGGING_FORUM_QUERY:
			return Object.assign({}, state, {selBbs: action.selBbs, duration: action.duration, query: true});

		case ActionTypes.DIGGING_FORUM_QUERIED:
			return Object.assign({}, state, {query: false});

		case ActionTypes.DIGGING_FORUM_SELBBS:
			return Object.assign({}, state, {selBbs: action.selBbs, comparing: false});

		case ActionTypes.DIGGING_FORUM_FETCH_COUNT:
			return fetchCountProcess(state, action);

		case ActionTypes.DIGGING_FORUM_FETCH_BAR:
			return fetchBarProcess(state, action);

		case ActionTypes.DIGGING_FORUM_FETCH_LINE:
			return fetchLineProcess(state, action);

		case ActionTypes.DIGGING_FORUM_FETCH_LIST:
			return fetchListProcess(state, action);

		case ActionTypes.DIGGING_FORUM_COMPARE:
			return Object.assign({}, state, {comparing: action.comparing, compareConditons: action.conditions});

		case ActionTypes.DIGGING_FORUM_RESET:
			return Object.assign({}, state, {
				bbsList: [],
				timestamp: 0,
				comparing: false,
				compareConditons: {
					left: [],
					right: []
				}
			});

		case ActionTypes.DIGGING_FORUM_DETAIL_FILTER:
			return Object.assign({}, state, action.param);

		default:
			return state;
	}
};

export default forum;
