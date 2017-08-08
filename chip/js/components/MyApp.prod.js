import React from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import SideMenu from './common/sidemenu';

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
		console.log("prod way");
		return (
			<div className={"myApp"}>
				<Header />
				<SideMenu routepath={this.props.routepath} routekey={this.props.routekey} />
				<div className="main-section" >
					{this.props.children}
				</div>
			</div>
		);
	}
});

// 连接MyApp组件，返回一个新的组件
export default connect(
	mapStateToProps
)(MyApp);