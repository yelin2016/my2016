import React from 'react';
import ScrollbarItem from './ScrollbarItem';

// 滚动时左侧分段指示滚动条
var ScrollbarLeft = React.createClass({
	handleClk: function (index) {
		this.props.clk(index);
	},
	render: function () {
		var i, scrolls = [];
		var cur = this.props.cur;
		var total = this.props.total;
		var cls = '';
		var height = (5.1/total-0.2)+'rem';
		for (i = 0; i < total; i++) {
			cls = i == cur ? 'scroll-item active' : 'scroll-item';
			scrolls.push(
				<ScrollbarItem 
					key={i} 
					index={i}
					clk={this.handleClk} 
					cls={cls} 
					height={height} />
			)
		}
		return (
			<div className="scroll-bar-left">
				{scrolls}
			</div>
		);
	}
});

export default ScrollbarLeft;