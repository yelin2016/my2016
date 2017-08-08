import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tips from '../common/tips';
import * as tipsActions from '../../actions/common/tips';

// 操作提示框演示demo
// ******
// 因为同时页面上只有一个提示框，所以tips在store中只保存了一组数据，
// 所有页面的提示框显示都是用这一组数据来控制。
// 提示框的原理，每次提示框显示的时候，会设置点击提示框确定或取消按钮
// 时触发的事件，提示框本身只管触发事件。事件的处理在具体的模块里面定义。
// 如果点击某个按钮不需要触发，对应的事件传null。
var Tipsdemo = React.createClass({
	handleDel: function () {
		// 三个参数分别为：
		// 提示框中显示的文本内容
		// 点击确定按钮时需要分配的事件,不需要传null
		// 点击取消按钮时需要分配的事件,不需要传null
		this.props.tipsActions.showTips(
			'确定要删除数据吗?',
			{type:'EXAMPLE_ACTION_OK',param:'foo'},
			{type:'EXAMPLE_ACTION_CANCEL',param:'bar'}
		);
	},
	handleTip: function () {
		// 操作成功提示，纯提示文本，不需要触发事件
		this.props.tipsActions.showTips(
			'操作成功!',
			null,
			null,
			true
		);
	},
	render: function () {
		return (
			<div>
				<div 
					style={{background:'#ccc',lineHeight:'0.5rem',border:'solid 1px #999',margin:'0 0.1rem',padding:'0.05rem',float:'left',cursor:'pointer'}} 
					onClick={this.handleDel}>做一个操作(例如：删除数据确认。ctrl+alt+v查看触发的事件。)</div>
					<div 
					style={{background:'#ccc',lineHeight:'0.5rem',border:'solid 1px #999',margin:'0 0.1rem',padding:'0.05rem',float:'left',cursor:'pointer'}} 
					onClick={this.handleTip}>纯提示文本(例如：操作成功提示。ctrl+alt+v查看触发的事件。)</div>
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
		tipStatus: state.app.common.tips
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var tipsActionCreators = bindActionCreators(tipsActions, dispatch);
	return {tipsActions: tipsActionCreators};
};

// ***
// connect应该只在模块各页面的最外层组件上做。
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tipsdemo);
