import React from 'react';

var ChartPie = React.createClass({
	componentDidMount: function () {
		var colors = ['#7fa3df','#f19ec2','#7bdda7','#f0e296'];

		this.myChart = echarts.init(this.refs.chart);
		var option = {
	    title: {
				show: true,
				text: '价格段分布图',
				textStyle: {
					color: '#fff',
					fontSize: 14,
					fontWeight: 'lighter'
				},
				left: 'center',
				top: '30%'
			},
	    tooltip : {
        trigger: 'item',
        textStyle: {
					color: '#8ba7bf'
				},
        formatter: "价格区间:{b}<br/>数&nbsp;&nbsp;&nbsp;量&nbsp;&nbsp;&nbsp;&nbsp;:{c}<br/>占&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;&nbsp;&nbsp;:{d}%"
	    },
	    series : [
        {
          name: '价格段分布',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          selectedMode: 'single',
          label: {
            normal: {
              show: false
	          }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data:[]
        }
	    ]
		};
		this.option = option;

		var filter = this.filter;
		// 圆环选中、取消时柱状图价格区间设置、取消
		this.myChart.on('pieselectchanged', function (param) {
			var priceId = param.extra.id;
			var hasSelect = false;
			for (var k in param.selected) {
				if (param.selected[k]) {
					hasSelect = true;
				}
			}
			if (!hasSelect) {
				priceId = -1;
			}
			filter(priceId);
		});

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	// 按价格过滤柱状图数据
	filter: function (priceId) {
		this.props.filterPrice(priceId);
	},
	componentDidUpdate : function (prevProps) {
		if (this.props.distStamp > prevProps.distStamp) {
			// console.log('pie chart ...');
			this.updateOption();
			this.myChart.setOption(this.option);
		}
	},
	updateOption: function () {
		var option = this.option;
		var distData = this.props.distData;
		var i, data = [];
		var allZero = true;

		// 检查各数据项的value是不是全为0
		for (i = 0; i < distData.length; i++) {
			if (distData[i].saleCount > 0) {
				allZero = false;
			}
		}
		// 不是全为0时，忽略value为0的数据
		for (i = 0; i < distData.length; i++) {
			if (distData[i].saleCount == 0 && !allZero) {
				continue;
			}
			data.push({
				name: distData[i].priceName,
				value: distData[i].saleCount,
				id: distData[i].priceId
			});
		}
		option.series[0].data = data;
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div ref="chart" style={{width:'30%',height:'100%',float:'left'}}></div>
		);
	}
});

export default ChartPie;