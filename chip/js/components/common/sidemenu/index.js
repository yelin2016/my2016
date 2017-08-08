import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as menuActions from '../../../actions/common/sideMenuActions';
import MenuHierarchy from './MenuHierarchy';
import Constants from '../../../constants/Constants';

// 映射state到props
function mapStateToProps (state, ownProps) {
	return {
		curPath: state.app.common.sideMenu.curPath,
		curActive: state.app.common.sideMenu.curActive
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(menuActions, dispatch);
	return {actions: boundActionCreators};
};

var SideMenu = React.createClass({
	componentDidMount: function () {
		var curRoute = this.props.routepath.substring(1);
		// 如果routepath为空，默认设置为board
		if (curRoute == "") {
			curRoute = "board";
		}
		// 初始化时设置当前路由路径和展开路径相同
		this.props.actions.setCurPathActive(curRoute, curRoute);
	},
	shouldComponentUpdate: function (nextProps) {
		var receiveRoute = nextProps.routepath.substring(1);
		// 因为routepath为""时，curPath默认设置为"board"，需要排除这种情况。
		// if (nextProps.routepath == this.props.routepath && nextProps.routekey == this.props.routekey) {
		// routepath和curPath不同，或两次routekey不同，hash发生了变化，阻止本次更新，分配一个重新设置路径的事件。
		if (nextProps.routepath != this.props.routepath || nextProps.routekey != this.props.routekey) {
			if (receiveRoute == "") {
				receiveRoute = "board";
			}
			this.props.actions.setCurPathActive(receiveRoute, receiveRoute);
			return false;
		}
		return true;
	},
	render: function () {
		var i, key, list = [];
		var menuData = Constants.MENUDATA;
		var curPath = this.props.curPath;
		var curActive = this.props.curActive;
		var actions = this.props.actions;

		for (i = 0; i < menuData.length; i++) {
			key = 'level-' + menuData[i].level + '-' + i;
			list.push(
				<MenuHierarchy 
					key={key}
					keyFlag={i}
					topLevel={true}
					selfPath={key}
					tmp={menuData[i].route}
					curPath={curPath}
					curActive={curActive}
					setCurActive={actions.setCurActive}
					item={menuData[i]} />
			);
		}

		return (
			<ul id="sideMenu" className="side-menu">
				{list}
			</ul>
		);
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenu);