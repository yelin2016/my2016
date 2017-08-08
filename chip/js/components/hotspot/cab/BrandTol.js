import React from 'react';

var trendMap = {
	'骤降':'zj',
	'下降':'xj',
	'平缓':'ph',
	'上涨':'sz',
	'爆发':'bf'
};

var BrandTol = React.createClass({
	handlebrand:function(){
		this.props.branchg(this.props.index);
		
		// this.props.clickfun(this.props.index);

	},
	render: function () {
		var style = {
			backgroundImage:'url('+this.props.logo+')',
			display:'inline-block'
		}
		// var cls = trendMap[this.props.item.trend].clsName;
		var cls = trendMap[this.props.item.trend];
		// var nm = trendMap[this.props.item.trend].trendName;
		var nm = this.props.item.trend;
		var class_name = this.props.click ? 'click' : 'unclick';
		return (
			<div className={"brand-tab "+class_name} onClick={this.handlebrand}>
				<div className="brand-tl">
					<span className="brand-btn" style={style}></span>
					<p className="brand-name">{this.props.item.brandName}</p>
				</div>
				<div className="brand-tr">
					<span className={"brand-sidebtn " + cls}>...</span>
					<span className="brand-trend">{nm}</span>
					<div style={{width:"1.24rem",height:"1px",margin:"0.06rem 0 0.06rem 0",background:"#4f607a"}}></div>
					<span className="brand-side">热点趋势</span>
				</div>
			</div>
		);
	}
});
export default BrandTol;