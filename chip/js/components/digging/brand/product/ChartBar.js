import React from 'react';

var ChartBar = React.createClass({
	componentDidMount: function () {
		var barColor = '#7bdda7';

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
				textStyle: {
					color: '#8ba7bf'
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
				splitNumber: 9,
				splitLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				},
				// data: ['UD85C90001', '3D75C90001', 'C9000', 'C3419PD', 'UD49C6080ID', 'LEDC1000N', 'LEDC2000I', '3DC2000I','Q2F','Q2U']
				data: []
			},
			grid: {
				left: '5%',
				right: '5%',
				top: '20%',
				bottom: '5%',
				containLabel: true,
				show: true,
				borderColor: '#3f475e'
			},
			yAxis: [{
				type: 'value',
				name: '',
				max: 50,
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
					data: []
				}
			]
		};
		this.option = option;

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	componentDidUpdate : function (prevProps) {
		if (this.props.saleStamp > prevProps.saleStamp) {
			this.updateOption();
			this.myChart.setOption(this.option, true);
		}
	},
	updateOption: function () {
		var option = this.option;
		var saleData = this.props.saleData;
		var i, data = [], cateData = [];

		for (i = 0; i < saleData.length; i++) {
			data.push({
				name: saleData[i].productModel,
				value: saleData[i].saleCount
			});
			cateData.push(saleData[i].productModel)
		}
		option.xAxis.data = cateData;
		option.series[0].data = data;
		// option.xAxis.data = [];
		// option.series[0].data = [];
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div ref="chart" style={{width:'70%',height:'100%',float:'left'}}></div>
		);
	}
});

export default ChartBar;