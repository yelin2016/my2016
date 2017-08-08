import React from 'react';

var color = ['#f195bc', '#7bdda7', '#eaa97a', '#7f84df', '#68b4ee','#f5e58e'];
var Chartpie = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);
		var tarr = ['长虹','小米','乐视','TCL','创维','海信'];
		
		var option = {
			tooltip: {
				show: true,
				// position: 'inside',
				backgroundColor: 'rgba(28,43,64,0.8)',
				enterable: true,
				trigger: 'item',
				formatter: '{b}<br/>{a}: {c}<br/>占比: {d}%',
				textStyle: {
					color: '#8ba7bf'
				},
				extraCssText: 'text-align: left;'
			},
			legend: {
				show: true,
				// zlevel: 100,
				orient : 'vertical',
				x : 'right',
				y:'top',
				textStyle : {
					color : '#68849d',
				},
				data: ['长虹','小米','乐视','TCL','创维','海信']
			},
			series:  [
				{
					name:"回复量",
					type:'pie',
					center:["20%","50%"],
					radius: ['40%', '55%'],
					data:[],
					label: {
						normal: {
							show: false
						}
					}
				},
				{
					name:'回复量',
					type:'pie',
					center:["50%","50%"],
					radius: ['40%', '55%'],
					data:[],
					label: {
						normal: {
							show: false
						}
					}
				},
				{
					tooltip: {
						show: false
					},
					name:'回复量',
					type:'pie',
					center:["80%","50%"],
					radius: ['40%', '55%'],
					data:[],
					label: {
						normal: {
							show: false
						}
					},
					markPoint:{
						tooltip: {
							show: false,
							showContent: false
						},
						label: {
							normal: {
								show: true,
								position: 'inside',
								formatter: '{b}'
							},
						},
						itemStyle:{
							normal: {
								color:"#3F475E"
							},
							emphasis: {
								color:"#3F475E"
							}
						},
						data: [
					    {
				        name: '关注度',
				        value: 1,
				        symblo:"circle",
								tooltip:{show: false},
				        x: this.myChart.getWidth()*0.8,
				        y: this.myChart.getHeight()*0.6,
							},
							{
				        name: '回复量',
				        value: 2,
				        symblo:"circle",
				        tooltip:{show: false},
				        x: this.myChart.getWidth()*0.2,
				        y: this.myChart.getHeight()*0.6
							},
							{
				        name: '点击量',
				        value: 3,
				        symblo:"circle",
								tooltip:{show: false},
				        x: this.myChart.getWidth()*0.5,
				        y: this.myChart.getHeight()*0.6,
							}
						]
          }
				}
			]
		};


		this.option = option;

		// 初始化时绘制一次
		this.drawChart();
		
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	drawChart: function () {
		this.updateOption();
		this.myChart.setOption(this.option);
	},
	componentDidUpdate: function (prevProps) {
		var dataChg = this.props.timestamp > prevProps.timestamp;
		var rangeChag = this.props.range.start != prevProps.range.start || this.props.range.end != prevProps.range.end;
		if (dataChg || rangeChag) {
			this.drawChart();
		}
	},
	updateOption: function () {
		var i, j, tmp;
		var data_hf = [], data_dj = [], data_gz = [];
		var hf, dj, gz;
		var data = this.props.chartData;
		var dateList = this.props.dateList;
		var range = this.props.range;

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
			data_hf.push({value: hf, name:data[i].brandName, itemStyle: {normal: {color: color[i]}}})
			data_dj.push({value: dj, name:data[i].brandName, itemStyle: {normal: {color: color[i]}}})
			data_gz.push({value: gz, name:data[i].brandName, itemStyle: {normal: {color: color[i]}}})
		}
		this.option.series[0].data = data_hf;
		this.option.series[1].data = data_dj;
		this.option.series[2].data = data_gz;
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render:function(){
		return(
			<div className="chartpie-box">
				<div ref='chart' id={this.props.id} style={{width:'16rem',height:'4rem',margin:'0 auto'}}></div>
			</div>
		);
	}
})

export default Chartpie;