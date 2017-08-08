import React from 'react';

var ChartPie = React.createClass({
	componentDidMount: function () {
		var myChart = echarts.init(this.refs.pie);
		var option = {
			color: ['#c97c77','#7fa3df','#7bdda7','#f5e58e','#7f84df','#eaa97a'],
			tooltip : {
				trigger: 'item',
				formatter: "{a} : {b}<br/>销量 : {c} ({d}%)",
				textStyle: {
					color: '#63a1e9',
					fontSize:14,
				}
			},
			series : [
				{
					name: '品牌',
					type: 'pie',
					radius : '50%',
					center: ['50%', '50%'],
					label: {
						normal: {
							position: 'right-angle'
						}
					},
					labelLine: {
						normal: {
							length: 0,
							length2: 30
						}
					},
					data:[
						{value:335, name:'长虹'},
						{value:310, name:'康佳'},
						{value:234, name:'TCL'},
						{value:135, name:'乐视'},
						{value:1548, name:'创维'}
					]
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
			for (var i = 0; i < data.length; i++) {
				seriesData.push({
					name: data[i].brandName,
					value: data[i].brandMoney
				});
			}
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
			<div ref="pie" style={{height:'4rem'}}></div>
		);
	}
});

export default ChartPie;