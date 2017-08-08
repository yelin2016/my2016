export const NEGATIVE_RANK_SELECT = 'NEGATIVE_RANK_SELECT';
export const FETCH_NEGATIVE_RANK_DATA = 'FETCH_NEGATIVE_RANK_DATA';
export const FETCH_NEGATIVE_RANK_TYPE_DATA = 'FETCH_NEGATIVE_RANK_TYPE_DATA';
export const FETCH_NEGATIVE_RANK_SOURCE_DATA='FETCH_NEGATIVE_RANK_SOURCE_DATA';

// 排行筛选条件更新
export function rankselect(typeLabel,sourceType,typeselect,sourceselect,refresh) {
	return {
		type: NEGATIVE_RANK_SELECT,
		typeLabel: typeLabel,
		sourceType:sourceType,
		sourceSelect:sourceselect,
		typeSelect:typeselect
	};
};
// 获取排行类型选择数据
export function getRankTypeData(){
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getDictLabelType';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_RANK_TYPE_DATA);
	};
};
// 获取排行来源选择数据
export function getRankSourceData(){
	return function (dispatch) {
		var url = ApiDomain+'/opinion/rest/negative/getDictSourceType';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_RANK_SOURCE_DATA);
	};
};
// 获取排行列表数据
export function getRankData (type,source) {
	return function (dispatch) {
		var typeSelect=type.join(',');
		var sourceSelect=source.join(',');
		var url = ApiDomain+'/opinion/rest/negative/getNegativeTop';
		Util.fetch(dispatch, url, FETCH_NEGATIVE_RANK_DATA, {sourceType: sourceSelect, typeLabel: typeSelect}, 'data');
	};
}