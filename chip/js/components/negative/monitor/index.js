import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurTotal from './CurTotal';
import LevelTotal from './LevelTotal';
import CategoryDetail from './CategoryDetail';
import * as negativeMonitorActions from '../../../actions/negative/monitor';
import PopupList from '../../common/popuplist';
import Tips from '../../common/tips';
import * as tipsActions from '../../../actions/common/tips';

import { hashHistory } from 'react-router';

// 测试用数据,舆情数据走势图标
var trendImgs = ['icon_explosion','icon_up','icon_smooth','icon_down','icon_sudden'];
// 走势图标
var trendImgMap = {
	"爆发": "icon_explosion",
	"上涨": "icon_up",
	"平缓": "icon_smooth",
	"下降": "icon_down",
	"骤降": "icon_sudden"
};
// 跳转列表页面预设参数map
var presetLevelMap = {'红色':1,'橙色':2,'黄色':3,'蓝色':4};
var presetTypeMap = {'品牌':1,'产品':2,'功能':3,'服务':4};

var Monitor = React.createClass({
	componentDidMount: function () {
		this.props.actions.getTotalCount();
		this.props.actions.getLevelCount();
		this.props.actions.getCategory();
		this.props.actions.getTrendData();

		// 设置定时更新数据
		clearTimeout(Util.fetchTimer);
		Util.fetchTimer = setTimeout(this.intervel, 15000);
	},
	// 定时刷新数据
	intervel: function () {
		// 重新获取数据
		this.props.actions.getTotalCount();
		this.props.actions.getLevelCount();
		this.props.actions.getCategory();
		this.props.actions.getTrendData();
		Util.fetchTimer = setTimeout(this.intervel, 15000);
	},
	componentWillUnmount: function () {
		clearTimeout(Util.fetchTimer);
	},
	// 弹框界面查看更多
	viewMore: function (param) {
		this.props.actions.presetListParam({
			warningLevelId: presetLevelMap[param.level],
			typeLabelId: presetTypeMap[param.type]+''
		});
		hashHistory.push('/negative/list');
	},
	render: function () {
		var i, j, cateList = [];
		var trendData = this.props.monitor.trend;
		var cateData = this.props.monitor.category;
		var trend;
		for (i = 0; i < cateData.length; i++) {
			trend = [];
			for (j = 0; j < 5; j++) {
				if (trendData[i*5+j]) {
					trend.push(trendData[i*5+j]);					
				}
			}
			cateList.push(
				<CategoryDetail 
					toggle={this.props.actions.togglePopup} 
					viewMore={this.viewMore}
					trendIcon={trendImgs[i]}
					cateData={cateData[i]} 
					trend={trend}
					stamp={this.props.monitor.trendStamp}
					key={i} />
			);
		}
		return (
			<div className="negative-monitor">
				<CurTotal total={this.props.monitor.total} trendIcon={trendImgMap[this.props.monitor.total.trend]} />
				<LevelTotal level={this.props.monitor.level} />
				<div>
					<br style={{clear:'both'}} />
				</div>
				{cateList}
				<PopupList 
					actions={this.props.actions}
					cancelAction={'CANCEL_NEGATIVE_WARNING'}
					popupStatus={this.props.monitor.popupStatus} 
					popupData={this.props.monitor.popupData}
					viewMore={this.viewMore}
					showTips={this.props.tipsActions.showTips} />
				<Tips tipStatus={this.props.tipStatus} hideTips={this.props.tipsActions.hideTips} ></Tips>	
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		monitor: state.app.negative.monitor,
		tipStatus: state.app.common.tips
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(negativeMonitorActions, dispatch);
	var tipsActionCreators = bindActionCreators(tipsActions, dispatch);
	return {actions: boundActionCreators, tipsActions: tipsActionCreators};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Monitor);