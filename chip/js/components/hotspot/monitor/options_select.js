import React from 'react';
var Options_select = React.createClass({
	handlechg:function(event){
		var key=this.props.keys;
		this.props.handlechg(event.target.value,key);
	},
	render: function () {
		var defaultVal = this.props.default || '';
		return (
			<div className='options_select' style={this.props.width} >
			    <div className='options_select_title'>
			    	<span>{this.props.title}:</span>
			    </div>
				<input defaultValue={defaultVal} className='options_select_input' onBlur={this.handlechg} type="text" style={this.props.spanwidth}/>
			</div>
		);
	}
});

export default Options_select;