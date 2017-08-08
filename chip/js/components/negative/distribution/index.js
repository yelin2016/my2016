import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as negativeDistributionActions from '../../../actions/negative/distribution';
import ChartCircle from './ChartCircle';

var Distribution = React.createClass({
	componentDidMount: function () {
		// 获取分布数据
		this.props.actions.getDistData();		
	},
	render: function () {
		return (
			<div className="negative-distribution">
				<div className="title">实时负面舆情分布</div>
				<div className="pie-chart">
					<ChartCircle 
						data={this.props.distribution.focusData} 
						stamp={this.props.distribution.stamp} 
						title="关注度" 
						pos="left" />
				</div>
				<div className="pie-chart">
					<ChartCircle 
					data={this.props.distribution.countData} 
					stamp={this.props.distribution.stamp} 
					title="舆情数量" 
					pos="right" />
				</div>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		distribution: state.app.negative.distribution
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(negativeDistributionActions, dispatch);
	return {actions: boundActionCreators};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Distribution);