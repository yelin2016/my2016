import * as ActionTypes from '../../actions/hotspot/cab';

var initialState ={

	// 左侧品牌列表数据
	brandData: [],
	brandDataStamp: 0,
	// 分类统计列表数据
	classifyData: [],
	// 分级统计列表数据
	levelData: [],
	// 热词数据
	wordData: [],
	// 类型分布环图数据
	typeData: [],
	typeDataStamp: 0,
	// 来源分布环图数据
	sourceData: [],
	sourceDataStamp: 0,
	// 当前选中的品牌序号
	curindex:0,

	loading: false,
	msg: "",
	
	// 弹框状态
	popupStatus: {
		show: false,
		type: 'hotType',  //level brand hotType
		subType: '',
		level: '',
		brand: '',
		loading: false,
		msg: '',
		cancelId: 0,
		cancelMsg: ''
	},
	// 弹框数据
	popupData: []
};

// reducer
var cab = function (state = initialState, action) {
	var tmpStatus;
	switch (action.type) {

		case ActionTypes.FETCH_BRANDlIST_DATA:
			return Util.fetchProcess(state, action, {data: 'brandData', stamp: 'brandDataStamp'});

		case ActionTypes.FETCH_CAB_TYPELIST_DATA:
			return Util.fetchProcess(state, action, {data: 'classifyData'});

		case ActionTypes.FETCH_CAB_WARNINGLEVEL_DATA:
			return Util.fetchProcess(state, action, {data: 'levelData'});

		case ActionTypes.FETCH_CAB_WORD_DATA:
			return Util.fetchProcess(state, action, {data: 'wordData'});

		case ActionTypes.HOTSPOT_TOGGLE_CAB_POPUP:
			tmpStatus = Object.assign({}, state.popupStatus, action.params);
			return Object.assign({}, state, {popupStatus: tmpStatus})

		case ActionTypes.HOTSPOT_TOGGLE_CAB_POPUP_DATA:
			return Util.fetchProcess(state, action, {data: 'popupData'});

		case ActionTypes.CGH_BRAND_INDEX:
			return Object.assign({}, state, {curindex: action.curindex});
		
		case ActionTypes.HOTSPOT_CAB_TYPE_DATA:
			return Util.fetchProcess(state, action, {data: 'typeData', stamp: 'typeDataStamp'});
			
		case ActionTypes.HOTSPOT_CAB_SOURCE_DATA:
			return Util.fetchProcess(state, action, {data: 'sourceData', stamp: 'sourceDataStamp'});
	
		default:
			return state;
	}
};

export default cab;