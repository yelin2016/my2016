import React from 'react';

var filterMap = {
	1:'focusCount',
	2:'clickCount',
	3:'replyCount',
	4:'articleCount'
};

var BarChart = React.createClass({
	componentDidMount: function () {
		var barColor = this.props.color;

		this.myChart = echarts.init(this.refs.chart);
		var option = {
			animationDuration:500,
			title: {
				show: false
			},
			color: [barColor],
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					lineStyle: {
						color: '#8ba7bf'
					}
				},
				formatter: '{b}: {c0}'
			},
			xAxis: {
				type: 'category',
				name: '',
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
				data: ['抽奖', '抽奖', '抽奖', '抽奖', '抽奖', '抽奖', '抽奖']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
				show: true,
				borderColor: '#3f475e'
			},
			yAxis: [{
				type: 'value',
				name: '',
				// max: 50,
				axisLine: {
					lineStyle: {
						color: '#3f475e'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#3f475e'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				}
			}],
			series: [
				{
					name: 'TCL',
					type: 'bar',
					barCategoryGap: '50%',
					barMaxWidth: '100',
					data: [0,0,0,0,0,0,0]
				}
			]
		};
		// 
		this.option = option;
		// this.myChart.setOption(option);
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	componentDidUpdate : function (prevProps) {
		if (this.props.stamp > prevProps.stamp || this.props.filter != prevProps.filter) {
			var i, axisData = [], seriesData = [];
			var data = this.props.data;
			var dataKey = filterMap[this.props.filter];

			for (i = 0; i < data.length; i++) {
				axisData.push(data[i].sectionName);
				// seriesData.push(data[i].focusCount);
				seriesData.push(data[i][dataKey]);
			}
			this.option.xAxis.data = axisData;
			this.option.series[0].data = seriesData;
			this.myChart.setOption(this.option);
		}
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

export default BarChart;