import React from 'react';
import ScrollbarItem from './ScrollbarItem';

var itemList = ['品牌','产品','功能','服务','活动'];

var Scrollbar = React.createClass({
	change: function (index) {
		this.props.change(index)
	},
	render: function () {
		var i, items = [];
		for (i = 0; i < itemList.length; i++) {
			items.push(
				<ScrollbarItem
					info={itemList[i]}
					active={this.props.cur == i}
					change={this.change}
					index={i}
					key={i}
				></ScrollbarItem>
			);
		}

		return (
			<div className="scrollbar">
				{items}
			</div>
		);
	}
});

export default Scrollbar;