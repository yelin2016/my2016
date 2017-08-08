import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as negativeTrendActions from '../../../actions/negative/trend';
import ChartLine from './ChartLine';

var Trend = React.createClass({
	componentDidMount: function () {
		// 获取分布数据
		this.props.actions.getTrendData();		
	},
	render: function () {
		return (
			<div className="negative-trend">
				<div className="title">负面舆情走势页面</div>
				<div className="line-chart">
					<ChartLine
					data={this.props.trend.data} 
					stamp={this.props.trend.stamp} />
				</div>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		trend: state.app.negative.trend
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(negativeTrendActions, dispatch);
	return {actions: boundActionCreators};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Trend);