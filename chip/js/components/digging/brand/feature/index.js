import React from 'react';
import ChartBar from './ChartBar';

var Feature = React.createClass({
	render: function () {
		var data = this.props.data;
		var i, curMax;
		var p2999 = [], p5999 = [], p9999 = [], p10000 = [];
		for (i = 0; i < data.length; i++) {
			curMax = data[i].priceName.split('-')[1];
			if (curMax <= 2999) {
			 	p2999.push(data[i]);
			} else if (curMax <= 5999) {
				p5999.push(data[i]);
			} else if (curMax <= 9999) {
				p9999.push(data[i]);
			} else  {
				p10000.push(data[i]);
			}
		}
		return (
			<div className="scroll-content feature" style={{top: this.props.top}}>
				<ChartBar
					title="0~2999价格区间各功能美誉度"
					data={p2999}
					stamp={this.props.stamp}
					color="#f19ec2"
				></ChartBar>
				<ChartBar
					data={p5999}
					stamp={this.props.stamp}
					title="3000~5999价格区间各功能美誉度"
					color="#7bdda7"
				></ChartBar>
				<ChartBar
					data={p9999}
					stamp={this.props.stamp}
					title="6000~9999价格区间各功能美誉度"
					color="#f0e296"
				></ChartBar>
				<ChartBar
					data={p10000}
					stamp={this.props.stamp}
					title="10000~价格区间各功能美誉度"
					color="#7fa3df"
				></ChartBar>
			</div>
		);
	}
});

export default Feature;