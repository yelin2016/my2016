import React from 'react';

var colors = [
	['#6aaefc'],
	['#c22b44','#e79719','#f2d139','#2eb8db']
];
var formatters = [
	'{b}<br />舆情: {c0}',
	'{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}'
];

var ChartLine = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);
		var option = {
			animationDuration:500,
			title: {
				show: false
			},
			color: ['#6aaefc'],
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					lineStyle: {
						color: '#8ba7bf'
					}
				},
				textStyle: {
					color: '#8ba7bf'
				},
				formatter: '{b}<br />{a0}: {c0}'
			},
			legend: {
				left: 'left',
				data: ['2的指数', '3的指数']
			},
			xAxis: {
				type: 'category',
				name: 'x',
				boundaryGap: false,
				axisLine: {
					lineStyle: {
						color: '#3f475e'
					}
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				},
				data: []
			},
			grid: {
				left: '3%',
				right: '6%',
				bottom: '3%',
				top: '5%',
				containLabel: true
			},
			yAxis: {
				type: 'value',
				name: 'y',
				max: 50,
				axisLine: {
					lineStyle: {
						color: '#3f475e'
					}
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				}
			},
			series: [
				{
					name: '红色',
					type: 'line',
					symbol: 'circle',
					data: []
				},
				{
					name: '橙色',
					type: 'line',
					symbol: 'circle',
					data: []
				},
				{
					name: '黄色',
					type: 'line',
					symbol: 'circle',
					data: []
				},
				{
					name: '蓝色',
					type: 'line',
					symbol: 'circle',
					data: []
				}
			]
		};
		this.option = option;

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	componentDidUpdate: function (prevProps, prevState) {
		// debugger;
		var option = this.option;
		// 时间戳更新，数据更新成功
		var dataChg = this.props.stamp > prevProps.stamp;
		// 显示类型切换
		var typeChg = prevProps.cur != this.props.cur;

		if (dataChg || typeChg) {
			this.updateOption();
			this.myChart.setOption(option, true);
		}
	},
	// 数据变化或显示分类切换时，更新option
	updateOption: function () {
		var i, j, data0;
		var option = this.option;
		var trendData = this.props.trend;
		var md = [];
		var max = 0;
		// 指定从第几个数据开始设置series，总走势从第一个开始
		var startLine = this.props.cur == 1 ? 1 : 0;
		var limit = startLine == 0 ? 1 : 5;
		limit = limit > trendData.length ? trendData.length : limit;

		// 设置分级、总走势图的不同颜色，tooltip格式
		option.color = colors[this.props.cur];
		option.tooltip.formatter = formatters[this.props.cur];

		option.xAxis.data = [];
		option.series.forEach(function (value, index) {
			value.data = [];
		});

		data0 = trendData[0].warnInfos;
		// 设置x轴时间刻度
		for (i = 0; i < data0.length; i++) {
			md = data0[i].date.split('-');
			md.shift();
			option.xAxis.data.push(md.join('.'));
		}
		// 设置series的值
		j = 0;
		for (i = startLine; i < limit; i++) {
			data0 = this.props.trend[i].warnInfos;
			if (j < option.series.length) {
				data0.forEach(function (value, index) {
					max = max < value.articleCount ? value.articleCount : max;
					option.series[j].data.push(value.articleCount);
				});
				j++;
			}
		}

		// 设置最大值，10的倍数增长
		max = Util.yAxisMax(max);
		option.yAxis.max = max;
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div ref="chart" style={{width:'100%',height:'100%'}}>
			</div>
		);
	}
});

export default ChartLine;