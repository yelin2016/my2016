export const FETCH_BRANDlIST_DATA ="FETCH_BRANDlIST_DATA";
export const CGH_BRAND_INDEX = "CGH_BRAND_INDEX";
export const HOTSPOT_CAB_TYPE_DATA = "HOTSPOT_CAB_TYPE_DATA";
export const HOTSPOT_CAB_SOURCE_DATA ="HOTSPOT_CAB_SOURCE_DATA";
export const FETCH_CAB_TYPELIST_DATA = "FETCH_CAB_TYPELIST_DATA";
export const FETCH_CAB_WARNINGLEVEL_DATA = "FETCH_CAB_WARNINGLEVEL_DATA";
export const FETCH_CAB_WORD_DATA = "FETCH_CAB_WORD_DATA";
export const HOTSPOT_TOGGLE_CAB_POPUP = "HOTSPOT_TOGGLE_CAB_POPUP";
export const HOTSPOT_TOGGLE_CAB_POPUP_DATA = "HOTSPOT_TOGGLE_CAB_POPUP_DATA";


// 获取品牌列表数据
export function getBrandlistData (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/hot/getHotTotalByBrandNames';
		Util.fetch(dispatch, url, FETCH_BRANDlIST_DATA, param, 'data');
	};
}
// 获取热点舆情类型数据
export function getHotpointTypeData (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/hot/getCountByHotpointType';
		Util.fetch(dispatch, url, FETCH_CAB_TYPELIST_DATA, param, 'data');
	};
}
// 获取热点舆情警告水平数据
export function getHotWarningLevelData (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/hot/getCountByHotWarningLevel';
		Util.fetch(dispatch, url, FETCH_CAB_WARNINGLEVEL_DATA, param, 'data');
	};
}
// 获取热点舆情热词数据
export function getHotWordData (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/hot/getHotWord';
		Util.fetch(dispatch, url, FETCH_CAB_WORD_DATA, param, 'data');
	};
}
// 获取热点类型饼图数据
export function getTypeData (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/hot/getCountByHotLabelType';
		Util.fetch(dispatch, url, HOTSPOT_CAB_TYPE_DATA, param, 'data');
	};
}

// 获取来源分布饼图数据
export function getSourceData (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/hot/getCountByHotSourceType';
		Util.fetch(dispatch, url, HOTSPOT_CAB_SOURCE_DATA, param, 'data');
	};
}
/**
 * 改变指示当前选择品牌的序号，这里是一个同步action，不需要ajax请求
 * @param  {[type]} i [description]
 * @return {[type]}   [description]
 */
export function cghbrandindex (i) {
	return {
		type: CGH_BRAND_INDEX,
		curindex:i
	};
}
/**
 * 切换cab页面的弹出框显示
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function togglePopup (params) {
  return {
    type: HOTSPOT_TOGGLE_CAB_POPUP,
    params: params
  };
}

/**
 * 
 * @param  {[type]} param   请求参数，弹框类型为hotTypes时为{brandId, typeIdList}, 弹框类型为hotLevel时为{bradId, levelId}
 * @return {[type]}         [description]
 */
export function getPopupData (param) {
    return function (dispatch) {
    	var url = ApiDomain + '/opinion/rest/hot/getWarningProfileByBrandId?brandId=1&hotpointTypeIdList=1,2';
    	Util.fetch(dispatch, url, HOTSPOT_TOGGLE_CAB_POPUP_DATA, param, 'data');
    };
}
