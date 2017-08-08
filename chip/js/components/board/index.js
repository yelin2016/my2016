import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockUpLeft from './BlockUpLeft';
import BlockUpRight from './BlockUpRight';
import BlockDownLeft from './BlockDownLeft';
import BlockDownRight from './BlockDownRight';
import PopupList from '../common/popuplist';
import * as boardActions from '../../actions/board';
import Tips from '../common/tips';
import * as tipsActions from '../../actions/common/tips';

var Board = React.createClass({
	componentDidMount: function () {
		this.props.actions.getTotalCount();
		this.props.actions.getLevelCount();
		this.props.actions.getChiqTrendCount();
		this.props.actions.getForumTrendCount({
			brandNames: ['长虹','小米','乐视','创维','海信','TCL','康佳'].join(',')
		});
		this.props.actions.getForumData({
			brandNames: ['长虹','小米','乐视','创维','海信','TCL','康佳'].join(',')
		});

		// 设置定时更新数据
		clearTimeout(Util.fetchTimer);
		Util.fetchTimer = setTimeout(this.intervel, 15000);
	},
	// 定时刷新数据
	intervel: function () {
		// 重新获取数据
		this.props.actions.getTotalCount();
		this.props.actions.getLevelCount();
		this.props.actions.getChiqTrendCount();
		this.props.actions.getForumTrendCount({
			brandNames: ['长虹','小米','乐视','创维','海信','TCL','康佳'].join(',')
		});
		this.props.actions.getForumData({
			brandNames: ['长虹','小米','乐视','创维','海信','TCL','康佳'].join(',')
		});
		Util.fetchTimer = setTimeout(this.intervel, 15000);
	},
	componentWillUnmount: function () {
		clearTimeout(Util.fetchTimer);
	},
	render: function () {
		return (
			<div className="board">
				<BlockUpLeft 
					toggle={null}
					total={this.props.board.total} 
					level={this.props.board.level} />
				<BlockUpRight trendData={this.props.board.chiqTrend} stamp={this.props.board.chiqTrendStamp} />
				<BlockDownLeft 
					toggle={null}
					brandData={this.props.board.brandData} />
				<BlockDownRight trendData={this.props.board.forumTrend} stamp={this.props.board.forumTrendStamp}/>
				{/*
				<PopupList 
					actions={this.props.actions}
					cancelAction={'CANCEL_BOARD_WARNING'}
					popupStatus={this.props.board.popupStatus} 
					popupData={this.props.board.popupData}
					showTips={this.props.tipsActions.showTips} />
				<Tips tipStatus={this.props.tipStatus} hideTips={this.props.tipsActions.hideTips} ></Tips>
			*/}
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		board: state.app.board,
		tipStatus: state.app.common.tips
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(boardActions, dispatch);
	var tipsActionCreators = bindActionCreators(tipsActions, dispatch);
	return {actions: boundActionCreators, tipsActions: tipsActionCreators};
};


// export default Board;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);