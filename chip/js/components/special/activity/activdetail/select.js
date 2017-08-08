import React from 'react';
var Select=React.createClass({
	handleClk:function(){
       this.props.chgchk(this.props.chkkey)
	},
	render:function(){
		var classname=this.props.chked ? 'small' : 'unsmall' ;
		return  (
			<div className="compare-input" onClick={this.handleClk}>
				<span className="big"><span className={classname}></span></span>
				<span>{this.props.info}</span>
			</div>);
		
	}
});
export default Select;