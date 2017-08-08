import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Filter from './Filter';
import Chartbar from './Chartbar';
import Chartpie from './Chartpie';
import ChartSlider from './ChartSlider';
import * as hotspotActions from '../../../actions/hotspot/distribution';

// 论坛热点舆情分布
var Distribution = React.createClass({
	getInitialState: function () {
		return {
			// 滑动条范围指示，包含开始和结束点，默认30天
			range: {
				start: 0,
				end: 29
			}
		};
	},
	componentDidMount: function () {
		this.fetchChartData();
	},
	componentWillReceiveProps: function (nextProps) {
		var start, end;
		// 数据更新后，数据范围回到初始位置
		if (nextProps.distribution.timestamp > this.props.distribution.timestamp) {
			start = 0;
			end = nextProps.distribution.dateList.length > 29 ? 29 : nextProps.distribution.dateList.length - 1;
			this.setState({
				range: {
					start: start,
					end: end
				}
			});
		}
	},
	componentDidUpdate: function (prevProps) {
		// query标志由false转为true
		if (this.props.distribution.query && !prevProps.distribution.query) {
			this.props.actions.clearQueryFlag();
			this.fetchChartData();
		}
	},
	// 获取图表数据
	fetchChartData: function () {
		var brandsel = this.props.distribution.brand;
		var brandData = this.props.distribution.data.brandData;
		var comparesel = this.props.distribution.compare;
		var compareData = this.props.distribution.data.compareData;
		var i, brandNames = [], compareType;

		for (i = 0; i < brandData.length; i++) {
			if (brandsel[brandData[i].key]) {
				brandNames.push(brandData[i].info);
			}
		}
		for (i = 0; i < compareData.length; i++) {
			if (comparesel[compareData[i].key]) {
				compareType = compareData[i].info;
			}
		}
		if (compareType == '总和') {
			compareType = '热帖,活动';
		}
		this.props.actions.getChartData({
			brandNames: brandNames.join(','),
			hotpointType: compareType
		});
	},
	// 修改日期范围
	chgRange: function (start, end) {
		this.setState({
			range: {
				start: start,
				end: end
			}
		});
	},
	render: function () {
		var chart = null;
		var chartType = this.props.distribution.graphic;
		if (chartType.pie) {
			chart = <Chartpie 
			range={this.state.range}
			dateList={this.props.distribution.dateList}
			timestamp={this.props.distribution.timestamp}
			chartData={this.props.distribution.chartData} />
		} else {
			chart = <Chartbar 
			range={this.state.range}
			dateList={this.props.distribution.dateList}
			timestamp={this.props.distribution.timestamp}
			chartData={this.props.distribution.chartData}
			brandData={this.props.distribution.data.brandData}
			brand={this.props.distribution.brand} />
		}
		return (
			<div style={{overflow: 'hidden'}}>
				<Filter 
					fetchData={this.fetchChartData}
					actions={this.props.actions}
					compareData={this.props.compareData} 
					graphicData={this.props.graphicData}
					brandData={this.props.brandData} 
					graphic={this.props.graphic} 
					compare={this.props.compare}  
					brand={this.props.brand} />
				<div>
					<ChartSlider 
						range={this.state.range}
						chgRange={this.chgRange}
						dateList={this.props.distribution.dateList}
						chartData={this.props.distribution.chartData}
						timestamp={this.props.distribution.timestamp}></ChartSlider>
					{chart}
				</div>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		distribution: state.app.hotspot.distribution,
		compareData: state.app.hotspot.distribution.data.compareData,
		graphicData: state.app.hotspot.distribution.data.graphicData,
		brandData: state.app.hotspot.distribution.data.brandData,
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var hotspotActionCreators = bindActionCreators(hotspotActions, dispatch);
	return {actions: hotspotActionCreators};
};
// export default Distribution;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Distribution);