export const FETCH_DIG_AREA_SALE = 'FETCH_DIG_AREA_SALE';
export const FETCH_DIG_AREA_PREFER = 'FETCH_DIG_AREA_PREFER';
export const FETCH_DIG_AREA_RANK = 'FETCH_DIG_AREA_RANK';
export const FETCH_DIG_AREA_FEATURE = 'FETCH_DIG_AREA_FEATURE';

export function getAreaSale () {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/areaAnalyse/getAreaSaleInfo';
		Util.fetch(dispatch, url, FETCH_DIG_AREA_SALE, {}, 'data');
	}
}

export function getAreaPrefer () {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/areaAnalyse/getAreaSaleByAreaId';
		Util.fetch(dispatch, url, FETCH_DIG_AREA_PREFER, {}, 'data');
	}
}

export function getAreaRank (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/areaAnalyse/getBrandSaleTop';
		Util.fetch(dispatch, url, FETCH_DIG_AREA_RANK, param, 'data');
	}
}

export function getAreaFeature (param) {
	return function (dispatch) {
		var url = ApiDomain + '/opinion/rest/areaAnalyse/getAreaReputation';
		Util.fetch(dispatch, url, FETCH_DIG_AREA_FEATURE, param, 'data');
	}	
}