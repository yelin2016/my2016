import React from 'react';
import colors from './circleColors';

// 转换#7f7f7f为rgba形式
function toRgba (color, opacity) {
	var i;
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
}

// 获取不重复的名称
function getUniqName (nameObj, curName) {
	var i, tmp = curName;

	// 最多判断99次
	for (i = 0; i < 99; i++) {
		if (!nameObj[tmp]) {
			break;
		}
		tmp += 'a';
	}
	if (i > 0) {
		curName += i;
	}
	return curName;
}
// 将接口数组转换为三级圆环需要的数据格式
function buildData (data) {
	var i, j, k;
	var datalv1 = [], datalv2 = {}, datalv3 = [];
	var category_lv1 = [];
	var category_lv2 = [];
	var repeatChk = {};		//重复板块名检查
	var uniqName;		//同一个环上各个块唯一名称

	// 用id来表示分类
	// 第一级分类
	for (i = 0; i < data.level1.length; i++) {
		category_lv1.push(data.level1[i].sectionId);
	}
	// 第二级分类
	for (i = 0; i < data.level2.length; i++) {
		category_lv2.push(data.level2[i].sectionId);
	}
	// 生成第一级数据
	repeatChk = {};
	for (i = 0; i < data.level1.length; i++) {
		uniqName = data.level1[i].sectionName;
		uniqName = uniqName.length > 10 ? uniqName.substring(0,10) + '...' : uniqName;
		uniqName = getUniqName(repeatChk, uniqName);
		repeatChk[uniqName] = 1;
		datalv1.push({
			value: data.level1[i].focus,
			id: data.level1[i].sectionId,
			name: uniqName,
			label:{"normal":{"addBtn":true}}
		});
	}
	// 生成第二级数据	
	for (i = 0; i < category_lv1.length; i++) {
		if (!datalv2[category_lv1[i]]) {
			datalv2[category_lv1[i]] = [];
		}
		repeatChk = {};
		for (j = 0; j < data.level2.length; j++) {
			if (data.level2[j].sectionId.indexOf(category_lv1[i]) == 0) {
				uniqName = data.level2[i].sectionName;
				uniqName = uniqName.length > 10 ? uniqName.substring(0,10) + '...' : uniqName;
				uniqName = getUniqName(repeatChk, uniqName);
				repeatChk[uniqName] = 1;
				datalv2[category_lv1[i]].push({
					value: data.level2[j].focus,
					id: data.level2[j].sectionId,
					name: data.level2[j].sectionName,
					label:{"normal":{"addBtn":true}}
				})
			}
		}
	}
	// 生成第三级数据
	for (i = 0; i < category_lv2.length; i++) {
		if (!datalv3[category_lv2[i]]) {
			datalv3[category_lv2[i]] = [];
		}
		repeatChk = {};
		for (j = 0; j < data.level3.length; j++) {
			if (data.level3[j].sectionId.indexOf(category_lv2[i]) == 0) {
				uniqName = data.level3[i].sectionName;
				uniqName = uniqName.length > 10 ? uniqName.substring(0,10) + '...' : uniqName;
				uniqName = getUniqName(repeatChk, uniqName);
				repeatChk[uniqName] = 1;
				datalv3[category_lv2[i]].push({
					value: data.level3[j].focus,
					id: data.level3[j].sectionId,
					name: data.level3[j].sectionName,
					label:{"normal":{"addBtn":true}}
				})
			}
		}
	}
	return {
		lv1: datalv1,
		lv2: datalv2,
		lv3: datalv3,
	}
}

var ChartCircle = React.createClass({
	componentDidMount: function () {

		/**
		 * @preserve
		 * 
		 * 项目引用的echarts对饼图做了一些修改，添加了一些自定义配置选项。
		 * 源码位置: https://github.com/sdhhqb/echarts
		 */	
		
		// 各层的数据
		var datalvl1 = [];
		var datalvl2 = {}
		var datalvl3 = {};

		var levelSeries = [
			{
				seriesId: '100',
				name:'来源1',
				type:'pie',
				selectedMode: 'single',
				radius: ['15%', '30%'],
				label: {
					normal: {
						show: true,
						position: 'btn-center',
						textStyle: {
							color: '#fff'
						},
						addBtn: true,
						addBtnImg: './image/add_btn.png',
						addBtnHover: true
					}
				},
				data:[]
			},
			{
				seriesId: '200',
				name:'来源2',
				type:'pie',
				selectedMode: 'single',
				radius: ['40%', '55%'],
				label: {
					normal: {
						position: 'btn-center',
						textStyle: {
							color: '#fff'
						},
						addBtn: true,
						addBtnImg: './image/add_btn.png',
						addBtnHover: true
					}
				},
				data:[]
			},
			{
				seriesId: '200',
				name:'来源3',
				type:'pie',
				radius: ['70%', '85%'],
				label: {
					normal: {
						position: 'btn-center',
						textStyle: {
							color: '#fff'
						},
						addBtn: true,
						addBtnImg: './image/add_btn.png',
					}
				},
				data:[]
			}
		];

		// 条件管理	
		// 有展开第二级和第三级时，第一级的选中项
		var curLvl1 = '';
		// 有展开第三级时，第二级的选中项
		var curLvl2 = '';
		// 已选中的条件
		// var conditionList = []; //{level: 1|2|3, content:'text', parent: ['sdf','asd'], status: 1}
		// var conditionList = this.state.conditionList;
		
		this.myChart = echarts.init(this.refs.chart);
		var chartRef = this.myChart;

		var option = {
			color: ['#7fa3df','#f195bc','#7bdda7','#f5e58e','#7f84df','#eaa97a','#e97c77'],
			series: [levelSeries[0]]
		};
		
		// chart数据在组件内部自己获取，不用store管理。
		// 一些图表交互操作会修改数据，数据获取封装在图表组件内部方便一点。
		$.ajax({
			// url: './json/digging_forum_circle_'+this.props.place+'.json',
			// url: './json/digging_forum_circle_api.json',
			url: ApiDomain + '/opinion/rest/mining/getSectionBySourceId.do',
			data: {
				sourceId: this.props.bbs.key,
			},
			"type": "get"
		})
		.done(function (re) {
			window.temp = re.data;
			var i;
			var built = buildData(re.data);
			datalvl1 = built.lv1;
			datalvl2 = built.lv2;
			datalvl3 = built.lv3;
			// datalvl1 = re.data.datalvl1;
			// datalvl2 = re.data.datalvl2;
			// datalvl3 = re.data.datalvl3;
			for (i = 0; i < datalvl1.length; i++) {
				datalvl1[i].label.normal.addBtnColor = toRgba(colors[i][colors[i].length - 1], 0.3);
			}
			levelSeries[0].data = datalvl1;
			// 模拟接口延时
			setTimeout(function () {
				chartRef.setOption(option);	
			}, 300);
			// chartRef.setOption(option);
		})
		.fail(function () {
			console.log("板块选择圆环数据获取失败!");
		});

		// console.log(conditionList);

		// this.myChart = echarts.init(this.refs.chart);
		// var chartRef = this.myChart;

		// var option = {
		// 	series: [levelSeries[0]]
		// };

		// chartRef.setOption(option);

		var showTip = this.props.showTip;
		var _this = this;

		chartRef.on("click", function (param) {
			// 从props中获取最新的conditions
			var conditionList = _this.props.conditions;
			// console.log(param);
			// console.log(conditionList);
			var targetType = param.event.target.type;
			var level = param.seriesIndex + 1;
			var condition = param.name;
			var conditionId = param.data.id;
			var i, j, hasCondition = false, parentCondition = '';

			if (targetType == 'rect') {
				if (conditionList.length >= 5) {
					showTip('最多只能选择5个条件!');
					// console.log(conditionList);
					return ;
				}
				// 判断当前级是否有添加相同条件
				for (i = 0; i < conditionList.length; i++) {
					if (conditionList[i].content == condition) {
						hasCondition = true;
						break;
					}
				}
				// 判断父级有没有被添加条件
				if (!hasCondition && level > 1) {
					for (i = 0; i < conditionList.length; i++) {
						if (conditionList[i].id == curLvl1 || conditionList[i].id == curLvl2) {
							hasCondition = true;
							parentCondition = conditionList[i].content;
						}
						if (hasCondition) {
							break;
						}
					}
				}
				if (parentCondition) {
					showTip('已添加本类上层级别 '+parentCondition+' 为条件!');
					return ;
				}
				// 如果没有重复的条件，且当前选择的是第一二级的条件。
				// 在添加之前剔除子集的条件。
				if (!hasCondition && level < 3) {
					for (i = 0; i < conditionList.length; i++) {
						for (j = 0; j < conditionList[i].parent.length; j++) {
							if (conditionList[i].parent[j] == conditionId) {
								conditionList[i].status = 0;	
							}
						}	
					}
					var tmpList = [];
					for (i = 0; i < conditionList.length; i++) {
						if (conditionList[i].status) {
							tmpList.push(conditionList[i]);
						}
					}
					conditionList = tmpList;
				}

				// 如果没有相同条件，且父级也未被添加为条件。添加新条件
				if (!hasCondition) {
					var newCondition = {
						level: level,
						content: condition,
						id: conditionId,
						parent: [],
						status: 1,
						color: ''
					};
					// 设置条件背景颜色
					for (i = 0; i < datalvl1.length; i++) {
						// if (datalvl1[i].name == curLvl1 || datalvl1[i].name == condition) {
						if (datalvl1[i].id == curLvl1 || datalvl1[i].name == condition) {
							newCondition.color = colors[i][0];
						}
					}
					// newCondition.color = colors[0][0];
					if (level > 1) {
						newCondition.parent.push(curLvl1);
						if (level > 2) {
							newCondition.parent.push(curLvl2);
						}
					}
					conditionList.push(newCondition);
					renderCondition(conditionList);
				}
				// console.log(conditionList);
			}
		});
		// 设置新条件
		var renderCondition =  function (conditionList) {
			this.props.updateCon(this.props.place, conditionList);
		}.bind(this);

		// 圆环图点击事件时，处理交互效果
		chartRef.on("pieselectchanged", function (param) {
			// console.log(param);
			var i, j, nextLevelData;
			var tmp = option.series;
			var selectedLevel = 0;

			// 当前展开的是第几层，第几块
			var level, block;
			// 判断当前选择事件发生在哪一级环上，结果可为0 1 2 3
			for (i = 0; i < tmp.length; i++) {
				for (j = 0; j < tmp[i].data.length; j++) {
					// if (param.name == tmp[i].data[j].name) {
					if (param.extra.id == tmp[i].data[j].id) {
						selectedLevel = i+1;
						level = i;
						block = j
					}
				}
			}
			// 只处理第一、二级环
			if (selectedLevel < 1  || selectedLevel > 2) {
				return ;
			}

			var curData = tmp[selectedLevel-1].data;	//当前环的数据
			var hasSelected = false;	//环上是否有选中的块
			var itemSelect = false;		//某一块的选中状态		
			// 设置当前环上各块的选中状态
			for (i = 0; i < curData.length; i++) {
				// itemSelect = param.selected[curData[i].name];
				// 当前name的数据选中状态为真，且数据id和当前操作id相符(因为可能有name相同的数据)。
				itemSelect = param.selected[curData[i].name] && curData[i].id == param.extra.id;
				curData[i].selected = itemSelect;
				curData[i].label.normal.show = itemSelect;
				if (itemSelect) {
					hasSelected = true;
					if (selectedLevel == 1) {
						// curLvl1 = curData[i].name;
						curLvl1 = curData[i].id;
					}
					else if (selectedLevel == 2) {
						// curLvl2 = curData[i].name;	
						curLvl2 = curData[i].id;	
					}
				}
			}
			if (!hasSelected) {
				if (selectedLevel == 1) {
					curLvl1 = '';
				}
				else if (selectedLevel == 2) {
					curLvl2 = '';	
				}
			}
			// 清除高于当前级别的环，刷新echart
			for (i = tmp.length; i > selectedLevel; i--) {
				tmp.pop();
			}
			chartRef.setOption(option, true);
			// 如果环上有选中的块，设置下一级环，否则重置各块为未选择中状态。
			if (hasSelected) {
				// 选择下一级的data
				if (selectedLevel == 1) {
					nextLevelData = datalvl2[curLvl1];
				} else {
					nextLevelData = datalvl3[curLvl2];
				}
				// 设置色块颜色
				var angleAndColor = setColor(nextLevelData, selectedLevel);
				for (i = 0; i < nextLevelData.length; i++) {
					nextLevelData[i].selected = false;
					nextLevelData[i].label.normal.show = true;
					nextLevelData[i].label.normal.addBtnColor = angleAndColor.addBtnColor;
				}
				levelSeries[selectedLevel].data = nextLevelData;
				levelSeries[selectedLevel].startAngle = angleAndColor.startAngle;
				tmp.push(levelSeries[selectedLevel]);
			} else {
				for (i = 0; i < curData.length; i++) {
					curData[i].selected = false;
					curData[i].label.normal.show = true;
				}
			}
			chartRef.setOption(option, true);
		});

		// 设置颜色
		function setColor (levelData, selectedLevel) {
		var i, j;
		var index1 = 0, index2 = 0;
		var cur1 = 0, total1 = 0;
		var cur2 = 0, total2 = 0;
		// 设置第三层颜色
		if (selectedLevel == 2) {
			for (i = 0; i < datalvl1.length; i++) {
				if (datalvl1[i].id == curLvl1) {
				// if (datalvl1[i].name == curLvl1) {
					index1 = i;
				}
				if (index1 == 0) {
					cur1 += datalvl1[i].value;
				}
				total1 += datalvl1[i].value;

			}
			for (i = 0; i < datalvl2[curLvl1].length; i++) {
				// if (datalvl2[curLvl1][i].name == curLvl2) {
				if (datalvl2[curLvl1][i].id == curLvl2) {
					index2 = i;
				}
				if (index2 == 0) {
					cur2 += datalvl2[curLvl1][i].value;
				}
				total2 += datalvl2[curLvl1][i].value;
			}
			for (i = 0; i < levelData.length; i++) {
				levelData[i].itemStyle = {
					normal: {
						color: colors[index1][index2]
					}
				};
				index2 += 1;
			}
		} else if (selectedLevel == 1) {
			for (i = 0; i < datalvl1.length; i++) {
				// if (datalvl1[i].name == curLvl1) {
				if (datalvl1[i].id == curLvl1) {
					index1 = i;
				}
				if (index1 == 0) {
					cur1 += datalvl1[i].value;
				}
				total1 += datalvl1[i].value;
			}
			for (i = 0; i < levelData.length; i++) {
				levelData[i].itemStyle = {
					normal: {
						color: colors[index1][index2]
					}
				};
				index2 += 1;
			}
		}
		// 开始角度
		var startAngle = 90;
		if (cur1 != total1) {
			startAngle = startAngle - (360 * cur1 / total1);
			if (startAngle < 0) {
				startAngle += 360;
			}
		}
		if (cur2 != total2) {
			startAngle = startAngle - (360 * cur2 / total2);
			if (startAngle < 0) {
				startAngle += 360;
			}
		}
		// 将按钮颜色转换为rgba，透明度0.3
		var rgba = toRgba(colors[index1][colors[index1].length - 1], 0.3);
		// var rgba = colors[index1][0];
		
		return {
			startAngle: startAngle,
			addBtnColor: rgba
		};
	}

		
		window.addEventListener('resize', this.chartResize);
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div>
				<div ref='chart' id={this.props.id} style={{width:'7rem',height:'7rem',margin:'0.25rem auto 0'}}></div>
				<div id="itemList"></div>
			</div>
		);
	}
});

export default ChartCircle;