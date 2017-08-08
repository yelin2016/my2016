import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from './table';
import Options from './options';
import Paper from'../../common/pagination/paper';
import TypeChgBoard from './TypeChgBoard';
import * as hotspotMonitorActions from '../../../actions/hotspot/monitor';

// 热点舆情监控页面
var Monitor = React.createClass({
	componentDidMount: function () {
		// 获取舆情级别、类型、网站类型、网站列表、标签类型、标签列表数据
		this.props.actions.getLevel();
		this.props.actions.getType();
		this.props.actions.getSite();
		this.props.actions.getSubSite();
		this.props.actions.getTypeLabel();
		this.props.actions.getSubTypeLabel();
	},
	// 页码切换
	paperclick:function(papernum){
		var currentpaper = this.props.monitorstate.currentpaper;
		if (papernum=='上一页') {
			papernum = parseInt(currentpaper) - 1;
		} else if (papernum=='下一页') {
			papernum = parseInt(currentpaper) + 1;
		};
		this.props.actions.monitor_paper(papernum);
	},
	render: function () {
		var modifyBox = null;
		if (this.props.monitorstate.modifyShow) {
			modifyBox = <TypeChgBoard
						typeList={this.props.monitorstate.typeList}
						status={this.props.monitorstate.modifyStatus}
						modify={this.props.actions.modify}
						modifyReq={this.props.actions.modifyReq}
					></TypeChgBoard>
		}
		return (
			<div style={{overflow:'hidden'}}>
				<div className='list'>
					<Options 
						monitor={this.props.monitorstate}
						levelList={this.props.monitorstate.levelList}
						typeList={this.props.monitorstate.typeList}
						siteList={this.props.monitorstate.siteList}
						subSites={this.props.monitorstate.subSites}
						labelList={this.props.monitorstate.labelList}
						subLabels={this.props.monitorstate.subLabels}
						refresh={this.props.monitorstate.refresh}
						monitor_act={this.props.actions} />
					<Table 
						modify={this.props.actions.modify}
						redata={this.props.monitorstate.data}/>
					<Paper click={this.paperclick} currentpaper={this.props.monitorstate.currentpaper} totalpaper={this.props.monitorstate.totalpaper}/>
					{modifyBox}
				</div>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		monitorstate: state.app.hotspot.monitor
	};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(hotspotMonitorActions, dispatch);
	return {actions: boundActionCreators};
};
//export default Monitor;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Monitor);

