export const TOGGLE_NEGATIVE_POPUP = 'TOGGLE_NEGATIVE_POPUP';
export const FETCH_NEGATIVE_POPUP_DATA = 'FETCH_NEGATIVE_POPUP_DATA';
export const CANCEL_NEGATIVE_WARNING = 'CANCEL_NEGATIVE_WARNING';
export const FETCH_NEGATIVE_TOTAL_NUM = 'FETCH_NEGATIVE_TOTAL_NUM';
export const FETCH_NEGATIVE_LEVEL = 'FETCH_NEGATIVE_LEVEL';
export const FETCH_NEGATIVE_CATEGORY = 'FETCH_NEGATIVE_CATEGORY';
export const FETCH_NEGATIVE_TREND = 'FETCH_NEGATIVE_TREND';

/**
 * 获取监控页总舆情计数数据
 */
export function getTotalCount () {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/negative/getTotalOpinion';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_TOTAL_NUM, null, 'data');
	}
}
/**
 * 获取监控页分级舆情计数数据
 */
export function getLevelCount () {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/negative/getMultipleLevelNegativeOpinion';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_LEVEL, null, 'data');
	}
}
/**
 * 获取监控页分类统计数据
 */
export function getCategory () {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/negative/typeLevelSum';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_CATEGORY, null, 'data');
	}
}
/**
 * 获取走势图数据
 */
export function getTrendData () {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/negative/getTypeLevelWeekly';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_TREND, null, 'data');
	}
}

/**
 * 获取弹出窗口显示的数据
 * @param  {[type]} type    弹框类型 长虹分级level 各种品牌brand
 * @param  {[type]} query   type为level时[red | orange | yellow | blue] type为brand时[小米 | TCL | ...]
 * @param  {[type]} subType 子类型 品牌 | 产品 | 功能 | 服务
 * @return {[type]}         [description]
 */
export function getPopupData (type, query, subType) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/negative/getWarningProfile';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_POPUP_DATA, {warningLevel: query, typeLabel: subType}, 'data');
	}
}

/**
 * 解除一条预警数据
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function doCancelWarning (id) {
	return function (dispatch) {
		$.ajax({
			"url":"./json/fake.json?t=" + new Date().getTime(),
			"type": "get"
		})
		.done(function (re) {
			dispatch({
				type: CANCEL_NEGATIVE_WARNING,
				id:id,
				status: 200
			});
		})
		.fail(function () {
			dispatch({
				type: CANCEL_NEGATIVE_WARNING,
				id:id,
				status: 1
			});
		})
	}
}

/**
 * 切换board页面的弹出框显示
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function togglePopup (params) {
	return {
		type: TOGGLE_NEGATIVE_POPUP,
		params: params
	}
}

//从负面舆情监控页面跳转到负面舆情列表页面之前，提前设置默认参数 
export function presetListParam (param) {
	return {
		type: 'NEGATIVE_LIST_PRESET_PARAM',
		param: param
	}
}