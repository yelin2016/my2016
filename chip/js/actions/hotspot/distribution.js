export const HOTSPOT_DIS_QUERY = 'HOTSPOT_DIS_QUERY';
export const HOTSPOT_DIS_QUERIED = 'HOTSPOT_DIS_QUERIED';
export const HOTSPOT_DIS_CHART = 'HOTSPOT_DIS_CHART';
export const HOTSPOT_DIS_CHART_CHG = 'HOTSPOT_DIS_CHART_CHG';

/**
 * 点击查询按钮，保存参数
 * @return {[type]} [description]
 */
export function query (param) {
	return {
		type: HOTSPOT_DIS_QUERY,
		param: param
	};
}

// 查询最新的数据，清除query标志
export function clearQueryFlag () {
	return {
		type: HOTSPOT_DIS_QUERIED,
		query: false
	};
}

// 获取图表数据
export function getChartData (param) {
	return function (dispatch) {
		var url = ApiDomain+"/opinion/rest/hot/getHotDistribution";
		Util.fetch(dispatch, url, HOTSPOT_DIS_CHART, param, 'data');
	};
}

// 改变图形类型
export function chgChartType (param) {
	return {
		type: HOTSPOT_DIS_CHART_CHG,
		param: param
	};
}
