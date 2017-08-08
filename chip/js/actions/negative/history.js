export const NEGATIVE_HISTORY_QUERY = 'NEGATIVE_HISTORY_QUERY';
export const NEGATIVE_HISTORY_PAPER = 'NEGATIVE_HISTORY_PAPER';
export const FETCH_NEGATIVE_HISTORY_WLEVER = 'FETCH_NEGATIVE_HISTORY_WLEVER';
export const FETCH_NEGATIVE_HISTORY_SOURCE_TYPEId = 'FETCH_NEGATIVE_HISTORY_SOURCE_TYPEId';
export const FETCH_NEGATIVE_HISTORY_SOURCE = 'FETCH_NEGATIVE_HISTORY_SOURCE';
export const FETCH_NEGATIVE_HISTORY_TYPELABEL_LIST = 'FETCH_NEGATIVE_HISTORY_TYPELABEL_LIST';
export const FETCH_NEGATIVE_HISTORY_SUBTYPELABEL = 'FETCH_NEGATIVE_HISTORY_SUBTYPELABEL';
export const FETCH_NEGATIVE_HISTORY_DATA ='FETCH_NEGATIVE_HISTORY_DATA';

export function history_query(condition,refresh) {
	return {
		type: NEGATIVE_HISTORY_QUERY,
		condition: condition
	};
};
export function history_paper(paper) {
	return {
		type: NEGATIVE_HISTORY_PAPER,
		paper: paper
	};
};
// 获取负面舆情级别
export function getHistoryWaringLevel () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getWarningLevelList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_HISTORY_WLEVER, {warningTypeId: 0});
	};
};
// 获取网站类型
export function getHistorySourceTypeId () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getSourceTypeList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_HISTORY_SOURCE_TYPEId);
	};
};
// 获取所有类型的网站
export function getSourceSite () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getSourceList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_HISTORY_SOURCE);
	};
};
// 获取标签类型
export function getTypeLabelList () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getTypeLabelList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_HISTORY_TYPELABEL_LIST);
	};
};
// 获取所有类型的标签
export function getSubTypeLabel () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getSubtypeLabelList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_HISTORY_SUBTYPELABEL);
	};
};
//根据选择的条件发送接口请求，获取列表数据
export function getHistoryData (param) {
	return function (dispatch) {
		dispatch({
			type: FETCH_NEGATIVE_HISTORY_DATA,
			status: 0,
		});
		$.ajax({
			"url":ApiDomain+"/opinion/rest/negative/getNegativeHistoryTable.do",
			"type": "get",
			data:param
		})
		.done(function(re) {
			dispatch({
				type: FETCH_NEGATIVE_HISTORY_DATA,
				status: re.status,
				msg: re.msg,
				data: re.data,
				pageCount:re.pageCount
			});
		})
		.fail(function() {
			dispatch({
				type: FETCH_NEGATIVE_HISTORY_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}