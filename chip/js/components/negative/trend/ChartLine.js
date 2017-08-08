import React from 'react';

var ChartLine = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);
		var chartRef = this.myChart;

		var option = {
			color: ['#6aaefc','#c22b44'],
			grid: {
				show: true,
				backgroundColor: '#233247',
				z: -10,
				borderWidth: 0
			},
			tooltip: {
				show: true,
				trigger: 'axis',
				textStyle: {
					color: '#8ba7bf'
				}
			},
			legend: {
				show: true,
				top: 35,
				right: '10%',
				textStyle: {
					color: '#8ba7bf'
				},
				data: ['负面舆情走势','风险值']
			},
			xAxis: {
        // type: 'time',
        type: 'category',
        splitNumber: 30,
        // interval: 24*3600*1000,
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
          length: 8,
          lineStyle: {
          	color: '#4e5770'
          }
        },
        data: []
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
	    dataZoom: [{
        type: 'inside',
        startValue: 0,
        endValue: 29
	    }, {
	    		show: true,
	    		top: 'top',
	    		// backgroundColor: 'rgba(78,87,112,0.4)',
	    		dataBackgroundColor: '#233247',
	    		handleColor: 'rgba(106,174,252,0.8)',
	    		fillerColor: 'rgba(106,174,252,0.3)',
	    		textStyle: {
	    			color: '#ffffff'
	    		},
	        startValue: 0,
        	endValue: 29
	    }],
	    series: [
	        {
	            name:'负面舆情走势',
	            type:'line',
	            smooth:true,
	            symbol: 'circle',
	            data:[]
	        },
	        {
	            name:'风险值',
	            type:'line',
	            smooth:true,
	            symbol: 'none',
	            data:[]
	        }
	    ]
		};
		this.option = option;

		// this.myChart.setOption(option);
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
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
		if (data.length < 30) {
			option.dataZoom[0].endValue = data.length - 1;
			option.dataZoom[1].endValue = data.length - 1;
		}
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
		var option = this.option;
		// 时间戳更新，数据更新成功
		var dataChg = this.props.stamp > prevProps.stamp;

		if (dataChg) {
			this.updateOption();
			this.drawChart(this.props.data);
		}
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div ref='chart' id={this.props.id} style={{width:'16rem',height:'8rem',margin:'0 auto'}}></div>
		);
	}
});

export default ChartLine;