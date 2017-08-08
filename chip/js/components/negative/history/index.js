import React from 'react';
import Table from './table';
import Options from './options';
import Paper from'../../common/pagination/paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as negativeHistoryActions from '../../../actions/negative/history';
var History = React.createClass({
	paperclick:function(papernum){
		if(papernum=='上一页'){
			papernum=parseInt(this.props.state_history.pageIndex)-1;
			// console.log('点击的是'+papernum)
		}else{
			if(papernum=='下一页'){
			papernum=parseInt(this.props.state_history.pageIndex)+1}
		};
        this.props.actions.history_paper(papernum);
	},
	render: function () {
		return (
			<div className='list'>
				<Options  stateData={this.props.state_history}
					      actions={this.props.actions} 
					      refresh={this.props.state_history.refresh}/>
				<Table redata={this.props.state_history.data}/>
				<Paper click={this.paperclick} currentpaper={this.props.state_history.pageIndex} totalpaper={this.props.state_history.pageCount}/>
			</div>
		);
	}
});
// 映射state到props
function mapStateToProps (state) {
	return {
		state_history: state.app.negative.history
	};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(negativeHistoryActions, dispatch);
	return {actions: boundActionCreators};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History);
