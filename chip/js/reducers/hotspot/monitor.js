import * as ActionTypes from '../../actions/hotspot/monitor';

var initialState ={
	// 预警级别列表
	levelList: [],
	// 舆情类型列表
	typeList: [],
	// 标签大类型列表
	labelList: [],
	// 所有类型细标签
	subLabels: {},
	// 预警网站大类型列表
	siteList: [],
	// 所有类型的网站
	subSites: {},
	// 筛选条件
	condition:{
		drops: {
			gzd:'',
			yqlx:'',
			wzlx:'',
			wzmc:'',
			ppbq:'',
			cpbq:'',
			gnbq:'',
			fwbq:'',
			hdbq:'',
			qtbq:''
		},
		inputs:{
			yqnr:'',
			cpxh: ''
		},
		producetime:{
			start: '',
			end:'' 
		},
		changetime:{
			start: '',
			end:''
		}
	},
	data: [],
	// 当期页码
	currentpaper: 1,
	// 总页码
	totalpaper:'',
	// 是否需要刷新数据
	refresh:false,
	// 
	Loading: false,
	// 修改舆情状态
	modifyStatus: {
		preTypeId: '',
		nextTypeId: '',
		objectId: ''
	},
	// 修改舆情弹框显示标志
	modifyShow: false
};

/**
 * 转换对象数组中各个对象的属性名为nm, value
 * @param  {[type]} list   要转换的对象数组
 * @param  {[type]} nmKey  转换为nm的属性名
 * @param  {[type]} valKey 转换为value的属性名
 * @return {[type]}        [description]
 */
function transKey (list, nmKey, valKey) {
	var tmpList = [];
	for (var i = 0; i < list.length; i++) {
		tmpList.push({
			nm: list[i][nmKey],
			value: list[i][valKey]
		});
	}
	return tmpList;
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

// 处理数据请求状态
function fetchProcess (state, action) {
	switch (action.status) {
		case 0:
			return Object.assign({}, state, {Loading: true});
		case 1:
			return Object.assign({}, state, {data: [], Loading: false,refresh:false});
		case 200:
			return Object.assign({}, state, {data: action.data,totalpaper:action.totalpaper, Loading: false,refresh:false});
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

// 处理预警网站类型
function siteProcess (state, action) {
	switch (action.status) {
		case 1: 
			return state;
		case 200:
			var sites = transKey(action.data, 'sourceTypeName', 'sourceTypeId');
			return Object.assign({}, state, {siteList: sites});
		default:
			return state;
	}
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

// 处理预警类型
function typeProcess (state, action) {
	switch (action.status) {
		case 1: 
			return state;
		case 200:
			var types = transKey(action.data, 'hotpointTypeName', 'hotpointTypeId');
			return Object.assign({}, state, {typeList: types});
		default:
			return state;
	}
}

// 处理舆情级别
function levelProcess (state, action) {
	switch (action.status) {
		case 1: 
			return state;
		case 200:
			var types = [];
			for (var i = 0; i < action.data.length; i++) {
				types.push({
					nm: action.data[i].warningLevelName.substring(4),
					value: action.data[i].warningLevelId
				});
			}
			return Object.assign({}, state, {levelList: types});
		default:
			return state;
	}
}

// 处理舆情类型修改
function modifyProcess (state, action) {
	var tmpStatus;
	switch (action.status) {
		// 准备修改，打开弹框，开始选择类型
		case 'editing':
			tmpStatus = Object.assign({}, state.modifyStatus, action.param);
			return Object.assign({}, state, {
				modifyStatus: tmpStatus,
				modifyShow: true
			});
		// 发送请求
		case 'pending':
			return Object.assign({}, state, {
				modifyShow: false
			});
		// 接口返回，修改成功
		case 200:
		// todo 修改这一条数据
		return Object.assign({}, state, {refresh: true});
		// 取消修改
		case 'cancel': 
			return Object.assign({}, state, {modifyShow: false});
		// 接口返回，修改失败; 取消; 或其他情况
		default:
			return state;
	}
}

// reducer
var monitor = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.FETCH_HOTSPOT_MONITOR_LEVEL:
			return levelProcess(state, action);

		case ActionTypes.FETCH_HOTSPOT_MONITOR_TYPE:
			return typeProcess(state, action);

		case ActionTypes.FETCH_HOTSPOT_MONITOR_TYPESITE:
			return siteProcess(state, action);

		case ActionTypes.FETCH_HOTSPOT_MONITOR_SUBSITE:
			return subSiteProcess(state, action);

		case ActionTypes.FETCH_HOTSPOT_MONITOR_TYPELABEL:
			return Object.assign({}, state, {labelList: action.data || []});

		case ActionTypes.FETCH_HOTSPOT_MONITOR_SUBLABEL:
			return subLabelProcess(state, action);

		case ActionTypes.MONITOR_TABLE_QUERY:
			return Object.assign({}, state, {condition: action.condition, currentpaper: 1, refresh:action.refresh});

		case ActionTypes.FETCH_MONITOR_TABLE_DATA:
			return fetchProcess(state, action);
			
		case ActionTypes.HOTSPOT_MONITOR_PAPER:
			return Object.assign({}, state,{currentpaper: action.paper, refresh:true});

		case ActionTypes.HOTSPOT_MONITOR_MODIFY:
			return modifyProcess(state, action);
			// return Object.assign({}, state, {modifyStatus: action.param, modifyShow: true});

		default:
			return state;
	}
};
export default monitor;