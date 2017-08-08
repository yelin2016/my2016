import React from 'react';
import Topicheader from './topicheader';
import Topictable from './topictable';
import Topicpages from './topicpages';
import Paper from '../../common/pagination/paper';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as topicListActions from '../../../actions/special/topic';
var Topic=React.createClass({
	paperclick:function(papernum){
        if(papernum=='上一页'){
            papernum=parseInt(this.props.liststate.currentpaper)-1
        }else{
            if(papernum=='下一页'){
            papernum=parseInt(this.props.liststate.currentpaper)+1}
        };
        // this.setState({
        //     currentpaper: papernum
        // });
        this.props.actions.list_paper(papernum);
        // console.log('加载第'+papernum+'页');
    },
	componentWillReceiveProps: function(nextProps) {
        if (this.props.refresh==false && nextProps.refresh == true){
        	 this.props.actions.getListData();}
	},
  render : function(){
    return (
          <div className="special-topic">
          <Topicheader list_act={this.props.actions} refresh={this.props.liststate.refresh} stateData={this.props.liststate}/>
          <Topicpages currentpaper={this.props.liststate.currentpaper} redata={this.props.liststate.data} />
          <Paper click={this.paperclick} currentpaper={this.props.liststate.currentpaper} totalpaper={Math.ceil(this.props.liststate.data.length/11)} />
          </div>
      )
  }
});

function mapStateToProps (state) {
	return {
		liststate: state.app.special.topic
	};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(topicListActions, dispatch);
	return {actions: boundActionCreators};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Topic);
