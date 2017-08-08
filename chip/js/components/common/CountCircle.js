/**
 * 舆情分级别计数圆环组件
 */
import React from 'react';

/**
 * 绘制百分比圆环
 * @param  {[type]} node    DOM节点
 * @param  {[type]} percent 百分比
 * @param  {[type]} color   圆环颜色
 * @return {[type]}         [description]
 */
function drawArc (node, percent, color) {
	percent = isNaN(percent) || percent <= 1 ? 2 : percent;
	var svg = d3.select(node)
				.append("svg")
				.attr("width","1.8rem")
				.attr("height","1.8rem")
				.attr("viewBox","0 0 180 180");

	var arc = d3.svg.arc()
				.innerRadius(67)
				.outerRadius(83)
				.startAngle(0)
				.endAngle(2 * Math.PI * percent/100);

	svg.append("g")
		.attr("transform","translate(90,90)")
		.append("path")
		.attr("fill", color)
		.attr("d", arc);
}
/**
 * 更新百分比圆环
 * @param  {[type]} node        DOM节点
 * @param  {[type]} percent     百分比
 * @param  {[type]} lastPercent 上次的百分比
 * @return {[type]}             [description]
 */
function updateArc (node, percent, lastPercent) {
	percent = isNaN(percent) || percent <= 1 ? 2 : percent;
	lastPercent = isNaN(lastPercent) || lastPercent <= 1 ? 2 : lastPercent;
	var arc = d3.svg.arc()
				.innerRadius(67)
				.outerRadius(83);

	d3.select(node).select("path")
				.transition()
				.duration(1000)
				.attrTween("d", function () {
					var start = {startAngle: 0, endAngle: 2 * Math.PI * lastPercent/100};
					var interpolate = d3.interpolate(start, {startAngle: 0, endAngle: 2 * Math.PI * percent/100});
					return function (t) {
						return arc(interpolate(t));
					};
				});
}

var levelMap = {"red":"红色","orange":"橙色","yellow":"黄色","blue":"蓝色"};
var colorMap = {"red":"#f23555","orange":"#ffb515","yellow":"#ffe96f","blue":"#40e2ff"};

var CountCircle = React.createClass({
	componentDidMount: function () {
		var node = this.refs.circle;
		var percent = Math.ceil(this.props.newAdd*100/this.props.num);
		drawArc(node, percent, colorMap[this.props.level]);
	},
	componentDidUpdate: function (prevProps) {
		if (prevProps.newAdd != this.props.newAdd) {
			var node = this.refs.circle;
			var percent = Math.ceil(this.props.newAdd*100/this.props.num);
			var lastPercent = Math.ceil(prevProps.newAdd*100/prevProps.num);
			updateArc(node, percent, lastPercent);
		}
	},
	handlePopup: function () {
		if (typeof this.props.toggle === 'function') {
			this.props.toggle({show:true, type:'level', subType: '品牌', level: this.props.level});
		}
	},
	render: function () {
		return (
			<div ref={'circle'} className={"count-circle " + this.props.level} onClick={this.handlePopup}>
				<span className="new-add">{"+"+this.props.newAdd}</span>
				<span className="total">{this.props.num}</span>
				<span className="level">{levelMap[this.props.level] + '预警'}</span>
			</div>
		);
	}
});

export default CountCircle;