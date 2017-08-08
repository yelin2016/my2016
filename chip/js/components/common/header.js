import React from 'react';

var Header = React.createClass({
	render: function () {
		return (
			<div className={"header"}>
				<h1>TinyVoice 小音舆情</h1>
				<div className={"header-right"}>
					<div className={"user-info ft-16"} >系统管理员</div>
					<span className={"login-btn"}></span>
				</div>
			</div>
		);		
	}
});

export default Header;