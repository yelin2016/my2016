import React from 'react';
var Options_time = React.createClass({
	render: function () {
		return (
			<div className='options_time'>
				<div  className='options_time_title'>
					<span>{this.props.title}:</span>
				</div>
				<input  className='options_time_input'  type="text"/>
				<div  className='options_time_to'>
					<span >至</span>
				</div>
				<input  className='options_time_input'  type="text"/>
			</div>
		);
	}
});

export default  Options_time;