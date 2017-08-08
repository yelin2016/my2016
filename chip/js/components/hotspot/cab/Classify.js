import React from 'react';

var Classify = React.createClass({
	handleClk: function () {
		this.props.show(this.props.item.hotpointTypeIdList, this.props.item.hotpointTypeName);
	},
	render: function () {
		var cls = this.props.cls;
		return (
			<div className="classify-content" onClick={this.handleClk}>
				<p className="classify-num">{this.props.item.totalHotCount}</p>
				<p className={"classify-name "+cls}>{this.props.item.hotpointTypeName}</p>
			</div>
		);
	}
});

export default Classify;