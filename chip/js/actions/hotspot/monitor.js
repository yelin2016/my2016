export const FETCH_MONITOR_TABLE_DATA = 'FETCH_MONITOR_TABLE_DATA';
export const MONITOR_TABLE_QUERY = 'MONITOR_TABLE_QUERY';
export const HOTSPOT_MONITOR_PAPER = 'HOTSPOT_MONITOR_PAPER';
export const FETCH_HOTSPOT_MONITOR_LEVEL = 'FETCH_HOTSPOT_MONITOR_LEVEL';
export const FETCH_HOTSPOT_MONITOR_TYPE = 'FETCH_HOTSPOT_MONITOR_TYPE';
export const FETCH_HOTSPOT_MONITOR_TYPESITE = 'FETCH_HOTSPOT_MONITOR_TYPESITE';
export const FETCH_HOTSPOT_MONITOR_SUBSITE = 'FETCH_HOTSPOT_MONITOR_SUBSITE';
export const FETCH_HOTSPOT_MONITOR_TYPELABEL = 'FETCH_HOTSPOT_MONITOR_TYPELABEL';
export const FETCH_HOTSPOT_MONITOR_SUBLABEL = 'FETCH_HOTSPOT_MONITOR_SUBLABEL';
export const HOTSPOT_MONITOR_MODIFY = 'HOTSPOT_MONITOR_MODIFY';


// 修改一条舆情的类型
export function modify (param, status) {
	return {
		type: HOTSPOT_MONITOR_MODIFY,
		param: param,
		status: status
	};
}
// 发送修改请求
export function modifyReq (param) {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/hot/updateHotpointType";
		
		dispatch({
			type: HOTSPOT_MONITOR_MODIFY,
			status: 'pending',
			msg: ''
		});
		
		$.ajax({
			"url": url,
			"type": 'get',
			"data": param
		})
		.done(function(re) {
			dispatch({
				type: HOTSPOT_MONITOR_MODIFY,
				status: 200,
				data: re,
				msg: ''
			});
		})
		.fail(function() {
			dispatch({
				type: HOTSPOT_MONITOR_MODIFY,
				status: 1,
				msg: 'error'
			});
		});
	}
}
// 获取热点舆情等级
export function getLevel () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getWarningLevelList.do";
		Util.fetch(dispatch,  url, FETCH_HOTSPOT_MONITOR_LEVEL, {warningTypeId: 1});
	};	
};
// 获取热点舆情类型
export function getType () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getDictHotpointType.do";
		Util.fetch(dispatch, url, FETCH_HOTSPOT_MONITOR_TYPE);
	};	
};
// 获取预警网站类型
export function getSite () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getSourceTypeList.do";
		Util.fetch(dispatch, url, FETCH_HOTSPOT_MONITOR_TYPESITE);
	};	
};
// 获取所有类型的网站
export function getSubSite () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getSourceList.do";
		Util.fetch(dispatch, url, FETCH_HOTSPOT_MONITOR_SUBSITE);
	};	
};
// 获取标签类型
export function getTypeLabel () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getTypeLabelList.do";
		Util.fetch(dispatch, url, FETCH_HOTSPOT_MONITOR_TYPELABEL);
	};
};
// 获取所有类型的标签
export function getSubTypeLabel () {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/dict/getSubtypeLabelList.do";
		Util.fetch(dispatch, url, FETCH_HOTSPOT_MONITOR_SUBLABEL);
	};
};
// 设置查询参数
export function monitor_query(condition,refresh) {
	return {
		type: MONITOR_TABLE_QUERY,
		condition: condition,
		refresh: refresh
	};
};
// 修改页码
export function monitor_paper(paper) {
	return {
		type: HOTSPOT_MONITOR_PAPER,
		paper: paper
	};
};
// 获取列表数据
export function getTableData (condition,currentpaper) {
	return function (dispatch) {
		dispatch({
			type: FETCH_MONITOR_TABLE_DATA,
			status: 0,
		});
		$.ajax({
			// "url":"./json/hotspot_monitor_table.json",
			"url": ApiDomain + "/opinion/rest/hot/getHotpointTable.do",
			"type": "get",
			"data": condition
		})
		.done(function(re) {
			dispatch({
				type: FETCH_MONITOR_TABLE_DATA,
				status: re.status,
				data: re.data,
				totalpaper:re.pageCount
			});
		})
		.fail(function() {
			dispatch({
				type: FETCH_MONITOR_TABLE_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}