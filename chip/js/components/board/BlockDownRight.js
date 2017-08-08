import React from 'react';

var BlockDownLeft = React.createClass({
	getInitialState: function () {
		return {
			cur: 0
		};
	},
	componentDidMount: function () {
		this.myChart = echarts.init(document.getElementById('chart_hotspot'));
		var option = {
			animationDuration:500,
			title: {
				show: false
			},
			color: ['#6aaefc'],
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
					name: '数量',
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
		var i, data0;
		var option = this.option;
		var trendData = this.props.trendData;
		var md = [];
		var max = 0;

		option.xAxis.data = [];
		option.series.forEach(function (value, index) {
			value.data = [];
		});

		data0 = trendData[0].warnInfos;
		// 设置x轴时间刻度
		for (i = 0; i < data0.length; i++) {
			// 测试接口有时候返回date为null
			data0[i].date = data0[i].date ? data0[i].date : '2016-01-01';

			md = data0[i].date.split('-');
			md.shift();
			option.xAxis.data.push(md.join('.'));
		}
		// 设置series的值
		data0 = this.props.trendData[this.state.cur].warnInfos;
		data0.forEach(function (value, index) {
			max = max < value.articleCount ? value.articleCount : max;
			option.series[0].data.push(value.articleCount);
		});

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
		var i, btnList = [], brandList = ['长虹','小米','乐视','创维','海信','TCL','康佳'];
		for (i = 0; i < brandList.length; i++) {
			btnList.push(
				<span data-index={i} onClick={this.setCur} className={(this.state.cur == i ? ' active ' : '')+'switch-btn'} key={i}>{brandList[i]}</span>
			);
		}
		return (
			<div ref="container" className="down-right">
				<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
					<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
					<span className="title-text" style={{marginLeft:"0.1rem"}}>论坛热点舆情走势</span>
				</div>
				<div className="block-content" style={{height:"3.36rem",marginTop:"2px"}}>
					<div id="chart_hotspot" className="chart-hotspot"></div>
					<div className="switch-board">
						{btnList}
					</div>
				</div>
			</div>
		);
	}
});

export default BlockDownLeft;