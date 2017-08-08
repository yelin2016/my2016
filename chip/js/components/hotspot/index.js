import React from 'react';

var Hotspot = React.createClass({
	render: function () {
		return (
			<div className="hotspot">
				{this.props.children}
			</div>
		);
	}
});

export default Hotspot;


