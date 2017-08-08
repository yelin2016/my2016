import React from 'react';
import ChartPie from './ChartPie';
import ChartBar from './ChartBar';

var Product = React.createClass({
	render: function () {
		return (
			<div className="scroll-content product" style={{top: this.props.top}}>
				<ChartPie 
					distData={this.props.distData}
					distStamp={this.props.distStamp}
					filterPrice={this.props.filterPrice}
				></ChartPie>
				<ChartBar
					saleData={this.props.saleData}
					saleStamp={this.props.saleStamp}
				></ChartBar>
			</div>
		);
	}
});

export default Product;