import React from 'react';

var InputOptionItem = React.createClass({
	handleClk: function (event) {
		this.props.chgSel(this.props.item.nm, this.props.item.value, this.props.index)
	},
	render: function () {
		return (
			<li 
				className="option" 
				style={{
					color: this.props.tmpindex == this.props.index ? '#4f7eb6' : ''
				}}
				onClick={this.handleClk} 
				data-value={this.props.item.value}>{this.props.item.nm}</li>
		);
	}
});

export default InputOptionItem;