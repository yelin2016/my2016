import React from 'react';
var Options_select = React.createClass({
	handlechg:function(event){
		var key=this.props.keys;
		this.props.handlechg(event.target.value,key);
	},
	render: function () {
		return (
			<div className='options_select'>
			    <div className='options_select_title'>
			    	<span>{this.props.title}:</span>
			    </div>
				<input  className='options_select_input' maxLength={this.props.maxlength} onBlur={this.handlechg} type="text" />
			</div>
		);
	}
});

export default Options_select;