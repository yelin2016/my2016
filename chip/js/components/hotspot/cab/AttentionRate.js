import React from 'react';

var AttentionRate = React.createClass({
	render: function () {
		var item = this.props.item || {};
		return(
			<div className="fl" >
				<div className="attention-rate">
					<div className="attention-num">{item.totalFocus || 0}</div>
					<div className="attention-name">关注度</div>
				</div>
				<div className="attention-rate">
					<div className="attention-num">{item.totalReputation || 0}</div>
					<div className="attention-name">美誉度</div>
				</div>
			</div>
		);
	}
});

export default AttentionRate;