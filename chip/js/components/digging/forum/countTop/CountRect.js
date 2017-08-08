import React from 'react';

// 对比详顶部的计数方块
var CountRect = React.createClass({
	render: function () {
		return (
			<div className="count-rect">
				<span className="num">{this.props.num}</span>
				<div style={{width:"0.55rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
				<span className="category">{this.props.category}</span>
			</div>
		);
	}
});

export default CountRect;