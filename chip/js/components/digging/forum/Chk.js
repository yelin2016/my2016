import React from 'react';

var Chk = React.createClass({
	handleClk: function () {
    this.props.chgchk(this.props.chkKey);
  },
  offsetLeft: function () {
  	return this.refs.container.offsetLeft;
  },
	render: function () {
		var class_name = this.props.chked ? 'chked' : 'unchked';
		return (
			<div ref='container' className='select-list' onClick={this.handleClk}>
	        <span className={class_name}></span>
	        <span className="select-info">{this.props.info}</span>
	    </div>
		);
	}
});

export default Chk;