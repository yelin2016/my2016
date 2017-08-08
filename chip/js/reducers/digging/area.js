import * as ActionTypes from '../../actions/digging/area';

var initialState = {
	// 地域销售数据
	areaSaleData: [],
	areaSaleStamp: 0,
	// 地域功能偏好数据
	areaPreferData: [],
	areaPreferStamp: 0,
	// 地域品牌top10
	areaRankData: [],
	areaRankStamp: 0,
	// 地域功能分析数据
	areaFeatureData: [],
	areaFeatureStamp: 0
};

var area = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.FETCH_DIG_AREA_SALE:
			return Util.fetchProcess(state, action, {data: 'areaSaleData', stamp: 'areaSaleStamp'});

		case ActionTypes.FETCH_DIG_AREA_PREFER:
			return Util.fetchProcess(state, action, {data: 'areaPreferData', stamp: 'areaPreferStamp'});

		case ActionTypes.FETCH_DIG_AREA_RANK:
			return Util.fetchProcess(state, action, {data: 'areaRankData', stamp: 'areaRankStamp'});

		case ActionTypes.FETCH_DIG_AREA_FEATURE:
			return Util.fetchProcess(state, action, {data: 'areaFeatureData', stamp: 'areaFeatureStamp'});

		default: 
			return state;
	}
}

export default area;