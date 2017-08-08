import React from 'react';

var Chk = React.createClass({
	handleClk: function () {
		this.props.chgchk(this.props.type,this.props.chkKey);
	},
	render:function () {
		var class_name = this.props.chked ? 'chked' : 'unchked';
		return (
			<div className='select-list' onClick={this.handleClk}>
				<span className={class_name}></span>
				<span className={'select-info'}>{this.props.info}</span>
			</div>  
		);
	}
});

export default Chk;