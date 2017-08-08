/**
 * 热点舆情分品牌计数方块组件
 */
import React from 'react';

var BrandRect = React.createClass({
	getInitialState: function () {
		return {
			sortShow: ""
		};
	},
	handleMouseIn: function () {
		this.setState({
			sortShow: "show"
		});
	},
	handleMouseOut: function () {
		this.setState({
			sortShow: ""
		});
	},
	handlePopup: function () {
		if (typeof this.props.toggle === 'function') {
			this.props.toggle({show:true, type:'brand', brand: this.props.brandItem.brandName});
		}
	},
	render: function () {
		var data = this.props.brandItem;
		var brand = data.brandName == "长虹" ? "chiq" : "others";
		var showNewAdd = data.todayNewArticleCount > 0 ? 'show' : '';
		var numBlur = brand == "others" && this.state.sortShow ? "blur": "";
		return (
			<div className={"brand-rect "+brand} onMouseLeave={this.handleMouseOut}>
				<div className="num-box" onMouseEnter={this.handleMouseIn}>
					<span className={"num "+numBlur}>{data.totalArticleCount}</span>
					<div className="newAdd-box" style={{display:"inline-block",width:"0px"}}>
						<span	className={"newAdd "+showNewAdd}>{"+"+data.todayNewArticleCount}</span>
					</div>
				</div>
				<div className={"sort "+this.state.sortShow} >
					<p style={{marginTop:"0.1rem"}}>
						<span style={{marginRight:"0.3rem"}}>关注</span><span>{data.totalFocusCount || 0}</span>
					</p>
					<p>
						<span style={{marginRight:"0.3rem"}}>热帖</span><span>{data.totalHotArticleCount || 0}</span>
					</p>
					<p>
						<span style={{marginRight:"0.3rem"}}>活动</span><span>{data.totalActivityCount || 0}</span>
					</p>
				</div>
				<p className="brand-name" onClick={this.handlePopup}>{data.brandName}</p>
			</div>
		);
	}
});

export default BrandRect;