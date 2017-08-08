import React from 'react';
import CountTop from './countTop';
import ScrollbarLeft from './scrollbar';
import BarChart from './BarChart';
import LineChart from './LineChart';
import Top10 from './top10';

var CompareDetail = React.createClass({
	getInitialState: function () {
		return {
			curIndex: 0,
			animating: false,
			chartDataType: '',
			listDataType: ''
		}
	},
	componentDidMount: function () {
		var i, k;
		var selList = this.props.selList;
		var duration = this.props.forum.duration;
		var condition = this.props.forum.compareConditons;
		var leftSecs = [], rightSecs = [];

		// 左右两边选择的板块id转换为','号分隔的字符串
		for (i = 0; i < condition.left.length; i++) {
			leftSecs.push(condition.left[i].id);
		}
		leftSecs = leftSecs.join(',');
		for (i = 0; i < condition.right.length; i++) {
			rightSecs.push(condition.right[i].id);
		}
		rightSecs = rightSecs.join(',');

		// 统计计数数据
		this.props.actions.fetchCountData({
			sourceId: selList[0].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: leftSecs
		}, 'left');
		this.props.actions.fetchCountData({
			sourceId: selList[1].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: rightSecs
		}, 'right');
		// 柱状图数据
		this.props.actions.fetchBarData({
			sourceId: selList[0].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: leftSecs
		}, 'left');
		this.props.actions.fetchBarData({
			sourceId: selList[1].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: rightSecs
		}, 'right');
		// 连线图数据
		this.props.actions.fetchLineData({
			sourceId: selList[0].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: leftSecs
		}, 'left');
		this.props.actions.fetchLineData({
			sourceId: selList[1].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: rightSecs
		}, 'right');
		// TOP10列表数据
		// ***设置sourceId,时间段之后没数据，测试时暂时不传
		this.props.actions.fetchListData({
			sourceId: selList[0].key,
			sourceId: 7,
			// startTime: duration.start,
			// endTime: duration.end,
			sectionIds: leftSecs,
			hotpointTypeId: this.props.forum.top10Filter
		}, 'left');
		this.props.actions.fetchListData({
			sourceId: selList[1].key,
			startTime: duration.start,
			endTime: duration.end,
			sectionIds: rightSecs,
			hotpointTypeId: this.props.forum.top10Filter
		}, 'right');
	},
	componentDidUpdate: function (preProps) {
		// top10筛选参数改变，重新获取数据
		if (this.props.forum.top10Filter != preProps.forum.top10Filter) {
			var i, k;
			var selList = this.props.selList;
			var duration = this.props.forum.duration;
			var condition = this.props.forum.compareConditons;
			var leftSecs = [], rightSecs = [];

			// 左右两边选择的板块id转换为','号分隔的字符串
			for (i = 0; i < condition.left.length; i++) {
				leftSecs.push(condition.left[i].id);
			}
			leftSecs = leftSecs.join(',');
			for (i = 0; i < condition.right.length; i++) {
				rightSecs.push(condition.right[i].id);
			}
			rightSecs = rightSecs.join(',');
			// TOP10列表数据
			this.props.actions.fetchListData({
				sourceId: selList[0].key,
				sourceId: 7,
				// startTime: duration.start,
				// endTime: duration.end,
				sectionIds: rightSecs,
				hotpointTypeId: this.props.forum.top10Filter
			}, 'left');
			this.props.actions.fetchListData({
				sourceId: selList[1].key,
				startTime: duration.start,
				endTime: duration.end,
				sectionIds: rightSecs,
				hotpointTypeId: this.props.forum.top10Filter
			}, 'right');
		}
	},
	pre: function () {
		var curIndex = this.state.curIndex;
		if (curIndex > 0) {
			curIndex -= 1;
		}
		if (!this.state.animating) {
			this.setState({
				curIndex: curIndex,
				animating: true
			});
			var func = function () {
				this.setState({
					animating: false
				});
			}.bind(this);
			setTimeout(func, 400);
		}
	},
	next: function () {
		var curIndex = this.state.curIndex;
		if (curIndex < 2) {
			curIndex += 1;
		}
		if (!this.state.animating) {
			this.setState({
				curIndex: curIndex,
				animating: true
			});
			setTimeout(function () {
				this.setState({
					animating: false
				});
			}.bind(this), 400);
		}
	},
	mousescroll: function (event) {
		// 大于0向下,小于0向上
		if (event.deltaY > 0) {
			this.next();
		} else {
			this.pre();
		}
	},
	scrollClk: function (index) {
		this.setState({
			curIndex: index
		});
	},
	// 条件选择面板，显示条件改变
	conditionChg: function (condition) {
		var k, filterKey, curIndex = this.state.curIndex;
		for (k in condition) {
			if (condition[k]) {
				filterKey = k;
			}
		}
		if (curIndex == 0) {
			this.props.actions.filterParam({
				barFilter: filterKey
			});
		} else if (curIndex == 1) {
			this.props.actions.filterParam({
				lineFilter: filterKey
			});
		} else if (curIndex == 2) {
			this.props.actions.filterParam({
				top10Filter: filterKey
			});
		}
	},
	render: function () {
		var curIndex = this.state.curIndex;
		var classes = ['item', 'item', 'item'];

		switch (curIndex) {
			case 0:
				classes = ['item center', 'item bottom', 'item bottom'];
				break;
			case 1:
				classes = ['item up', 'item center', 'item bottom'];
				break;
			case 2:
				classes = ['item up', 'item up', 'item center'];
				break;
			default:
				break;
		}

		return (
			<div className="compare-detail">
				<CountTop 
					conditionChg={this.conditionChg}
					curIndex={this.state.curIndex} 
					data={this.props.forum.compareCountData} />
				<div className="animation-content" onWheel={this.mousescroll}>
					<div className={classes[0]}>
						<div style={{width:'50%',height:'100%',float:'left'}}>
							<BarChart 
								color="#f5e58e"
								filter={this.props.forum.barFilter} 
								stamp={this.props.forum.compareBarData.timestamp}
								data={this.props.forum.compareBarData.left} />
						</div>
						<div style={{width:'50%',height:'100%',float:'left'}}>
							<BarChart 
								color="#7fa3df"
								filter={this.props.forum.barFilter} 
								stamp={this.props.forum.compareBarData.timestamp}
								data={this.props.forum.compareBarData.right} />
						</div>
					</div>
					<div className={classes[1]}>
						<div style={{width:'50%',height:'100%',float:'left'}}>
							<LineChart 
								color="#f5e58e"
								filter={this.props.forum.lineFilter} 
								stamp={this.props.forum.compareLineData.timestamp}
								data={this.props.forum.compareLineData.left} />
						</div>
						<div style={{width:'50%',height:'100%',float:'left'}}>
							<LineChart 
								color="#7fa3df"
								filter={this.props.forum.lineFilter} 
								stamp={this.props.forum.compareLineData.timestamp}
								data={this.props.forum.compareLineData.left} />
						</div>
					</div>
					<div className={classes[2]}>
						<Top10 data={this.props.forum.compareListData} />
					</div>
				</div>
				<ScrollbarLeft clk={this.scrollClk} total={3} cur={this.state.curIndex} />
				<div className="btns">
					<span className="btn" onClick={this.pre}>上一页</span>
					<span className="btn" onClick={this.next}>下一页</span>
				</div>
			</div>
		);
	}
});

export default CompareDetail;