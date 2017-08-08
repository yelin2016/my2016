export const FETCH_BOARD_TOTAL_NUM = 'FETCH_BOARD_TOTAL_NUM';
export const FETCH_BOARD_LEVEL = 'FETCH_BOARD_LEVEL';
export const FETCH_BOARD_CHIQ_TREND = 'FETCH_BOARD_CHIQ_TREND';
export const FETCH_BOARD_FORUM_DATA = 'FETCH_BOARD_FORUM_DATA';
export const FETCH_BOARD_FORUM_TREND = 'FETCH_BOARD_FORUM_TREND';
export const TOGGLE_BOARD_POPUP = 'TOGGLE_BOARD_POPUP';
export const FETCH_BOARD_POPUP_DATA = 'FETCH_BOARD_POPUP_DATA';
export const CANCEL_BOARD_WARNING = 'CANCEL_BOARD_WARNING';

/**
 * 获取首页总舆情计数数据
 */
export function getTotalCount () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getTotalOpinion';
		Util.fetch(dispatch, url, FETCH_BOARD_TOTAL_NUM, null, 'data');
	}
}
/**
 * 获取首页分级舆情计数数据
 */
export function getLevelCount () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getMultipleLevelNegativeOpinion';
		Util.fetch(dispatch, url, FETCH_BOARD_LEVEL, null, 'data');
	}
}
/**
 * 获取首页长虹舆情走势折线图数据
 */
export function getChiqTrendCount () {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getWeeklyWarningInfo';
		Util.fetch(dispatch, url, FETCH_BOARD_CHIQ_TREND, null, 'data');
	}
}
/**
 * 获取首页论坛舆情走势折线图数据
 */
export function getForumTrendCount (param) {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getWeeklyContender';
		Util.fetch(dispatch, url, FETCH_BOARD_FORUM_TREND, param, 'data');
	}
}

// 获取论坛热点舆情数据
export function getForumData (param) {
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getContenderOpinion';
		Util.fetch(dispatch, url, FETCH_BOARD_FORUM_DATA, param, 'data');
	}	
}