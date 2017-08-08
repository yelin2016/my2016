import React from 'react';
import Table from './table';
import Options from './options';
import Paper from'../../common/pagination/paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tips from '../../common/tips';
import * as tipsActions from '../../../actions/common/tips';
import * as negativeListActions from '../../../actions/negative/list';
var List = React.createClass({
	//解除预警
	handleDel: function (objectIds,refresh) {
		// 三个参数分别为：
		// 提示框中显示的文本内容
		// 点击确定按钮时需要分配的事件,不需要传null
		// 点击取消按钮时需要分配的事件,不需要传null
		this.props.tipsActions.showTips(
			'解除预警后，系统不再对该条舆情进行预警，请确认已经处理好该条舆情?',
			{type:'FETCH_NEGATIVE_LIST_PRE_HANDLEWARNING',objectIds:objectIds},
			{type:'EXAMPLE_ACTION_CANCEL',param:'bar'}
		);
	},
	//分页按钮功能，处理按钮值，修改store里的当前页面pageIndex
	paperclick:function(papernum){
		if(papernum=='上一页'){
			papernum=parseInt(this.props.list.pageIndex)-1
		}else{
			if(papernum=='下一页'){
			papernum=parseInt(this.props.list.pageIndex)+1}
		};
        this.props.actions.list_paper(papernum);
	},
	componentDidMount: function () {

	},
	//
	componentWillReceiveProps: function(nextProps) {
        if (this.props.list.deleteflag==false && nextProps.list.deleteflag == true){
        	// console.log("判断成功");
        	 this.props.actions.list_handleWarning(nextProps.list.objectIds);}
	},
	render: function () {
		return (
			<div className='list'>
				<Options 
			    stateData={this.props.list}
					actions={this.props.actions} 
					refresh={this.props.list.refresh}/>
				<Table redata={this.props.list.data} 
					handleWarning={this.handleDel}/>
				<Paper click={this.paperclick} 
					 currentpaper={this.props.list.pageIndex} totalpaper={this.props.list.pageCount}/>
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
		list: state.app.negative.list,
		tipStatus: state.app.common.tips
	};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(negativeListActions, dispatch);
	var tipsActionCreators = bindActionCreators(tipsActions, dispatch);
	return {actions: boundActionCreators,tipsActions: tipsActionCreators};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);