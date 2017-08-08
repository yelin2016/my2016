// menuItem 层级菜单组件
import React from 'react';
import MenuItem from './MenuItem';

var MenuHierarchy = React.createClass({
	// 改变当前菜单展开路径
	chgActive: function () {
		this.props.setCurActive(this.props.tmp);
	},
	render: function () {
		var item = this.props.item;
		var child = item.child;
		var i, key, hClass, hItemClass, list = [];
		
		if (item.child) {
			for (i = 0; i < child.length; i++) {
				key = this.props.selfPath + "level-" + item.child[i].level + "-" + i;
				list.push(
					<MenuHierarchy 
						key={key}
						keyFlag={i}
						selfPath={key}
						curPath={this.props.curPath}
						curActive={this.props.curActive}
						setCurActive={this.props.setCurActive}
						item={item.child[i]} />
				);
			}

			hItemClass = "";
			if (this.props.curActive.indexOf(this.props.item.route) == 0) {
				hItemClass = "active";
			}
			hClass = hItemClass;
			// 第一层菜单有特殊样式
			if (this.props.topLevel) {
				hItemClass = hItemClass + " " + this.props.selfPath;
			}

			return (
				<li className={hItemClass + " hierarchyItem level-" + item.level}>
					<div className="subMenu" onClick={this.chgActive}>{item.name}</div>
					<ul className={hClass + " hierarchy" + " level-" + item.level}>
						{list}
					</ul>
				</li>
			);
			
		} else {
			return (
				<MenuItem 
					curPath={this.props.curPath}
					curActive={this.props.curActive}
					setCurActive={this.props.setCurActive}
					item={item} />
			);
		}		
	}
});
export default MenuHierarchy;