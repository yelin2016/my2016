import React from 'react';
// =this.className=="option"?"checkedoption":"option"
var OptionItem = React.createClass({
	handleClk: function (event) {
		event.stopPropagation();
		event.preventDefault();
		this.props.chgSel(this.props.item.value, this.props.item.nm,this.props.index);
	},
	render: function () {
		var cls = this.props.chked ? 'option chked' : 'option';
		return (
			<li className={cls} onClick={this.handleClk} data-value={this.props.item.value}>{this.props.item.nm}</li>
		);
	}
});

export default OptionItem;