// menuItem 菜单条目组件
import React from 'react';
import { Link } from 'react-router';

var MenuItem = React.createClass({
	render: function () {
		var className = "menuItem";
		// 连接的route和当前路由路径相同，并且和当前展开路径在同一路线上
		if (this.props.curPath == this.props.item.route
			&& this.props.item.route.indexOf(this.props.curActive) == 0) {
			className += " active";
		}

		return (
			<li className={className}><Link to={"/" + this.props.item.route}>{this.props.item.name}</Link></li>
		);
	}
});
export default MenuItem;