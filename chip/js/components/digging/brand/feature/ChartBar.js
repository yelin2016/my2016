import React from 'react';

var ChartBar = React.createClass({
	componentDidMount: function () {
		var barColor = this.props.color || '#f77';

		this.myChart = echarts.init(this.refs.chart);
		var option = {
			animationDuration:500,
			title: {
				show: true,
				text: this.props.title,
				textStyle: {
					color: '#fff',
					fontSize: 14,
					fontWeight: 'lighter'
				},
				left: 'center',
				top: '5%'
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
				splitNumber: 20,
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				},
				data: ['开机', '推荐', '显示屏', '音响', '感光', '遥控器', '尺寸', '色彩']
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
					data: [1,2,3,4,5,6,7,8]
				}
			]
		};
		this.option = option;

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
		// 测试用
		// this.myChart.setOption(this.option);8
	},
	componentDidUpdate : function (prevProps) {
		if (this.props.stamp > prevProps.stamp) {
			var data = this.props.data;
			var cateData = [], seriesData = [];
			var i, j, tmp;

			for (i = 0; i < data.length; i++) {
				tmp = data[i].functionReputationList;
				for (j = 0; j < tmp.length; j++) {
					if (i == 0) {
						seriesData.push({
							name: tmp[j].subtypeLabelName,
							value: tmp[j].reputation || 0
						});
						cateData.push(tmp[j].subtypeLabelName);
					} else {
						seriesData[j].value += (tmp[j].reputation || 0) ;
					}
				}
			}
			this.option.xAxis.data = cateData;
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
			<div ref="chart" style={{width:'50%',height:'50%',float:'left'}}></div>
		);
	}
});

export default ChartBar;