import React from 'react';

var Digging = React.createClass({
	render: function () {
		return (
			<div className="digging">
				{this.props.children}
			</div>
		);
	}
});

export default Digging;