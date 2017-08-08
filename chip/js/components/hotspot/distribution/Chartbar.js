import React from 'react';

var bbsList = ['长虹','小米','乐视','创维','海信','TCL'];
var bbsMap = {
	'长虹':'ch',
	'小米':'xm',
	'乐视':'ls',
	'创维':'cw',
	'海信':'hx',
	'TCL':'tcl'
}

var Chartbar = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);

		// 柱状图option
		var option = {
			color: ['#f195bc','#75cc9c','#6aaefc'],
			grid: {
				show: true,
				backgroundColor: '#233247',
				z: -10,
				borderWidth: 0
			},
			legend: {
				show: true,
				right: '10%',
				textStyle:{
						color:'#8ba7bf',
				},
				data:['回复量','点击量','关注度']
			},
			tooltip: {
				show: true,
				backgroundColor: 'rgba(28,43,64,0.8)',
				enterable: true,
				trigger: 'axis',
				formatter: '{b0}<br/>{a0} {c0}<br/>{a1} {c1}<br/>{a2} {c2}',
				onlyOneAxisTip: true,
				textStyle: {
					color: '#8ba7bf'
				},
				extraCssText: 'text-align: left;'
			},
			xAxis: [
				{
					type : 'category',
					data : bbsList,
					axisLabel:{
						textStyle:{
							color:'#8ba7bf',
						}
					},
					splitLine: {
						lineStyle: {
							color: '#3f475e'
						}
					}
				},
				{
					type : 'category',
					data : [],
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel:{
						show: false
					},
					splitLine: {
						show: false
					}
				}
			],
			yAxis: [
				{
					name:'点击量/回复量',
					position:'left',
					nameTextStyle:{
							color:'#8ba7bf'
					},
					type: 'value',
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
				{
					name:'关注度',
					position:'right',
					type: 'value',
					nameTextStyle:{
						color:'#8ba7bf'
					},
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
						},
						show:false
					}
			}],
			series: [
				{
					name:'回复量',
					type:'bar',
					barWidth:30,
					barGap : '5%',
					data:[]
				},
				{
					name:'点击量',
					type:'bar',
					barWidth:30,
					barGap : '40%',
					smooth:true,
					symbol: 'none',
					data:[]
				},
				{
					name:'关注度',
					type:'line',
					symbol:'circle',
					yAxisIndex: 1,
					data:[]
				}
			]
		};
		this.option = option;

		// 滑动条范围指示，包含开始和结束点，默认30天
		var range = {
			start: 0,
			end: 29
		};
		this.range = range;

		// 初始化时绘制一次
		this.drawChart();

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	// 更新option，滑动条范围变化之后需要重设柱状图数据
	updateOption: function () {
		var i, j, tmp;
		var gz, hf, dj;
		var option = this.option;
		var range = this.props.range;
		var data = this.props.chartData;
		var dateList = this.props.dateList;
		var brandData = this.props.brandData;
		var brand = this.props.brand;
		var bl = [];

		for (i = 0; i < brandData.length; i++) {
			if (brand[brandData[i].key]) {
				bl.push(brandData[i].info);
			}
		}

		option.series[0].data = [];
		option.series[1].data = [];
		option.series[2].data = [];
		option.xAxis[0].data=bl;

		// 遍历各品牌数据
		for (i = 0; i < data.length; i++) {
			hf = 0;
			dj = 0;
			gz = 0;
			// 将当前选择时间范围内的数据加起来
			for (j = range.start; j <= range.end; j++) {
				tmp = data[i].brandDistribution[dateList[j]];
				hf += tmp ? tmp.totalReplyCount : 0;
				dj += tmp ? tmp.totalBrowseCount : 0;
				gz += tmp ? tmp.totalFocusCount : 0;
			}
			option.series[0].data.push(hf);
			option.series[1].data.push(dj);
			option.series[2].data.push(gz);
		}
	},
	drawChart: function () {
		this.updateOption();
		this.myChart.setOption(this.option,true);
	},
	componentDidUpdate: function (prevProps) {
		var dataChg = this.props.timestamp > prevProps.timestamp;
		var rangeChag = this.props.range.start != prevProps.range.start || this.props.range.end != prevProps.range.end;
		if (dataChg || rangeChag) {
			this.drawChart();
		}
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div>
				<div ref='chart' id={this.props.id} style={{width:'16rem',height:'7rem',margin:'0 auto'}}></div>
			</div>
		);
	}
});

export default Chartbar;