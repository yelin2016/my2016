import React from 'react';

var data = {
	ch:[{"date":"2015-01-01","hf":10,"dj":8,"gz":5},{"date":"2015-01-02","hf":1,"dj":1,"gz":1},{"date":"2015-01-03","hf":1,"dj":1,"gz":1},{"date":"2015-01-04","hf":1,"dj":1,"gz":1},{"date":"2015-01-05","hf":1,"dj":1,"gz":1},{"date":"2015-01-06","hf":1,"dj":1,"gz":1},{"date":"2015-01-07","hf":1,"dj":1,"gz":1},{"date":"2015-01-08","hf":1,"dj":1,"gz":1},{"date":"2015-01-09","hf":1,"dj":1,"gz":1},{"date":"2015-01-10","hf":1,"dj":1,"gz":1}],
	xm:[{"date":"2015-01-01","hf":8,"dj":1,"gz":1},{"date":"2015-01-02","hf":1,"dj":1,"gz":1},{"date":"2015-01-03","hf":1,"dj":1,"gz":1},{"date":"2015-01-04","hf":1,"dj":1,"gz":1},{"date":"2015-01-05","hf":1,"dj":1,"gz":1},{"date":"2015-01-06","hf":1,"dj":1,"gz":1},{"date":"2015-01-07","hf":1,"dj":1,"gz":1},{"date":"2015-01-08","hf":1,"dj":1,"gz":1},{"date":"2015-01-09","hf":1,"dj":1,"gz":1},{"date":"2015-01-10","hf":1,"dj":1,"gz":1}],
	ls:[{"date":"2015-01-01","hf":1,"dj":1,"gz":1},{"date":"2015-01-02","hf":1,"dj":1,"gz":1},{"date":"2015-01-03","hf":1,"dj":1,"gz":1},{"date":"2015-01-04","hf":1,"dj":1,"gz":1},{"date":"2015-01-05","hf":1,"dj":1,"gz":1},{"date":"2015-01-06","hf":1,"dj":1,"gz":1},{"date":"2015-01-07","hf":1,"dj":1,"gz":1},{"date":"2015-01-08","hf":1,"dj":1,"gz":1},{"date":"2015-01-09","hf":1,"dj":1,"gz":1},{"date":"2015-01-10","hf":1,"dj":1,"gz":1}],
	cw:[{"date":"2015-01-01","hf":1,"dj":1,"gz":1},{"date":"2015-01-02","hf":1,"dj":1,"gz":1},{"date":"2015-01-03","hf":1,"dj":1,"gz":1},{"date":"2015-01-04","hf":1,"dj":1,"gz":1},{"date":"2015-01-05","hf":1,"dj":1,"gz":1},{"date":"2015-01-06","hf":1,"dj":1,"gz":1},{"date":"2015-01-07","hf":1,"dj":1,"gz":1},{"date":"2015-01-08","hf":1,"dj":1,"gz":1},{"date":"2015-01-09","hf":1,"dj":1,"gz":1},{"date":"2015-01-10","hf":1,"dj":1,"gz":1}],
	hx:[{"date":"2015-01-01","hf":1,"dj":1,"gz":1},{"date":"2015-01-02","hf":1,"dj":1,"gz":1},{"date":"2015-01-03","hf":1,"dj":1,"gz":1},{"date":"2015-01-04","hf":1,"dj":1,"gz":1},{"date":"2015-01-05","hf":1,"dj":1,"gz":1},{"date":"2015-01-06","hf":1,"dj":1,"gz":1},{"date":"2015-01-07","hf":1,"dj":1,"gz":1},{"date":"2015-01-08","hf":1,"dj":1,"gz":1},{"date":"2015-01-09","hf":1,"dj":1,"gz":1},{"date":"2015-01-10","hf":1,"dj":1,"gz":1}],
	tcl:[{"date":"2015-01-01","hf":1,"dj":1,"gz":1},{"date":"2015-01-02","hf":1,"dj":1,"gz":1},{"date":"2015-01-03","hf":1,"dj":1,"gz":1},{"date":"2015-01-04","hf":1,"dj":1,"gz":1},{"date":"2015-01-05","hf":1,"dj":1,"gz":1},{"date":"2015-01-06","hf":1,"dj":1,"gz":1},{"date":"2015-01-07","hf":1,"dj":1,"gz":1},{"date":"2015-01-08","hf":1,"dj":1,"gz":1},{"date":"2015-01-09","hf":1,"dj":1,"gz":1},{"date":"2015-01-10","hf":1,"dj":1,"gz":1}]
};
var bbsList = ['长虹','小米','乐视','创维','海信','TCL'];
var bbsMap = {
	'长虹':'ch',
	'小米':'xm',
	'乐视':'ls',
	'创维':'cw',
	'海信':'hx',
	'TCL':'tcl'
}

var ChartSlider = React.createClass({
	componentDidMount: function () {
		this.slider = echarts.init(this.refs.slider);

		var option = {
			xAxis: [
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
			grid: {
				show: false,
				height: 50,
				z: 1
			},
			yAxis: [
				{
					position:'left',
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
			dataZoom: [
				{
					type: 'slider',
					xAxisIndex: 0,
					show: true,
					top: 'middle',
					dataBackgroundColor: '#233247',
					handleColor: 'rgba(106,174,252,0.8)',
					fillerColor: 'rgba(106,174,252,0.3)',
					textStyle: {
						color: '#ffffff'
					},
					startValue: 0,
					endValue: 29
				}
			],
			series: [
				{
					name:'tmp',
					type:'line',
					xAxisIndex: 0,
					symbolSize: 0,
					showSymbol: false,
					itemStyle: {
						normal: {
							color: 'rgba(0,0,0,0)'
						}
					},
					lineStyle: {
						normal: {
							color: 'rgba(0,0,0,0)'
						}
					},
					areaStyle: {
						normal: {
							color: 'rgba(0,0,0,0)'
						}
					},
					markPoint: {
						itemStyle: {
							normal: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data:[],
					z: 1
				}
			]
		};
		this.option = option;

		this.slider.on('datazoom', this.handleZoom);

		this.sliderResize = this.slider.resize;
		window.addEventListener('resize', this.sliderResize);
	},
	handleZoom: function (event) {
		var start = event.start;
		var end = event.end;
		var datalen = this.props.dateList.length - 1;		// 10条数据只有9个分段，所以要减一

		start = Math.round(datalen/100*start);
		end = Math.round(datalen/100*end);
		this.props.chgRange(start, end);
	},
	// 设置滑动条，只用获取最新数据后设置一次
	setSlider: function () {
		var option = this.option;
		var firstBrand = bbsMap[bbsList[0]];
		var i, j, k, dayCount;
		var dateList = this.props.dateList;
		var data = this.props.chartData;
		var curBrandDay;	//某个品牌某一天的数据

		option.xAxis[0].data = [];
		option.series[0].data = [];
		for (i = 0; i < dateList.length; i++) {
			// x轴数据
			option.xAxis[0].data.push(dateList[i]);
			dayCount = 0;
			for (j = 0; j < data.length; j++) {
				curBrandDay = data[j].brandDistribution[dateList[i]];
				if (curBrandDay) {
					dayCount = dayCount + curBrandDay.totalBrowseCount + curBrandDay.totalFocusCount + curBrandDay.totalReplyCount;
				}
			}
			// y轴数据，每一天的各品牌点击，关注、回复数之和
			option.series[0].data.push(dayCount);
		}
		// 设置起始点
		option.dataZoom[0].startValue = this.props.range.start;
		option.dataZoom[0].endValue = this.props.range.end;
		this.slider.setOption(option);
	},
	componentDidUpdate: function (prevProps) {
		if (this.props.timestamp > prevProps.timestamp) {
			this.setSlider();
		}
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.sliderResize);
		this.slider.dispose();
	},
	render: function () {
		return (
			<div ref='slider' style={{width:'16rem',height:'1rem',margin:'0 auto'}}></div>
		);
	}
});

export default ChartSlider;