import * as ActionTypes from '../../actions/negative/rank';

var initialState ={
	// 类型数据
	typedata:[],
	// 来源数据
 	sourcedata:[],
 	// 选中的类型数据
  typeLabel:{
		1:false,
		2:false,
		3:false,
		4:false,
		5:false
	},
	// 选中的来源项
	sourceType:{
		1:false,
		2:false,
		3:false,
		4:false
	},
	// 格式化为数组的选中项
	typeSelect:[],
	sourceSelect:[],
	// 是否需要刷新数据标志
	refresh:false,
	// 列表数据
	data:{},
	// 列表更新时间戳
	stamp: 0,
	Loading: false,
	error: false,
	msg: ""
};

// reducer
var rank = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.NEGATIVE_RANK_SELECT:
			return Object.assign({}, state,{
				typeLabel: action.typeLabel,
				sourceType: action.sourceType,
				sourceSelect:action.sourceSelect,
				typeSelect:action.typeSelect,
				refresh:true});

		case ActionTypes.FETCH_NEGATIVE_RANK_DATA:
			return Util.fetchProcess(
				state, 
				action, 
				{data: 'data', msg: 'msg', loading: 'Loading'}, 
				{refresh: false, stamp: new Date().getTime()}
			);

		case ActionTypes.FETCH_NEGATIVE_RANK_TYPE_DATA:
			return Util.fetchProcess(state, action, {data: 'typedata'});

		case ActionTypes.FETCH_NEGATIVE_RANK_SOURCE_DATA:
			return Util.fetchProcess(state, action, {data: 'sourcedata'});

		default:
			return state;
	}
};
export default rank;