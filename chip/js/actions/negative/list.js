export const NEGATIVE_LIST_QUERY = 'NEGATIVE_LIST_QUERY';
export const NEGATIVE_LIST_PAPER = 'NEGATIVE_LIST_PAPER';
export const FETCH_NEGATIVE_LIST_WLEVER = 'FETCH_NEGATIVE_LIST_WLEVER';
export const FETCH_NEGATIVE_LIST_SOURCE_TYPEId = 'FETCH_NEGATIVE_LIST_SOURCE_TYPEId';
export const FETCH_NEGATIVE_LIST_SOURCE  = 'FETCH_NEGATIVE_LIST_SOURCE ';
export const FETCH_NEGATIVE_LIST_TYPELABEL_LIST = 'FETCH_NEGATIVE_LIST_TYPELABEL_LIST';
export const FETCH_NEGATIVE_LIST_SUBTYPELABEL = 'FETCH_NEGATIVE_LIST_SUBTYPELABEL';
export const FETCH_NEGATIVE_LIST_DATA ='FETCH_NEGATIVE_LIST_DATA';
export const FETCH_NEGATIVE_LIST_HANDLEWARNING = 'FETCH_NEGATIVE_LIST_HANDLEWARNING';
export const FETCH_NEGATIVE_LIST_PRE_HANDLEWARNING ='FETCH_NEGATIVE_LIST_PRE_HANDLEWARNING';
export const NEGATIVE_LIST_PRESET_PARAM = 'NEGATIVE_LIST_PRESET_PARAM';


export function list_pre_handleWarning(objectIds){
	return {
		type: FETCH_NEGATIVE_LIST_PRE_HANDLEWARNING,
		objectIds: objectIds
	};
};
export function list_handleWarning(objectIds,refresh) {
	return function (dispatch) {
		$.ajax({
			"url":ApiDomain+"/opinion/rest/negative/handleWarning?objectIds="+objectIds,
			"type": "get",
			dataType:"text"
		})
		.done(function(re) {
			dispatch({
				type: FETCH_NEGATIVE_LIST_HANDLEWARNING,
				status: 200,
				remsg:re
			});
		})
		.fail(function(re) {
			dispatch({
				type: FETCH_NEGATIVE_LIST_HANDLEWARNING,
				status: 1,
				remsg:re
			});
		});
	};
};
export function list_query(condition,refresh) {
	return {
		type: NEGATIVE_LIST_QUERY,
		condition: condition
	};
};
export function list_paper(paper) {
	return {
		type: NEGATIVE_LIST_PAPER,
		paper: paper
	};
};

// 获取负面舆情级别
export function getListWaringLevel () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getWarningLevelList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_LIST_WLEVER, {warningTypeId: 0});
	};
};
// 获取网站类型
export function getListSourceTypeId () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getSourceTypeList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_LIST_SOURCE_TYPEId);
	};
};
// 获取所有类型的网站
export function getSourceSite () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getSourceList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_LIST_SOURCE);
	};
};
// 获取标签类型
export function getTypeLabelList () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getTypeLabelList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_LIST_TYPELABEL_LIST);
	};
};
// 获取所有类型的标签
export function getSubTypeLabel () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/dict/getSubtypeLabelList.do';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_LIST_SUBTYPELABEL);
	};
};
//根据选择的条件发送接口请求，获取列表数据
export function getListData (param) {
	return function (dispatch) {
		dispatch({
			type: FETCH_NEGATIVE_LIST_DATA,
			status: 0,
		});
		$.ajax({
			"url":ApiDomain+"/opinion/rest/negative/getNegativeWarningTable.do",
			"type": "get",
			data: param
		})
		.done(function(re) {
			dispatch({
				type: FETCH_NEGATIVE_LIST_DATA,
				status: re.status,
				msg: re.msg,
				data: re.data,
				pageCount:re.pageCount
			});
		})
		.fail(function() {
			dispatch({
				type: FETCH_NEGATIVE_LIST_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}