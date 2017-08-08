import React from 'react';

var ScrollbarItem = React.createClass({
	handleClk: function () {
		this.props.change(this.props.index);
	},
	render: function () {
		return (
			<div 
				onClick={this.handleClk}
				className={"scroll-item "+(this.props.active?"active":"")}>
				<div className="triangle-up"></div>
				<div className={"desc "+"desc-"+this.props.index}>{this.props.info}</div>
				<div className="triangle-down"></div>
			</div>
		);
	}
});

export default ScrollbarItem;