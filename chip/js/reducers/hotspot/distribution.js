import * as ActionTypes from '../../actions/hotspot/distribution';
var initialState = {
	data:{
		compareData:[
			{"key":"total","info":"总和"},
			{"key":"activity","info":"活动"},
			{"key":"hot","info":"热帖"}
		],
		graphicData:[
			{"key":"pie","info":"饼图"},
			{"key":"bar","info":"柱状图"}
		],
		brandData:[
			{"key":"ch","info":"长虹"},
			{"key":"xm","info":"小米"},
			{"key":"ls","info":"乐视"},
			{"key":"cw","info":"创维"},
			{"key":"hx","info":"海信"},
			{"key":"tcl","info":"TCL"}
		]
	},
	query: false,
	graphic:{
		"pie": true,
		"bar": false
	},
	compare:{
		"total": true,
		"activity": false,
		"hot": false
	},
	brand:{
		"ch":true,
		"xm":true,
		"ls":true,
		"cw":true,
		"hx":true,
		"tcl":true
	},
	pieData: {
		data:{},
		timestamp: 0
	},
	barData: {
		data:{},
		timestamp: 0
	},
	// 图表数据
	chartData: [],
	// 当前范围的日期数组
	dateList: [],
	timestamp: 0
};

// 处理图表数据请求状态
function fetchChartProcess (state, action) {
	switch (action.status) {
		case 1:
			return state;
		case 200:
			return calcDateList(state, action);
			// return state;
		default:
			return state;
	}
}

// 计算包含最大、最小时间段之间每一天的日期的数组
function calcDateList (state, action) {
	var i, tmp, dateList = [], data = action.data;
	for (i = 0; i < data.length; i++) {
		if (data[i].brandDistribution) {
			data[i].brandDistribution = Util.ArrToObj(data[i].brandDistribution, 'date');
		} else {
			data[i].brandDistribution = {};
		}
	}
	var maxDate = new Date();
	maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
	var minDate = new Date(maxDate.getFullYear(), maxDate.getMonth()-1, 1);
	var dayLen = 24*3600*1000;
	while (minDate.getTime() <= maxDate.getTime()) {
		tmp = minDate.getFullYear() + '-' + (minDate.getMonth()+1) + '-' + minDate.getDate();
		tmp = tmp.replace(/-(\d(?!\d)|\d$)/g, '-0$1');
		dateList.push(tmp);
		minDate = new Date(minDate.getTime() + dayLen);
	}
	return Object.assign({}, state, {
		chartData: action.data,
		dateList: dateList,
		timestamp: new Date().getTime()
	});
}

var distribution = function (state = initialState, action) {
	switch (action.type) {

		case ActionTypes.HOTSPOT_DIS_QUERY:
			return Object.assign({}, state, {
				graphic: action.param.graphic,
				compare: action.param.compare,
				brand: action.param.brand,
				chartData: [],
				query: true
			});

		case ActionTypes.HOTSPOT_DIS_QUERIED:
			return Object.assign({}, state, {query: false});

		case ActionTypes.HOTSPOT_DIS_CHART:
			return fetchChartProcess(state, action);

		case ActionTypes.HOTSPOT_DIS_CHART_CHG:
			return Object.assign({}, state, {graphic: action.param});

		default:
			return state;
	}
};

export default distribution;