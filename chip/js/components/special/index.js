import React from 'react';

var Special = React.createClass({
	render: function () {
		return (
			<div className="special">
				{this.props.children}
			</div>
		);
	}
});

export default Special;