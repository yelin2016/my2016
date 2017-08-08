import React from 'react';

var ChartLine = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);
		var chartRef = this.myChart;		

		var option = {
			color: ['#6aaefc','#f0e296'],
			grid: {
				show: true,
				backgroundColor: '#233247',
				z: -10,
				borderWidth: 0
			},
			tooltip: {
				show: true,
				trigger: 'axis'
			},
			legend: {
				show: true,
				top: 35,
				right: '10%',
				textStyle: {
					color: '#8ba7bf'
				},
				data: ['关注度走势','xx']
			},
			xAxis: {
        type: 'category',
        splitNumber: 30,
        boundaryGap: false,
        axisLine: {
        	lineStyle: {
        		color: '#233247'
        	}
        },
        axisLabel: {
					rotate: 45,
					textStyle: {
						color: '#8ba7bf'
					}
				},
				splitLine: {
          show: false
        },
        axisTick: {
          inside: true,
          lineStyle: {
          	color: '#4e5770'
          }
        },
        data: ["2015-1-1", "2015-1-2", "2015-1-3", "2015-1-4", "2015-1-5", "2015-1-6", "2015-1-7", "2015-1-8", "2015-1-9", "2015-1-10", "2015-1-11", "2015-1-12", "2015-1-13", "2015-1-14", "2015-1-15", "2015-1-16", "2015-1-17", "2015-1-18", "2015-1-19", "2015-1-20", "2015-1-21", "2015-1-22", "2015-1-23", "2015-1-24", "2015-1-25", "2015-1-26", "2015-1-27", "2015-1-28", "2015-1-29", "2015-1-30"]
    	},
	    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				},
				axisLine: {
					show: false
				},
				axisTick: {
          show: false
        },
        splitLine: {
        	lineStyle: {
        		color: '#3f475e'
        	}
        }
	    },
	    series: [
        {
          name:'关注度走势',
          type:'line',
          smooth:true,
          symbol: 'circle',
          data:[5, 1, 1, 7, 8, 10, 6, 2, 4, 6, 1, 9, 9, 4, 8, 2, 6, 4, 9, 3, 5, 1, 8, 2, 3, 7, 2, 10, 6, 4]
        },
        {
          name:'xx',
          type:'line',
          smooth:true,
          symbol: 'none',
          data:[5, 7, 1, 4, 1, 1, 2, 5, 2, 4, 7, 10, 10, 7, 1, 10, 5, 2, 6, 7, 1, 6, 4, 8, 7, 3, 9, 6, 3, 3]
        }
	    ]
		};

		this.option = option;


		// this.myChart.setOption(option);
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
		// test
		chartRef.setOption(option);
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
	componentDidUpdate: function (prevProps, prevState) {
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
			<div ref='chart' id={this.props.id} style={{width:'100%',height:'5.88rem'}}></div>
		);
	}
});

export default ChartLine;