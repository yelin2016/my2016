import React from 'react';

var Negative = React.createClass({
	render: function () {
		return (
			<div className="negative">
				{this.props.children}
			</div>
		);
	}
});

export default Negative;