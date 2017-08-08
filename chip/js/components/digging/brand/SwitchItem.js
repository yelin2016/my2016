import React from 'react';

var SwitchItem = React.createClass({
	handleClk: function () {
		this.props.chgActive(this.props.index);
	},
	render: function () {
		return (
			<div onClick={this.handleClk} className={"sw-item " + (this.props.active ? 'active' : '')}>{this.props.brandName}</div>
		);
	}
});

export default SwitchItem;