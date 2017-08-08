//过滤搜索单个选择框组件
import React from 'react';
var Chk = React.createClass({
	handleClk: function () {
		this.props.chgchk(this.props.chkKey,this.props.type);
	},
	render:function () {
		var class_name = this.props.chked ? 'chked' : 'unchked';
		return (
			<div className='select-list' onClick={this.handleClk}>
				<span className={class_name}></span>
				<span>{this.props.info}</span>
			</div>	
		);
	}
});
export default Chk;