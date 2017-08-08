import React from 'react';
import SwitchItem from './SwitchItem';

var brandList = ['长虹','小米','海信','创维','乐视'];

var BrandSwitch = React.createClass({
	// 切换品牌
	swBrand: function (nextIndex) {
		this.props.chgBrand(nextIndex);
	},
	render: function () {
		var i, items = [];

		for (i = 0; i < brandList.length; i++) {
			items.push(
				<SwitchItem 
					brandName={brandList[i]} 
					active={this.props.curindex == i} 
					chgActive={this.swBrand}
					index={i}
					key={i}></SwitchItem>
			);
		}

		return (
			<div className="brand-sw">
				{items}
			</div>
		);
	}
});

export default BrandSwitch;