import * as ActionTypes from '../../actions/special/activity';
var initialState ={
	   condition:{
	    	drops: {
				activityf: '',
			
			},
			inputs:{
				activityname:'',

			},
			producetime:{
				start: '',
				end:'' 
			},
			changetime:{
				start: '',
				end:''
			},
		},
	   currentpaper:'1',
	   
	   refresh:false,
	   data:{},
	   Loading: false,
	   error: false,
	   msg: ""
};
// 处理数据请求状态
function fetchProcess (state, action) {
	switch (action.status) {
		case 0:
			return Object.assign({}, state, {Loading: true});
		case 1:
			return Object.assign({}, state, {msg: action.msg,Loading: false,refresh:false});
		case 200:
			return Object.assign({}, state, {data: action.data, totalpaper:action.totalpaper,Loading: false,refresh:false});
		default:
			return state;
	}
};
// reducer
var activity = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SPECIAL_ACTIVITY_QUERY:
			return Object.assign({}, state, {condition: action.condition,refresh:true});
		case ActionTypes.FETCH_SPECIAL_ACTIVITY_DATA:
			return fetchProcess(state, action);
		case ActionTypes.SPECIAL_ACTIVITY_PAPER:
			return Object.assign({}, state,{currentpaper: action.paper,refresh:true});
		default:
			return state;
	}
};
export default activity;