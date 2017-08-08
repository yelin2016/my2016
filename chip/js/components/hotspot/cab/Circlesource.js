import React from 'react';

var color = ['#626be2','#7182e9','#769aeb','#82a9ea'];

var Circlesource = React.createClass({
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
				text: '来源分布',
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
					name:'来源分布',
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
		var i, data = [], sourceData = this.props.sourceData;
		var allZero = true;

		// 检查各数据项的value是不是全为0
		for (i = 0; i < sourceData.length; i++) {
			if (sourceData[i].totalHotCount > 0) {
				allZero = false;
			}
		}
		// 不是全为0时，忽略value为0的数据
		for (i = 0; i < sourceData.length; i++) {
			if (sourceData[i].totalHotCount == 0 && !allZero) {
				continue;
			}
			data.push({
				name: sourceData[i].sourceTypeName,
				value: sourceData[i].totalHotCount,
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
			)
	}
})

export default Circlesource;