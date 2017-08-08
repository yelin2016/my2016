/**
 * 舆情分级别计数圆环组件
 */
import React from 'react';

var levelMap = {"red":"红色","orange":"橙色","yellow":"黄色","blue":"蓝色"};
var CountCircle = React.createClass({
	render: function () {
		return (
			<div className={"count-circle " + this.props.level}>
				<span className="new-add">{"+"+this.props.newAdd}</span>
				<span className="total">{this.props.num}</span>
				<span className="level">{levelMap[this.props.level] + '预警'}</span>
			</div>
		);
	}
});

export default CountCircle;