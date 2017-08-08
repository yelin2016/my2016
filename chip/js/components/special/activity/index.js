import React from 'react';

import Activityheader from './activityheader';
import Activitytable from './activitytable';

import Acdetails from './activdetail/activdetail';
import Paper from '../../common/pagination/paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as activityActions from '../../../actions/special/activity';
var Activity = React.createClass({
	paperclick:function(papernum){
		if(papernum=='上一页'){
			papernum=parseInt(this.props.liststate.currentpaper)-1
		}else{
			if(papernum=='下一页'){
			papernum=parseInt(this.props.liststate.currentpaper)+1}
		};
        this.props.actions.list_paper(papernum);
	},
	componentWillReceiveProps:function(nextProps){
        if(this.props.refresh==false && nextProps.refresh == true){
        	this.props.actions.getListData();
        }
	},
	render: function () {
		
		return (
			<div className="special-activity">
				<Activityheader list_act={this.props.actions} refresh={this.props.liststate.refresh}/>
				<Activitytable redata={this.props.liststate.data} currentpaper={this.props.liststate.currentpaper}/>
				<Paper click={this.paperclick} currentpaper={this.props.liststate.currentpaper} totalpaper={Math.ceil(this.props.liststate.data.length/7)}/>
                <Acdetails />
			</div>
		);
	}
});

function mapStateToProps (state) {
	return {
		liststate: state.app.special.activity
	};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(activityActions, dispatch);
	return {actions: boundActionCreators};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Activity);