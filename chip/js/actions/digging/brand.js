export const DIGGING_BRAND_CHG_BRAND = 'DIGGING_BRAND_CHG_BRAND';
export const DIGGING_BRAND_TOGGLE_DETAIL = 'DIGGING_BRAND_TOGGLE_DETAIL';
export const FETCH_DIG_BRAND_PRICE_DIST = 'FETCH_DIG_BRAND_PRICE_DIST';
export const FETCH_DIG_BRAND_SALE_RANK = 'FETCH_DIG_BRAND_SALE_RANK';
export const FETCH_DIG_BRAND_SALE_FILTER = 'FETCH_DIG_BRAND_SALE_FILTER';
export const FETCH_DIG_BRAND_SERVICE = 'FETCH_DIG_BRAND_SERVICE';
export const FETCH_DIG_BRAND_TOP10 = 'FETCH_DIG_BRAND_TOP10';
export const FETCH_DIG_BRAND_PRICE_REP = 'FETCH_DIG_BRAND_PRICE_REP';
export const FETCH_DIG_BRAND_CLOUD = 'FETCH_DIG_BRAND_CLOUD';

// 切换品牌
export function chgBrand (nextIndex) {
	return {
		type: DIGGING_BRAND_CHG_BRAND,
		nextIndex: nextIndex
	};
}
// 获取品牌云图数据
export function getBrandCloud (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/mining/getBrandCloudChart';
		Util.fetch(dispatch, url, FETCH_DIG_BRAND_CLOUD, param, 'data');
	}
}
// 获取产品标签页按价格分布饼图数据
export function getPriceDist (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/mining/getRefPriceSalesCount';
		Util.fetch(dispatch, url, FETCH_DIG_BRAND_PRICE_DIST, param, 'data');
	}
}
// 获取产品标签页销量排行柱状图数据
export function getSaleRank (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/mining/getProductModelSalesInfo';
		Util.fetch(dispatch, url, FETCH_DIG_BRAND_SALE_RANK, param, 'data');
	}
}
// 获取功能标签页价格段分布美誉度数据
export function getPriceRep (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/mining/getBrandReputation';
		Util.fetch(dispatch, url, FETCH_DIG_BRAND_PRICE_REP, param, 'data');
	}
}
// 销量排行柱状图按价格区间筛选
export function filterPrice (priceId) {
	return {
		type: FETCH_DIG_BRAND_SALE_FILTER,
		priceId: priceId
	};
}
// 获取品牌服务数据
export function getService (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/mining/getServiceReply';
		Util.fetch(dispatch, url, FETCH_DIG_BRAND_SERVICE, param, 'data');
	};
}
// 获取活动top10数据
export function getTop10 (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/mining/getActivityTop';
		Util.fetch(dispatch, url, FETCH_DIG_BRAND_TOP10, param, 'data');
	}
}
// 显示品牌云图详情
export function toggleDetail (param) {
	return {
		type: DIGGING_BRAND_TOGGLE_DETAIL,
		param: param
	};
}