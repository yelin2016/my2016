import React from 'react';

var ChartBar = React.createClass({
	componentDidMount: function () {
		var myChart = echarts.init(this.refs.bar);
		var option = {
			color: ['#7fa3df'],
			tooltip : {
				trigger: 'item',
				formatter: "{b} : {c}",
				textStyle: {
					color: '#63a1e9',
					fontSize:14,
				}
			},
			grid: {
			    show: true,
			    borderColor: '#233247'
			},
		 	xAxis: {
        type : 'category',
        splitNumber: 12,
        splitLine: {
        	show:false
        },
        axisLabel: {
        	textStyle: {
        		color: '#8ba7bf'
        	}
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        data: []
		  },
		  yAxis: {
	      type : 'value',
	      splitLine: {
	      	lineStyle: {
	      		color:'#233247'	      		
	      	}
        },
        axisLabel: {
        	textStyle: {
        		color: '#8ba7bf'
        	}
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
		  },
			series : [
				{
					name: '功能',
					type: 'bar',
					barCategoryGap: '50%',
					data:[]
				}
			]
		};
		this.option = option;

		this.myChart = myChart;
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	componentDidUpdate: function (preProps) {
		if (this.props.stamp > preProps.stamp) {
			var data = this.props.data;
			var seriesData = [];
			var axisData = [];
			for (var i = 0; i < data.length; i++) {
				seriesData.push({
					name: data[i].subtypeLabelName,
					value: data[i].reputation || Math.round(Math.random()*10)
				});
				axisData.push(data[i].subtypeLabelName);
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
			<div ref="bar" style={{height:'4rem'}}></div>
		);
	}
});

export default ChartBar;