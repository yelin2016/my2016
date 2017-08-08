// 通用方法
var utils = {
	/**
	 * 定时器标志，用于各个页面定时获取更新数据
	 * 首页，负面舆情监控，热点舆情驾驶舱页面自动定时刷新数据
	 * @type {[type]}
	 */
	fetchTimer: null,
	/**
	 * 计算图表y轴最大值
	 * @param  {[type]} max [description]
	 * @return {[type]}     [description]
	 */
	yAxisMax: function (max) {
		var base = 1;
		var left = max;
		while(left > 10) {
			left = left / 10;
			base = base * 10;
		}
		if (base > 1) {
			left = Math.round(left)
			left = left == 10 ? left + 2 : left + 0.5;
		} else {
			left = left % 2 ? left + 3 : left + 2;
		}
		max = left * base;
		return max;
	},
	/**
	 * 将颜色转换为rgba格式
	 * @param  {[type]} color   格式为#xxxxxx的颜色
	 * @param  {[type]} opacity 不透明度
	 * @return {[type]}         [description]
	 */
	toRgba: function (color, opacity) {
		var rgba = color.replace(/^#/g, '');
		if (rgba.length == 3) {
			rgba = rgba.split('');
			for (i = 0; i < rgba.length; i++) {
				rgba[i] += rgba[i];
			}
			rgba = rgba.join('');
		}
		if (rgba.length != 6) {
			rgba = '';
		} else {
			rgba = 'rgba(' + parseInt(rgba.substring(0,2), 16) + ',' +
				parseInt(rgba.substring(2,4), 16) + ',' +
				parseInt(rgba.substring(4,6), 16) + ',' + opacity + ')';
		}
		return rgba;
	},
	/**
	 * 请求接口的方法，一般接口请求通用。有特殊情况时可以在action里面单独写请求方法。
	 * @param  {[type]} dispatch action分派方法
	 * @param  {[type]} url      api请求地址
	 * @param  {[type]} action   需要分派的action
	 * @param  {[type]} param    请求的参数
	 * @param  {[type]} dataKey  返回对象data的属性名
	 * @param  {[type]} type     请求类型
	 * @return {[type]}          [description]
	 */
	fetch: function (dispatch, url, action, param, dataKey, type) {
		$.ajax({
			"url": url,
			"type": type ? type : 'get',
			"data": param
		})
		.done(function(re) {
			dispatch({
				type: action,
				status: typeof re.status === 'number' ? re.status : 200,
				data: dataKey ? re[dataKey] : re,
				msg: typeof re.msg === 'string' ? re.msg : ''
			});
		})
		.fail(function() {
			dispatch({
				type: action,
				status: 1,
				msg: 'error'
			});
		});
	},
	 /**
  * 接口请求处理状态，一般接口请求通用。有特殊情况时可以在action里面单独写处理方法。
  * @param  {[type]} state     [description]
  * @param  {[type]} action    [description]
  * @param  {[type]} keys      包含需要的属性名的对象，key可选loading, msg, stamp, data，在value中指定各字段的名称
  * @param  {[type]} injectObj 手动指定接口返回后需要合并到state中的对象，例如把{refresh: false, Loading: false}合并到新的state
  * @param  {[type]} middleKey 中间字段名，对应state.middleKey.xxx的情况
  * @return {[type]}           [description]
  */
	fetchProcess: function (state, action, keys, injectObj, middleKey) {
		var middleObj = {}, tmpStatus = {};
		switch (action.status) {
			// 发起请求，如果指定了相应的状态的key，改变loading状态
			case 0:
				if (keys.loading) {
					tmpStatus[keys.loading] = true;
				}
				break;
			// 请求出错，如果指定了相应的状态的key，改变loading和msg的状态
			case 1:
				tmpStatus = injectObj || {};
				if (keys.loading) {
					tmpStatus[keys.loading] = false;
				}
				if (keys.msg) {
					tmpStatus[keys.msg] = action.msg;
				}
				break;
			// 请求成功，如果指定了相应的状态的key，改变loading, msg, data的状态，至少应该指定data的key
			case 200:
				tmpStatus = injectObj || {};
				if (keys.loading) {
					tmpStatus[keys.loading] = false;
				}
				if (keys.msg) {
					tmpStatus[keys.msg] = action.msg;
				}
				if (keys.data) {
					tmpStatus[keys.data] = action.data;
				}
				if (keys.stamp) {
					tmpStatus[keys.stamp] = new Date().getTime();
				}
				break;
			default:
				return state;
		}
		if (middleKey) {
			tmpStatus = Object.assign({}, state[middleKey], tmpStatus);
			middleObj[middleKey] = tmpStatus;
			return Object.assign({}, state, middleObj);
		}
		return Object.assign({}, state, tmpStatus);
	},
	/**
	 * 把对象数组转换成一个对象，新对象包含了原对象数组中的各个对象。
	 * 指定原对象数组中每个对象的一个属性，用它的值来作为新对象中指向各个对象的属性名。
	 * eg. 
	 * 转换前
	 * arr = [
	 * 	{k:'obj1',x:1,y:2,z:3},
	 * 	{k:'obj2',x:4,y:5,z:6}
	 * ]
	 *
	 * ArrToObj(arr, 'k');
	 * 转换后
	 * obj = {
	 * 	ojb1: {k:'obj1',x:1,y:2,z:3},
	 * 	obj2: {k:'obj2',x:4,y:5,z:6}
	 * }
	 * 
	 * @param {[type]} arr 待转换的对象数组
	 * @param {[type]} key 作为对象索引的属性的属性名
	 */
	ArrToObj: function (arr, key) {
		var i, tmp, obj = {};
		for (i = 0; i < arr.length; i++) {
			tmp = arr[i];
			if (!obj.hasOwnProperty(tmp[key])) {
				obj[tmp[key]] = tmp;
			}
		}
		return obj;
	},
	/**
	 * 使用iframe下载文件
	 * @param  {[type]} url 文件url地址
	 * @return {[type]}     [description]
	 */
	downloadFile: function (url) {
		var frame = document.getElementById('download_frame');
		if (!frame) {
			frame = document.createElement('iframe');
			frame.id = 'download_frame';
			frame.style.display = 'none';
			document.body.appendChild(frame);
		}
		frame.src = url;
	},
	/**
	 * 时间转换，数字时间戳转换为字符串
	 * @param  {[type]} num       数字时间戳
	 * @param  {[type]} formatter 转换后字符串格式 y-m-d h-i-s, 返回字符串用正则替换掉ymdhis
	 * @return {[type]}           [description]
	 */
	timeNumToStr: function (num, formatter) {
		num = num || new Date().getTime();
		formatter = formatter || 'y-m-d h:i:s';
		var oTime = new Date(num);
		var y = oTime.getFullYear();
		var m = (oTime.getMonth() + 101 + '').substring(1);
		var d = (oTime.getDate() + 100 + '').substring(1);
		var h = (oTime.getHours() + 100 + '').substring(1);
		var i = (oTime.getMinutes() + 100 + '').substring(1);
		var s = (oTime.getSeconds() + 100 + '').substring(1);

		formatter = formatter.replace(/y+/, y);
		formatter = formatter.replace(/m+/, m);
		formatter = formatter.replace(/d+/, d);
		formatter = formatter.replace(/h+/, h);
		formatter = formatter.replace(/i+/, i);
		formatter = formatter.replace(/s+/, s);

		return formatter;
	}
}
module.exports = utils;