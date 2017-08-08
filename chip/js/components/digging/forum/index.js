import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chk from './Chk';
import DatePicker from '../../common/datepicker';
import SelPlate from './SelPlate';
import CompareDetail from './CompareDetail';
import * as diggingForumActions from '../../../actions/digging/forum';
import Tips from '../../common/tips';
import * as tipsActions from '../../../actions/common/tips';

// 论坛舆情挖掘
var Forum = React.createClass({
	getInitialState: function () {
		var forumStore = this.props.forum;

		return {
			bbs: forumStore.selBbs,
			daterange: {
				start: forumStore.duration.start,
				end: forumStore.duration.end
			},
			bbsTip: {
				display:'none',
				left:'0'
			},
			condition: {
				left: [],
				right: []
			},
			comparing: false
		};
	},
	/**
	 * 选择要对比的品牌论坛
	 * @param  {[type]} key   各品牌论坛的key
	 * @return {[type]}       [description]
	 */
	change: function (key) {
		var k, count = 0;
		var curbbs = this.state.bbs;
		var obj = {};    
    var obj2 = {};

		for (k in curbbs) {
			if (curbbs[k]) {
				count += 1;
			}
		}
		// 如果已有两个选中，并且要新增选中时，提示只能选两个。
		// 其他情况（选中不足两个，或选中两个但是取消选项）正常处理。
		if (count >= 2 && !curbbs[key]) {
			// 执行Chk组件的offsetLeft方法
			var toLeft = this.refs[key].offsetLeft();
			this.toggleBbsTip(toLeft);
		} else {
			obj[key] = !curbbs[key]; 
			obj2 = Object.assign({}, curbbs, obj);
			this.setState({
				bbs: obj2,
				comparing: false
			});
			// 将论坛选择状态保存到store
			this.props.actions.setSelBbs(obj2);
		}
	},
	/**
	 * 论坛选择数超过两个时的提示
	 * @param  {[type]} toLeft 距离左边的定位距离
	 * @return {[type]}        [description]
	 */
	toggleBbsTip: function (toLeft) {
		this.setState({
			bbsTip: {
				display:'block',
				left: toLeft+'px'
			}
		});
		var hideTip = function () {
			this.setState({
				bbsTip: {
					display:'none',
					left: ''
				}
			});
		}.bind(this);
		setTimeout(hideTip, 1000);
	}, 
	/**
	 * 设置查询时间段，时间的变化只有点查询时才会保存到store
	 * @param  {[type]} start 开始时间
	 * @param  {[type]} end   结束时间
	 * @return {[type]}       [description]
	 */
	datechange: function (start, end) {
		start = start.replace(/-(\d)-/,'-0$1-').replace(/-(\d)$/,'-0$1');
		end = end.replace(/-(\d)-/,'-0$1-').replace(/-(\d)$/,'-0$1');
		this.setState({
			daterange: {
				start: start,
				end: end
			}
		});
	},
	// 点击查询按钮
	handleQuery: function () {
		// todo 异步actions获取图表数据
		this.props.actions.setQueryParam({
			duration: {
				start: this.state.daterange.start,
				end: this.state.daterange.end,
			},
			selBbs: this.state.bbs
		});
	},
	// 操作提示，纯提示文本，不需要触发事件
	handleTip: function (text) {
		this.props.tipsActions.showTips(
			text,
			null,
			null,
			true
		);
	},
	/**
	 * 切换对比状态，选择好对比板块后点击开始对比按钮时调用
	 * @param  {[type]} status [description]
	 * @return {[type]}        [description]
	 */
	chgCompare: function (doCompare, conditions) {
		this.props.actions.setCompare(doCompare, conditions);
		// this.setState({
		// 	comparing: true
		// });
	},
	componentWillReceiveProps: function (nextProps) {
		// 获取新的论坛列表数据之后，默认选中长虹
		if (nextProps.forum.timestamp > this.props.forum.timestamp) {
			this.setState({
				bbs: nextProps.forum.selBbs
			});
		}
	},
	componentDidMount: function () {
		// 获取可以对比的论坛数据
		this.props.actions.getForums();
	},
	componentWillUnmount: function () {
		// 重置store中部分状态
		this.props.actions.resetStore();
	},
	render: function () {
		var bbsList = this.props.forum.bbsList;
		var i, comChk, selList = [], chkList = [];

		// var len = bbsList.length > 5 ? 5 : bbsList.length;
		for (i = 0; i < bbsList.length; i++) {
		// for (i = 0; i < len; i++) {
			chkList.push(
				<Chk 
					ref={bbsList[i].key}
					type='bbs' 
					chgchk={this.change} 
					chkKey={bbsList[i].key} 
					chked={this.state.bbs[bbsList[i].key]} 
					info={bbsList[i].info} 
					key={i} />
			);
			// 按左右顺序组装选择的论坛
			if (this.state.bbs[bbsList[i].key]) {
				selList.push(bbsList[i]);
			}
		}
		var compareDetail = null;
		if (this.props.forum.comparing) {
			compareDetail = <CompareDetail 
				actions={this.props.actions}
				forum={this.props.forum}
				selList={selList}
				condition={this.props.forum.compareConditons}
				duration={this.state.daterange} />;
		}
		return (
			
			<div ref="forum" className="digging-forum">
				<div ref="title" className="title">
					<span style={{float:'left'}}>选择对比：</span>
					<div className="bbs-sel-tip" style={{display:this.state.bbsTip.display,left:this.state.bbsTip.left}}>只能选择2项进行对比</div>
					{chkList}
					<DatePicker 
						title="选择时间" 
						chg={this.datechange} 
						start={this.state.daterange.start} 
						end={this.state.daterange.end} />
					<span className="btn-search" onClick={this.handleQuery}>查询</span>
				</div>
				<SelPlate 
					selList={selList} 
					duration={this.state.daterange}
					query={this.props.forum.query}
					compareConditons={this.props.forum.compareConditons}
					clearQueryFlag={this.props.actions.clearQueryFlag}
					comparing={this.props.forum.comparing} 
					chgCompare={this.chgCompare}
					showTip={this.handleTip} />
				{compareDetail}
				<Tips 
					tipStatus={this.props.tipStatus} 
					hideTips={this.props.tipsActions.hideTips} ></Tips>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		tipStatus: state.app.common.tips,
		forum: state.app.digging.forum
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(diggingForumActions, dispatch);
	var tipsActionCreators = bindActionCreators(tipsActions, dispatch);
	return {actions: boundActionCreators, tipsActions: tipsActionCreators};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Forum);