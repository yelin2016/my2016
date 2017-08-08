import React from 'react';
var  Function_button = React.createClass({
	render: function () {
		return (
				<input onClick={this.props.query}  className='function_button'  value={this.props.value} style={{backgroundColor:this.props.color}} type="button"/>
		);
	}
});

export default Function_button;