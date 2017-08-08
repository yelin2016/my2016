import * as ActionTypes from '../../actions/special/topic';
var initialState ={
	   condition:{
         objectContent:'',
         warnStarttime:'',
         warnEndtime:'',
         pageCount:'',
         refresh:false,
         data:{},
         loading:false,
         error:false,
         msg:""
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
function dealsubtypeLabelId(state,action){
	var subtypeLabelId=[];
	return Object.assign({},state,action.condition,{subtypeLabelId:subtypeLabelId},{refresh:true});
};
// reducer
var topic = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SPECIAL_TOPIC_QUERY:
			return dealsubtypeLabelId(state,action);
		case ActionTypes.FETCH_SPECIAL_TOPIC_DATA:
			return fetchProcess(state, action);
		case ActionTypes.SPECIAL_TOPIC_PAPER:
			return Object.assign({}, state,{currentpaper: action.paper,refresh:true});
		default:
			return state;
	}
};
export default topic;