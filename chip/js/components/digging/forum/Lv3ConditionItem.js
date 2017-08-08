import React from 'react';

var Lv3ConditionItem = React.createClass({
	handleDel: function () {
		this.props.delConditon(this.props.index);
	},
	render: function () {

		return (
			<div className="condition-item" style={{background:this.props.condition.color}}>
				{this.props.condition.content}
				<span className="del-btn" onClick={this.handleDel}></span>
			</div>
		);
	}
});

export default Lv3ConditionItem;