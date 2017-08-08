import React from 'react';
import Lv3ConditionItem from './Lv3ConditionItem';

// 三层圆环条件选择
var Lv3Conditions = React.createClass({
	delConditon: function (index) {
		var tmp = this.props.conditions.slice(0, index).concat(this.props.conditions.slice(index+1));
		this.props.updateCon(this.props.place, tmp);
	},
	render: function () {
		var i, list = [];
		var conditions = this.props.conditions;

		for (i = 0; i < conditions.length; i++) {
			list.push(
				<Lv3ConditionItem key={i} index={i} condition={conditions[i]} delConditon={this.delConditon} />
			);
		}
		return (
			<div className="lv3-conditions">{list}</div>
		);
	}
});

export default Lv3Conditions;