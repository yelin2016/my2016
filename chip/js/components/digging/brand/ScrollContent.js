import React from 'react';
import Scrollbar from './scrollbar';
import BrandContent from './brand';
import ProductContent from './product';
import FeatureContent from './feature';
import ServiceContent from './service';
import ActivityContent from './activity';

var ScrollContent = React.createClass({
	getInitialState: function () {
		return {
			cur: 0,
			animating: false
		};
	},
	change: function (index) {
		this.setState({
			cur: index
		})
	},
	pre: function () {
		var curIndex = this.state.cur;
		if (curIndex > 0) {
			curIndex -= 1;
		}
		if (!this.state.animating) {
			this.setState({
				cur: curIndex,
				animating: true
			});
			var func = function () {
				this.setState({
					animating: false
				});
			}.bind(this);
			setTimeout(func, 400);
		}
	},
	next: function () {
		var curIndex = this.state.cur;
		if (curIndex < 4) {
			curIndex += 1;
		}
		if (!this.state.animating) {
			this.setState({
				cur: curIndex,
				animating: true
			});
			setTimeout(function () {
				this.setState({
					animating: false
				});
			}.bind(this), 400);
		}
	},
	mousescroll: function (event) {
		// 大于0向下,小于0向上
		if (event.deltaY > 0) {
			this.next();
		} else {
			this.pre();
		}
	},
	render: function () {
		var basePos = -8.25*this.state.cur;
		return (
			<div className="scroll-container" onWheel={this.mousescroll}>
				<Scrollbar 
					change={this.change}
					cur={this.state.cur}></Scrollbar>
				<BrandContent 
					data={this.props.brand.cloudData}
					stamp={this.props.brand.cloudStamp}
					top={basePos + 'rem'}
					toggle={this.props.toggle}
					active={this.state.cur == 0}></BrandContent>
				<ProductContent 
					distData={this.props.brand.priceDistData}
					distStamp={this.props.brand.priceDistStamp}
					saleData={this.props.brand.saleRankData}
					saleStamp={this.props.brand.saleRankStamp}
					filterPrice={this.props.actions.filterPrice}
					top={(basePos+8.25) + 'rem'}
					active={this.state.cur == 1}></ProductContent>
				<FeatureContent 
					data={this.props.brand.priceRepData}
					stamp={this.props.brand.priceRepStamp}
					top={(basePos+8.25*2) + 'rem'}
					active={this.state.cur == 2}></FeatureContent>
				<ServiceContent 
					data={this.props.brand.serviceData}
					stamp={this.props.brand.serviceStamp}
					top={(basePos+8.25*3) + 'rem'}
					active={this.state.cur == 3}></ServiceContent>
				<ActivityContent 
					data={this.props.brand.top10Data}
					top={(basePos+8.25*4) + 'rem'}
					active={this.state.cur == 4}></ActivityContent>
			</div>
		);
	}
});

export default ScrollContent;