import React from 'react';

var colors = [
	['#6aaefc'],
	['#c22b44','#e79719','#f2d139','#2eb8db']
];
var formatters = [
	'{b}<br />舆情: {c0}',
	'{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}'
];

var BlockUpRight = React.createClass({
	getInitialState: function () {
		return {
			cur: 1
		};
	},
	componentDidMount: function () {
		this.myChart = echarts.init(document.getElementById('chart_negative'));
		var option = {
			title: {
				text: '',
				left: 'center'
			},
			color: ['#c22b44','#e79719','#f2d139','#2eb8db'],
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					lineStyle: {
						color: '#8ba7bf'
					}
				},
				textStyle: {
					color: '#8ba7bf'
				},
				backgroundColor:'rgba(25,39,58,0.7)',
				formatter: '{b}<br />{a0}: {c0}'
			},
			legend: {
				left: 'left',
				data: ['2的指数', '3的指数']
			},
			xAxis: {
				type: 'category',
				name: 'x',
				boundaryGap: false,
				splitLine: {
					lineStyle: {
						color: '#3f475e'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				},
				data: []
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '6%',
				containLabel: true
			},
			yAxis: {
				type: 'value',
				name: 'y',
				splitLine: {
					lineStyle: {
						color: '#3f475e'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#8ba7bf'
					}
				}
			},
			series: [
				{
					name: '红色',
					type: 'line',
					symbol: 'circle',
					data: []
				},
				{
					name: '橙色',
					type: 'line',
					symbol: 'circle',
					data: []
				},
				{
					name: '黄色',
					type: 'line',
					symbol: 'circle',
					data: []
				},
				{
					name: '蓝色',
					type: 'line',
					symbol: 'circle',
					data: []
				}
			]
		};
		this.option = option;
		
		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	componentDidUpdate: function (prevProps, prevState) {
		var option = this.option;
		// 时间戳更新，数据更新成功
		var dataChg = this.props.stamp > prevProps.stamp;
		// 显示类型切换
		var typeChg = prevState.cur != this.state.cur;

		if (dataChg || typeChg) {
			this.updateOption();
			this.myChart.setOption(option, true);
		}
	},
	// 数据变化或显示分类切换时，更新option
	updateOption: function () {
		var i, j, data0;
		var option = this.option;
		var trendData = this.props.trendData;
		var md = [];
		var max = 0;
		// 指定从第几个数据开始设置series，总走势从第五个开始
		var startLine = this.state.cur == 1 ? 0 : 4;

		// 设置分级、总走势图的不同颜色，tooltip格式
		option.color = colors[this.state.cur];
		option.tooltip.formatter = formatters[this.state.cur];

		option.xAxis.data = [];
		option.series.forEach(function (value, index) {
			value.data = [];
		});

		data0 = trendData[0].warnInfos;
		// 设置x轴时间刻度
		for (i = 0; i < data0.length; i++) {
			md = data0[i].date.split('-');
			md.shift();
			option.xAxis.data.push(md.join('.'));
		}
		// 设置series的值
		j = 0;
		for (i = startLine; i < trendData.length; i++) {
			data0 = this.props.trendData[i].warnInfos;
			if (j < option.series.length) {
				data0.forEach(function (value, index) {
					max = max < value.articleCount ? value.articleCount : max;
					option.series[j].data.push(value.articleCount);
				});
				j++;
			}
		}

		// 设置最大值，10的倍数增长
		max = Util.yAxisMax(max);
		option.yAxis.max = max;
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	setCur: function (event) {
		this.setState({cur: event.target.dataset.index});
	},
	render: function () {
		return (
			<div className="up-right">
				<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
					<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
					<span className="title-text" style={{marginLeft:"0.1rem"}}>长虹负面舆情走势</span>
				</div>
				<div className="block-content" style={{height:"4.2rem",marginTop:"2px"}}>
					<div id="chart_negative" className="chart-negative"></div>
					<div className="switch-board">
						<span data-index="0" onClick={this.setCur} className={(this.state.cur == 0 ? ' active ' : '')+'switch-btn'}>总走势</span>
						<span data-index="1" onClick={this.setCur} className={(this.state.cur == 1 ? ' active ' : '')+'switch-btn'}>分级走势</span>
					</div>
				</div>
			</div>
		);
	}
});

export default BlockUpRight;