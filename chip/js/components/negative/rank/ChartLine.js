import React from 'react';

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
				axisLine: {
					show: false
				},
				axisTick: {
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
				show: true,
				left: 50,
				right: 10,
				bottom: 25,
				top: 10,
				containLabel: false,
				borderColor: '#3f475e'
				// containLabel: true
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
				axisLine: {
					show: false
				},
				axisTick: {
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
					name: '关注度',
					type: 'line',
					symbol: 'circle',
					data: []
				}
			]
		};
		this.option = option;

		// 列表是接口返回之后才渲染，初始化时已经有数据了，可以绘制图表。
		this.updateOption();
		this.myChart.setOption(option, true);

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	componentDidUpdate: function (prevProps, prevState) {
		var option = this.option;
		// 时间戳更新，数据更新成功
		var dataChg = this.props.stamp > prevProps.stamp;

		if (dataChg) {
			this.updateOption();
			this.myChart.setOption(option, true);
		}
	},
	// 数据变化或显示分类切换时，更新option
	updateOption: function () {
		var i;
		var option = this.option;
		var trendData = this.props.trend;
		var md = [];
		var max = 0;

		option.xAxis.data = [];
		option.series[0].data = [];

		// 设置x轴时间刻度
		for (i = 0; i < trendData.length; i++) {
			md = trendData[i].date.split('-');
			md.shift();
			option.xAxis.data.push(md.join('.'));
		}
		// 设置series的值
		trendData.forEach(function (value, index) {
			max = max < value.focus ? value.focus : max;
			option.series[0].data.push(value.focus);
		});

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
			<div ref="chart" style={{height: '100%', width: '3.2rem', float: 'left', marginLeft: '0.2rem'}}></div>
		);
	}
});

export default ChartLine;