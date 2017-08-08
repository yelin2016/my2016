/**
 * 品牌舆情挖掘服务统计圆环
 */
import React from 'react';

/**
 * 绘制百分比圆环
 * @param  {[type]} node    DOM节点
 * @param  {[type]} percent 百分比
 * @param  {[type]} color   圆环颜色
 * @param  {[type]} size    尺寸
 * @return {[type]}         [description]
 */
function drawArc (node, percent, color, size) {
	percent = isNaN(percent) || percent <= 1 ? 2 : percent;
	var svg = d3.select(node)
				.append("svg")
				.attr("width", size)
				.attr("height", size)
				.attr("viewBox","0 0 218 218");

	var arc = d3.svg.arc()
				.innerRadius(93)
				.outerRadius(109)
				.startAngle(0)
				.endAngle(2 * Math.PI * percent/100);

	svg.append("g")
		.attr("transform","translate(109,109)")
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
				.innerRadius(93)
				.outerRadius(109);

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

var levelMap = {"lv1":"客户服务","lv2":"物流配送","lv3":"产品安装","lv4":"产品维修"};
var colorMap = {"lv1":"#f195bc","lv2":"#7bdda7","lv3":"#f0e296","lv4":"#7fa3df"};

var ChartCircle = React.createClass({
	componentDidMount: function () {
		var node = this.refs.circle;
		var percent = Math.ceil(this.props.newAdd*100/this.props.num);
		drawArc(node, percent, colorMap[this.props.level], '2.18rem');
	},
	componentDidUpdate: function (prevProps) {
		if (prevProps.newAdd != this.props.newAdd) {
			var node = this.refs.circle;
			var percent = Math.ceil(this.props.newAdd*100/this.props.num);
			var lastPercent = Math.ceil(prevProps.newAdd*100/prevProps.num);
			updateArc(node, percent, lastPercent);
		}
	},
	render: function () {
		return (
			<div 
				ref={'circle'}
				style={{
					borderColor: colorMap[this.props.level]
				}}
			 	className="count-circle">
				<span className="total">{levelMap[this.props.level]}</span>
				<div className="detail">
					<p>美誉度：{this.props.reputation}</p>
					<p>占&nbsp;&nbsp;比：{Math.ceil(this.props.newAdd*100/this.props.num)}%</p>
					<p>关注度：{this.props.num}</p>
				</div>
			</div>
		);
	}
});

export default ChartCircle;