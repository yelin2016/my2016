/**
 * 分类负面舆情走势
 */
import React from 'react';
import ChartLine from './ChartLine';

var CateNegativeTrend = React.createClass({
	getInitialState: function () {
		return {
			cur: 0
		};
	},
	setCur: function (event) {
		// console.log(event.target.dataset.index);
		this.setState({cur: event.target.dataset.index});
	},
	render: function () {
		return (
			<div className="cate-negative-trend">
				<div className="category-chart">
					<ChartLine trend={this.props.trend} stamp={this.props.stamp} cur={this.state.cur} />
				</div>
				<div className="switch-board">
					<span data-index="0" onClick={this.setCur} className={(this.state.cur == 0 ? ' active ' : '')+'switch-btn'}>总走势</span>
					<span data-index="1" onClick={this.setCur} className={(this.state.cur == 1 ? ' active ' : '')+'switch-btn'}>分级走势</span>
				</div>
			</div>
		);
	}
});

export default CateNegativeTrend;