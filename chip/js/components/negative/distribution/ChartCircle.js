import React from 'react';

// 一级圆环颜色
var colors = ['#7fa3df','#7bdda7','#f5e58e','#f195bc'];
// 二级环形图四种不同颜色
var se2_color = [
	[
    {itemStyle:{normal:{color: '#7fa3df'}}},
    {itemStyle:{normal:{color: '#6f95d4'}}},
    {itemStyle:{normal:{color: '#638ac9'}}},
    {itemStyle:{normal:{color: '#567dbb'}}}
	],
	[
    {itemStyle:{normal:{color: '#7bdda7'}}},
    {itemStyle:{normal:{color: '#5ec38b'}}},
    {itemStyle:{normal:{color: '#4db079'}}},
    {itemStyle:{normal:{color: '#40a16b'}}}
	],
	[
    {itemStyle:{normal:{color: '#f5e58e'}}},
    {itemStyle:{normal:{color: '#ead16d'}}},
    {itemStyle:{normal:{color: '#d9ba59'}}},
    {itemStyle:{normal:{color: '#d8b139'}}}
	],
	[
    {itemStyle:{normal:{color: '#f195bc'}}},
    {itemStyle:{normal:{color: '#ec81ae'}}},
    {itemStyle:{normal:{color: '#e3679b'}}},
    {itemStyle:{normal:{color: '#dd528d'}}}
	]
];

var ChartCircle = React.createClass({
	componentDidMount: function () {
		var chartRef = echarts.init(this.refs.chart);
		var pos = this.props.pos;
		var option = {
			color: ['#7fa3df','#7bdda7','#f5e58e','#f195bc'],
			title: {
				show: true,
				text: this.props.title || '',
				textStyle: {
					color: '#fff'
				},
				top: 'center',
				left: 'center'
			},
	    tooltip: {
	    		// position: 'inside',
	    		enterable: true,
	        trigger: 'item',
	        formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    legend: {
	        orient: 'vertical',
	        top: '3%',
	        left: pos == 'left' ? 'left' : '',
	        right: pos == 'right' ? 'right' : '',
	        data:[
		        {
		        	name:'品牌',
		        	icon: 'circle'
		        },
		        {
		        	name:'产品',
		        	icon: 'circle'
		        },
		        {
		        	name:'功能',
		        	icon: 'circle'
		        },
		        {
		        	name:'服务',
		        	icon: 'circle'
		        }
	        ],
	        textStyle: {
	        	color: '#fff'
	        }
	    },
	    series: [
	        {
	            name:'类别',
	            type:'pie',
	            selectedMode: 'single',
	            radius: ['25%', '35%'],

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

		this.myChart = chartRef;
		this.option = option;
		var _this = this;

		/**
		 * 处理选中、取消第一级某一块时，展开、收起第二级圆环
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		function handleSelectChg (event) {
			var level2_data = _this.level2_data;
			var curSelNm = event.name;
			var se1 = option.series[0];
			var se1_data = se1.data;
			var i, curIndex = 0, foundCur = false, cur = 0, total = 0;
			var start_angle = 90;
			var curCate = '';

			// var i, tmp = option.series[0].data;
      var hasSelected = false;
      // 有选中，设置选中项的label显示，设置选中状态表
      for (i = 0; i < se1_data.length; i++) {
          if (event.selected[se1_data[i].name]) {
              hasSelected = true;
          }
          se1_data[i].label.normal.show = event.selected[se1_data[i].name];
          se1_data[i].selected = event.selected[se1_data[i].name];
      }
      // 如果没有选中，设置所有的label都显示
      if (!hasSelected) {
          for (i = 0; i < se1_data.length; i++) {
              se1_data[i].label.normal.show = true;
          }
      }
      chartRef.setOption(option, true);
      // return ;
      
      // 如果有选中，计算二级圆环的起始角度
      if (hasSelected) {
      	for (i = 0; i < se1_data.length; i++) {
					option.series[0].data[i].selected = false;
					if (se1_data[i].name == curSelNm) {
						foundCur = true;
						option.series[0].data[i].selected = true;
						curIndex = i;
						curCate = option.series[0].data[i].info;
					}
					if (!foundCur) {
						cur += se1_data[i].value;
					}
					total += se1_data[i].value;
				}
				start_angle = start_angle - (360 * cur / total);
				if (start_angle < 0) {
					start_angle += 360;
				}	
      }
			
			for (i = 1; i < option.series.length; i++) {
				option.series.pop();
			}

			chartRef.setOption(option, true);


			if (!hasSelected) {
				return;
			}

			var level2 = level2_data[curCate];
			for (var j = 0; j < level2.length; j++) {
				level2[j].itemStyle = se2_color[curIndex][j].itemStyle;
			}
			
    	option.series.push(
				{
            name: curSelNm,
            type:'pie',
            radius: ['45%', '55%'],
            label: {
            	normal: {
            		position: 'right-angle',
            		formatter: '{b}\n关注度{c}\n占比{d}%'
            	}
            },
            labelLine: {
            	normal: {
            		length: 20,
            		level2: 20
            	}
            },
            itemStyle: {
            	normal: {
            		color: colors[curIndex]            		
            	}
            },
            startAngle: start_angle,
            data:level2
        }
      );
    	chartRef.setOption(option, true);	
		}
		
		this.myChart.on('pieselectchanged', handleSelectChg);

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	/**
	 * 更新otion
	 * @return {[type]} [description]
	 */
	updateOption: function () {
		var option = this.option;
		var seriesData;
		option.series[0].data = this.props.data.lv1;
		seriesData = option.series[0].data;
		for (var i = 0; i < seriesData.length; i++) {
			seriesData[i].label = {normal: {}};
			seriesData[i].label.normal.addBtnColor = Util.toRgba(colors[i], 0.5);
		}
		this.level2_data = this.props.data.lv2;
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
			// this.myChart.setOption(option, true);
			this.drawChart(this.props.data);
		}
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div ref='chart' id={this.props.id} style={{width:'8rem',height:'8rem',margin:'0 auto'}}></div>
		);
	}
});

export default ChartCircle;