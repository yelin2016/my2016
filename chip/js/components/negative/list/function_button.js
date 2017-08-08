import React from 'react';
var  Function_button = React.createClass({
	render: function () {
		return (
				<input  className='function_button' onClick={this.props.click} value={this.props.value} style={{backgroundColor:this.props.color}} type="button"/>
		);
	}
});

export default Function_button;