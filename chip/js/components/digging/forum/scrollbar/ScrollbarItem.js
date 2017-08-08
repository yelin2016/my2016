import React from 'react';

// 滚动时左侧分段指示滚动条
var ScrollbarItem = React.createClass({
	handleClk: function () {
		this.props.clk(this.props.index);
	},
	render: function () {
		return (
			<div 
				className={this.props.cls} 
				onClick={this.handleClk}
				style={{'height': this.props.height}} ></div>
		);
	}
});

export default ScrollbarItem;