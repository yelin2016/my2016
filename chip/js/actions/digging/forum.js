export const DIGGING_FORUM_GET_FORUMS = 'DIGGING_FORUM_GET_FORUMS';
export const DIGGING_FORUM_QUERY = 'DIGGING_FORUM_QUERY';
export const DIGGING_FORUM_SELBBS = 'DIGGING_FORUM_SELBBS';
export const DIGGING_FORUM_QUERIED = 'DIGGING_FORUM_QUERIED';
export const DIGGING_FORUM_FETCH_COUNT = 'DIGGING_FORUM_FETCH_COUNT';
export const DIGGING_FORUM_FETCH_BAR = 'DIGGING_FORUM_FETCH_BAR';
export const DIGGING_FORUM_FETCH_LINE = 'DIGGING_FORUM_FETCH_LINE';
export const DIGGING_FORUM_FETCH_LIST = 'DIGGING_FORUM_FETCH_LIST';
export const DIGGING_FORUM_COMPARE = 'DIGGING_FORUM_COMPARE';
export const DIGGING_FORUM_RESET = 'DIGGING_FORUM_RESET';
export const DIGGING_FORUM_DETAIL_FILTER = 'DIGGING_FORUM_DETAIL_FILTER';

// 获取需要对比的论坛
export function getForums () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getSourceByType.do?sourceTypeId=3";
		Util.fetch(dispatch, url, DIGGING_FORUM_GET_FORUMS);
	};
}

// 点击查询按钮时，设置查询参数，刷新环形图数据
export function setQueryParam (param) {
	return {
		type: DIGGING_FORUM_QUERY,
		duration: param.duration,
		selBbs: param.selBbs
	};
};

// 环形图数据刷新，清除query标志
export function clearQueryFlag () {
	return {
		type: DIGGING_FORUM_QUERIED,
		query: false
	};
};

// 点击复选框时，设置选中的论坛
export function setSelBbs (selBbs) {
	return {
		type: DIGGING_FORUM_SELBBS,
		selBbs: selBbs
	};
};

// 获取对比统计计数数据
export function fetchCountData (param, side) {
	return function (dispatch) {
		$.ajax({
			"url": ApiDomain + '/opinion/rest/mining/getTotalSectionCount.do',
			data: param,
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: DIGGING_FORUM_FETCH_COUNT,
				status: re.status,
				msg: re.msg,
				data: re.data,
				side: side
			});
		})
		.fail(function() {
			dispatch({
				type: DIGGING_FORUM_FETCH_COUNT,
				status: 1,
				msg: 'error'
			});
		});
	};
}
// 获取对比详情柱状图数据
export function fetchBarData (param, side) {
	return function (dispatch) {
		$.ajax({
			"url": ApiDomain + '/opinion/rest/mining/getSectionCount.do',
			data: param,
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: DIGGING_FORUM_FETCH_BAR,
				status: re.status,
				msg: re.msg,
				data: re.data,
				side: side
			});
		})
		.fail(function() {
			dispatch({
				type: DIGGING_FORUM_FETCH_BAR,
				status: 1,
				msg: 'error'
			});
		});
	};
}

// 获取对比详情连线图数据
export function fetchLineData (param, side) {
	return function (dispatch) {
		$.ajax({
			"url":ApiDomain+'/opinion/rest/mining/getSectionTrend.do',
			data: param,
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: DIGGING_FORUM_FETCH_LINE,
				status: re.status,
				msg: re.msg,
				data: re.data,
				side: side
			});
		})
		.fail(function() {
			dispatch({
				type: DIGGING_FORUM_FETCH_LINE,
				status: 1,
				msg: 'error'
			});
		});
	};
}

// 获取对比详情列表数据
export function fetchListData (param, side) {
	return function (dispatch) {
		$.ajax({
			"url": ApiDomain + '/opinion/rest/mining/getBbsTop10.do',
			data: param,
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: DIGGING_FORUM_FETCH_LIST,
				status: re.status,
				msg: re.msg,
				data: re.data,
				side: side
			});
		})
		.fail(function() {
			dispatch({
				type: DIGGING_FORUM_FETCH_LIST,
				status: 1,
				msg: 'error'
			});
		});
	};
}

// 设置对比状态事件
export function setCompare (doCompare, conditions) {
	return {
		type: DIGGING_FORUM_COMPARE,
		comparing: doCompare,
		conditions: conditions
	};
};

// 重置store的对比条件，以使下次进入还是初始板块选择界面
export function resetStore () {
	return {
		type: DIGGING_FORUM_RESET
	};
};

// 设置对比详情柱状图，连线图，top10筛选参数
export function filterParam (param) {
	return {
		type: DIGGING_FORUM_DETAIL_FILTER,
		param: param
	};
};