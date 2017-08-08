import React from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import SideMenu from './common/sidemenu';

import DevTools from '../devtools';

function mapStateToProps (state, ownProps) {
	return {
		routepath: ownProps.location.pathname,
		routekey: ownProps.location.key
	};
}

var MyApp = React.createClass({
	componentDidMount: function () {
		$("#fixBg").show();
	},
	render: function () {
		return (
			<div className={"myApp"}>
				<Header />
				<SideMenu routepath={this.props.routepath} routekey={this.props.routekey} />
				<div className="main-section" >
					{this.props.children}
				</div>
				<DevTools />
			</div>
		);
	}
});

// 连接MyApp组件，返回一个新的组件
export default connect(
	mapStateToProps
)(MyApp);