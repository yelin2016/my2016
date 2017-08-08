import * as ActionTypes from '../../actions/negative/distribution';
var initialState ={
	data: [],
	focusData: {},
	countData: {},
	stamp: 0
};

// 转换为方便series使用的data格式
function fetchDistProcess (state, action) {
	var i, j, tmp, curKey;
	var data = action.data || [];
	var flv1 = [];
	var flv2 = [];
	var clv1 = [];
	var clv2 = [];

	for (i = 0; i < data.length; i++) {
		if (data[i].totalFocusCount > 0) {
			flv1.push({
				value: data[i].totalFocusCount, 
				name: data[i].typeLabel,
				info: data[i].typeLabel,
	  	});
		}
		if (data[i].totalArticleCount) {
	  	clv1.push({
				value: data[i].totalArticleCount, 
				name: data[i].typeLabel,
				info: data[i].typeLabel
	  	});
	  }
  	tmp = data[i].bbsDistribution;
  	curKey = data[i].typeLabel;
		flv2[curKey] = [];
		clv2[curKey] = [];
  	for (j = 0; j < tmp.length; j++) {
  		if (tmp[j].focusCount) {
	  		flv2[curKey].push({
	  			value: tmp[j].focusCount,
	  			name: tmp[j].bbsName
	  		});
	  	}
	  	if (tmp[j].articleCount) {
	  		clv2[curKey].push({
	  			value: tmp[j].articleCount,
	  			name: tmp[j].bbsName
	  		});
	  	}
  	}
	}
	return Object.assign({}, state, {
		focusData: {
			lv1: flv1,
			lv2: flv2
		},
		countData: {
			lv1: clv1,
			lv2: clv2
		},
		stamp: new Date().getTime()
	});
}

// reducer
var distribution = function (state = initialState, action) {
	switch (action.type) {
		case ActionTypes.NEGATIVE_DIST_DATA:
			return fetchDistProcess(state, action)
		default:
			return state;
	}
};
export default distribution;