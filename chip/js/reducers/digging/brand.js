import * as ActionTypes from '../../actions/digging/brand';

var initialState = {
	// 当前选择的品牌序号
	curBrandIndex: 0,
	// 云图数据
	cloudData: [],
	cloudStamp: 0,
	// 产品标签页价格分布图
	priceDistData: [],
	priceDistStamp: 0,
	// 产品标签页销量排行图
	saleRankData: [],
	saleRankStamp: 0,
	// 销量图按价格区间筛选的价格id
	priceId: -1,
	// 功能标签页数据
	priceRepData: [],
	priceRepStamp: 0,
	// 服务标签页数据
	serviceData: [],
	serviceStamp: 0,
	// 活动top10数据
	top10Data: [],
	

	detailStatus: {
		show: false,
		name: '',
		id: '',
		type: 'single',
		data: []
	},
	detailData: [
		{
			labels: '产品,服务,品牌,其他,功能',
			url: 'https://www.baidu.com',
			info: '这是热点事件的主要内容'
		},
		{
			labels: '产品,服务,品牌,其他,功能',
			url: 'https://www.baidu.com',
			info: '这是热点事件的主要内容'
		},
		{
			labels: '产品,服务,品牌,其他,功能',
			url: 'https://www.baidu.com',
			info: '这是热点事件的主要内容'
		},
		{
			labels: '产品,服务,品牌,其他,功能',
			url: 'https://www.baidu.com',
			info: '这是热点事件的主要内容'
		},
		{
			labels: '产品,服务,品牌,其他,功能',
			url: 'https://www.baidu.com',
			info: '这是热点事件的主要内容'
		},
		{
			labels: '产品,服务,品牌,其他,功能',
			url: 'https://www.baidu.com',
			info: '这是热点事件的主要内容'
		}
	]
};

// reducer
var brand = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.DIGGING_BRAND_TOGGLE_DETAIL:
			var tmpStatus = Object.assign({}, state.detailStatus, action.param);
			// return Object.assign({}, state, {detailStatus: tmpStatus, detailData: []});
			return Object.assign({}, state, {detailStatus: tmpStatus});

		// 品牌改变时，重置产品标签页选择的价格区间
		case ActionTypes.DIGGING_BRAND_CHG_BRAND:
			return Object.assign({}, state, {curBrandIndex: action.nextIndex, priceId: -1});

		case ActionTypes.FETCH_DIG_BRAND_SALE_RANK:
			return Util.fetchProcess(state, action, {data: 'saleRankData', stamp: 'saleRankStamp'});

		case ActionTypes.FETCH_DIG_BRAND_PRICE_DIST:
			return Util.fetchProcess(state, action, {data: 'priceDistData', stamp: 'priceDistStamp'});

		case ActionTypes.FETCH_DIG_BRAND_SALE_FILTER:
			return Object.assign({}, state, {priceId: action.priceId});

		case ActionTypes.FETCH_DIG_BRAND_SERVICE:
			return Util.fetchProcess(state, action, {data: 'serviceData'});

		case ActionTypes.FETCH_DIG_BRAND_TOP10:
			return Util.fetchProcess(state, action, {data: 'top10Data'});

		case ActionTypes.FETCH_DIG_BRAND_PRICE_REP:
			return Util.fetchProcess(state, action, {data: 'priceRepData', stamp: 'priceRepStamp'});

		case ActionTypes.FETCH_DIG_BRAND_CLOUD:
			return Util.fetchProcess(state, action, {data: 'cloudData', stamp: 'cloudStamp'});

		default:
			return state;
	}
};

export default brand;