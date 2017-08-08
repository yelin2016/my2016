import * as ActionTypes from '../../actions/negative/history';
var initialState ={
	// 负面舆情级别数据
	Waringleveldata:[],
	// 网站类型数据
	SourceTypeIddata:[],
	// 所有网站列表数据
	subSites: {},
	// 标签类型数据
	TypeLabelListdata:[],
	// 所有类型的标签数据
	subLabels: {},
	// 处理状态数据
	TerminateWaydata:[
		{"nm":"未处理","value":0},
		{"nm":"已处理","value":1}
	],

	// 查询条件
	condition: {
		warningLevelId: '',
		typeLabelId: '',
		objectContent: '',
		sourceTypeId: '',
		sourceId: '',
		warnStarttime: '',
		warnEndtime: '',
		changeStarttime: '',
		chageEndtime: '',
		productModel: '',
		terminateWay: '',
		fwbq_subid: '',
		ppbq_subid: '',
		cpbq_subid: '',
		gnbq_subid: ''
	},

	// 页码
	pageIndex:'1',
	// 每页条数
	pageSize:'5',
	// 总页数
	pageCount:'',
	    
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
			return Object.assign({}, state, {data: action.data, pageCount:action.pageCount,Loading: false,refresh:false});
		default:
			return state;
	}
};
/**
 * 处理获取的的选项数据
 * 将接口返回的选项数据的{optionName:'xxx', optionVlue: 'yyy'}转换为{nm:'xxx',value:'yyy'}的格式
 * 
 * @param  {[type]} state     [description]
 * @param  {[type]} action    [description]
 * @param  {[type]} nmKey     选项名称的属性名
 * @param  {[type]} valKey    选项value的属性名
 * @param  {[type]} statename state里存放此数据的属性名
 * @return {[type]}           [description]
 */
function dealdata (state, action, nmKey, valKey, statename) {
	var tmpList = [], tmpState = {}, data = action.data || [];
	for (var i = 0; i < data.length; i++) {
		tmpList.push({nm:data[i][nmKey], value:data[i][valKey]});
	}
 	tmpState[statename] = tmpList;
	return Object.assign({}, state, tmpState);
}
 /**
 * 将对象数组中的对象按类型分为多个对象数组。
 * @param  {[type]} data    待处理对象数组
 * @param  {[type]} typeKey 表示类型的属性名
 * @param  {[type]} nmKey   转换为nm的属性名
 * @param  {[type]} valKey  转换为value的属性名
 * @return {[type]}         返回一个按类型索引的对象
 */
function cliassifyList (data, typeKey, nmKey, valKey) {
	var i, key, obj = {};
	for (i = 0; i < data.length; i++) {
		key = data[i][typeKey];
		if (!obj[key]) {
			obj[key] = [];
		}
		obj[key].push({
			nm: data[i][nmKey],
			value: data[i][valKey]
		});
	}
	return obj;
}
 // 处理所有类型网站请求
function subSiteProcess (state, action) {
	switch (action.status) {
		case 1: 
			return state;
		case 200:
			var sites = cliassifyList(action.data, 'sourceTypeId', 'sourceName', 'sourceId');
			return Object.assign({}, state, {subSites: sites});
		default:
			return state;
	}
}
// 处理所有类型细标签请求状态
function subLabelProcess (state, action) {
	switch (action.status) {
		case 1: 
			return state;
		case 200:
			var labels = cliassifyList(action.data, 'typeLabelId', 'subtypeLabelName', 'subtypeLabelId');
			return Object.assign({}, state, {subLabels: labels});
		default:
			return state;
	}
}

// reducer
var history = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.FETCH_NEGATIVE_HISTORY_WLEVER:
			return dealdata(state,action,'warningLevelName','warningLevelId','Waringleveldata');

		case ActionTypes.NEGATIVE_HISTORY_QUERY:
			return Object.assign({}, state, {condition: action.condition, refresh: true});

		case ActionTypes.FETCH_NEGATIVE_HISTORY_DATA:
			return fetchProcess(state, action);

		case ActionTypes.NEGATIVE_HISTORY_PAPER:
			return Object.assign({}, state,{pageIndex: action.paper,refresh:true});

		case ActionTypes.FETCH_NEGATIVE_HISTORY_SOURCE_TYPEId:
			return dealdata(state,action,"sourceTypeName","sourceTypeId","SourceTypeIddata");

		case ActionTypes.FETCH_NEGATIVE_HISTORY_SOURCE:
			return subSiteProcess(state, action);
			
		case ActionTypes.FETCH_NEGATIVE_HISTORY_TYPELABEL_LIST:
			return dealdata(state,action,"typeLabelName","typeLabelId","TypeLabelListdata");

		case ActionTypes.FETCH_NEGATIVE_HISTORY_SUBTYPELABEL:
			return subLabelProcess(state, action);
			
		default:  
			return state;
	}
};
export default history;