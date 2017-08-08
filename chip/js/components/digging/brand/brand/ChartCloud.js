import React from 'react';

// 点位
var pos = {
	// 热帖点位置
	rt: [
		{x: -245, y: 190},
		{x: -230, y: 215}
	],
	// 热点事件点位
	rdsj: [
		{x: -210, y: 240},
		{x: -200, y: 210},
		{x: -200, y: 265}
	],
	// 热点产品点位
	rdcp: [
		{x: -210, y: 290},
		{x: -250, y: 280},
		{x: -275, y: 300}
	],
	// 热点新闻点位
	rdxw: [
		{x: -300, y: 270},
		{x: -280, y: 240}
	],
	//活动点位置
	hd: [
		{x: -290, y: 210},
		{x: -260, y: 220}
	]
};

// 类型和分类号映射
var typeMap = {
	rt: {key: '热帖', val:0},
	rdsj: {key: '热点事件', val:1},
	rdcp: {key: '热点产品', val:2},
	rdxw: {key: '热点新闻', val:3},
	hd: {key: '活动', val:4},
	pp: {key: '品牌', val:5}
};

// id对应数据映射
var idMap = {};

// 生成点位和链接数据
function getNodes (dataList) {
	var i, k, tmp, data = [], link = [];
	var idIndex = 0;
	var curList = [];
	data.push({
		category: 5,
		id: 0,
		label: {normal: {show: true}},
		name: '长虹',
		symbolSize: 40,
		value: 50,
		x: -250,
		y: 250
	});
	idMap = {};
	for (k in pos) {
		for (i = 0; i < dataList.length; i++) {
			// if (dataList[i].typeLabelName == typeMap[k].key) {
			if (dataList[i].hotpointTypeName == typeMap[k].key) {
				curList = dataList[i].cloudChartInfoList;
			}
		}
		for (i = 0; i < pos[k].length; i++) {
		// for (i = 0; i < curList.length; i++) {
			idIndex += 1;

			// idMap[idIndex] = curList[i];
			idMap[idIndex] = {
				type: typeMap[k].key,
				data: curList[i]
			}

			var itemName = i < curList.length ? curList[i].objectTitle : '';
			if (itemName.length > 4) {
				var chars = itemName.split('');
				itemName = '';
				for (var j = 0; j < chars.length; j++) {
					if (j >= 12) {
						itemName += '...';
						break;
					}
					if (j > 0 && j % 4 == 0) {
						itemName += '\n';
					}
					itemName += chars[j];
				}
			}

			tmp = {
					category: typeMap[k].val,
					id: idIndex,
					label: {normal: {show: true}},
					// name: i == 0 ? typeMap[k].key : typeMap[k].key.substring(2)+i,
					// name: i < curList.length ? curList[i].objectTitle : '',
					name: itemName,
					// symbolSize: i == 0 ? 30 : 20,
					symbolSize: itemName.length > 8 ? 30 : 20,
					value: Math.round(Math.random()*9)+1,
					x: pos[k][i].x,
					y: pos[k][i].y
			}
			data.push(tmp);
			link.push({
				source: idIndex,
				target: 0
			});
		}
	}
	return {
		data: data,
		link: link
	};
}

var ChartCloud = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);
		var chartRef = this.myChart;		

		// var nodes = getNodes(this.props.data);
		var option = {
			title: {
				show: false,
				text: 'Les Miserables',
				subtext: 'Default layout',
				top: 'bottom',
				left: 'right'
			},
			tooltip: {},
			legend: {
				show: false
			},
			series : [
				{
					name: 'cloud',
					type: 'graph',
					// data: nodes.data,
					data: [],
					// links: nodes.link,
					links: [],
					color: ['#eaa97a','#ebc8af','#6aaefc','#94b8e2'],
					categories: [
						{name: '热帖'},
						{name: '热点事件'},
						{name: '热点新闻'},
						{name: '热点产品'},
						{name: '活动'},
						{
							name: '品牌',
							itemStyle: {
								normal: {
									color: '#eaa97a'
								}
							}
						},
					],
					roam: false,
					label: {
						normal: {
							show: false,
							formatter: '{b}',
							textStyle: {
								color: '#404040'
							},
							// position: 'insideTop'
						},
						emphasis: {
							show: false
						}
					},
					lineStyle: {
						normal: {
							curveness: 0
						}
					}
				}
			]
		};

		this.option = option;


		// this.myChart.setOption(option);
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
		// test
		// chartRef.setOption(option);
		var showDetail = this.showDetail;
		chartRef.on('click', function (param) {
			// if(param.data.name) {
			if(idMap[param.data.id]) {
				// console.log(param);
				// console.log(idMap[param.data.id]);
				var curItem = idMap[param.data.id];
				showDetail(curItem, param.data.id);
			}
		});
	},
	// 显示详情弹框
	showDetail: function (item, id, data) {
		// todo_ 热帖类型只有一条数据
		// var type = id > 0 && id < 6 ? 'single': '';
		var type = 'single';
		this.props.toggle({
			show: true,
			name: item.type,
			id: id,
			type: type,
			data: item.data
		});
	},
	/**
	 * 更新otion
	 * @return {[type]} [description]
	 */
	updateOption: function () {
		var data = this.props.data;
		var option = this.option;
		var date = [];
		var numData = [];
		var riskData = [];
		for (var i = 0; i < data.length; i++) {
			date.push(data[i].warningDate);
			numData.push(data[i].warningTotal);
			riskData.push(data[i].riskValue);
		}
		option.xAxis.data = date;
		option.series[0].data = numData;
		option.series[1].data = riskData;
	},
	/**
	 * 绘制图表
	 * @return {[type]} [description]
	 */
	drawChart: function () {
		var option = this.option;
		this.myChart.setOption(option);
	},
	componentDidUpdate: function (prevProps) {
		if (prevProps.stamp < this.props.stamp) {
			var nodes = getNodes(this.props.data);
			this.option.series[0].data = nodes.data;
			this.option.series[0].links = nodes.link;
			this.myChart.setOption(this.option);
		}
		// var option = this.option;
		// // 时间戳更新，数据更新成功
		// var dataChg = this.props.stamp > prevProps.stamp;

		// if (dataChg) {
		// 	this.updateOption();
		// 	this.drawChart(this.props.data);
		// }
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div ref='chart' id={this.props.id} style={{width:'100%',height:'100%'}}></div>
		);
	}
});

export default ChartCloud;