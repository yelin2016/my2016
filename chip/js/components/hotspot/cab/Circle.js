import React from 'react';

var color = ['#ff6c45', '#ff8745', '#ff9d45', '#ffbb45', '#ffd145', '#ffe345'];

var Circletype = React.createClass({
	componentDidMount: function () {
		this.myChart = echarts.init(this.refs.chart);

		var option = {
			color: color,
			tooltip: {
				enterable: true,
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			title:{
				text: '热点类型',
				x: 'center',
				y: 'center',
				textStyle : {
					color : '#ffffff',
					fontFamily : '微软雅黑',
					fontSize : 14,
				}
			},
			series: [
				{
					name:'热点类型',
					type:'pie',
					radius: ['40%', '55%'],
					label: {
						normal: {
							position: 'circle-center',
							textStyle: {
								color: '#fff'
							}
						}
					},
					data:[]
				}
			]
		};
		this.option = option;

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	// 更新option
	updateOption: function () {
		var i, data = [], typeData = this.props.typeData;
		var allZero = true;

		// 检查各数据项的value是不是全为0
		for (i = 0; i < typeData.length; i++) {
			if (typeData[i].totalHotCount > 0) {
				allZero = false;
			}
		}
		// 不是全为0时，忽略value为0的数据
		for (i = 0; i < typeData.length; i++) {
			if (typeData[i].totalHotCount == 0 && !allZero) {
				continue;
			}
			data.push({
				name: typeData[i].typeLabelName,
				value: typeData[i].totalHotCount,
				label: {
					normal: {
						addBtnColor: Util.toRgba(color[i], 0.7)
					}
				}
			});
		}
		this.option.series[0].data = data;
	},
	componentDidUpdate: function (prevProps) {
		if (this.props.timestamp > prevProps.timestamp) {
			this.updateOption();
	    this.myChart.setOption(this.option, true);
		}
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render:function(){
		return(
			<div ref='chart' id={this.props.id} style={{width:'4rem',height:'3.916rem',margin:'0 auto'}}></div>
		);
	}
})

export default Circletype;