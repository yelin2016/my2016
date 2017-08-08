import React from 'react';
import { Link } from 'react-router';
import BrandRect from './BrandRect';

var BlockDownLeft = React.createClass({
	render: function () {
		var i, brandList = [];
		var brandData = this.props.brandData;
		for (i = 0; i < brandData.length; i++) {
			brandList.push(
				<BrandRect toggle={this.props.toggle} brandItem={brandData[i]} key={i} />
			);
		}
		return (
			<div className="down-left">
				<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
					<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
					<span className="title-text" style={{marginLeft:"0.1rem"}}>论坛热点舆情监控</span>
					<Link className="link" to={"/more"}>{'更多'}</Link>
				</div>
				<div className="block-content" style={{height:"3.36rem",marginTop:"2px",paddingTop:"0.1rem"}}>
					{brandList}
				</div>
			</div>
		);
	}
});

export default BlockDownLeft;