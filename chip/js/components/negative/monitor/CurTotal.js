/**
 * 当前负面总舆情组件
 */
import React from 'react';

var CurTotal = React.createClass({
	// 数据超过百万，使用百万单位
	getNumUnit: function (num) {
		var out_num = 0, unit = '';
		num = typeof num !== 'number' ? 0 : num;
		if (num >= 1000000) {
			unit = "百万";
			num = Math.round(num / 100000);	// 保留一位小数
			out_num = (num / 10).toFixed(1);
			out_num = out_num.replace(/\.0+$/g, "");
		} else {
			out_num = num;
			unit = "";
		}
		return {
			"num": out_num,
			"unit": unit
		}
	},
	render: function () {
		var total = this.props.total;
		var totalNum = this.getNumUnit(total.totalOpinion);
		var totalFocus = this.getNumUnit(total.totalFocus);
		var totalBrowse = this.getNumUnit(total.totalBrowseCount);
		var totalReply = this.getNumUnit(total.totalReplyCount);
		return (
			<div className="cur-total">
				<p className="title">长虹&nbsp;&nbsp;当前负面总舆情</p>
				<ul className="prop-list">
					<li className="prop-item">
						<p className="num ft-26">
							<span className="trend-icon" style={{
								backgroundImage: 'url(./image/icon/'+this.props.trendIcon+'.png)'
							}}>
							</span>{total.trend || ''}
						</p>
						<div style={{width:"1.1rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
						<span className="category">当前趋势</span>
					</li>
					<li className="prop-item">
						<p className="num">{totalNum.num}<i className={"ft-14"}>{totalNum.unit}</i></p>
						<div style={{width:"1.1rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
						<span className="category">负面舆情总数</span>
					</li>
					<li className="prop-item">
						<p className="num">{totalFocus.num}<i className={"ft-14"}>{totalFocus.unit}</i></p>
						<div style={{width:"1.1rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
						<span className="category">负面关注度</span>
					</li>
					<li className="prop-item">
						<p className="num">{totalBrowse.num}<i className={"ft-14"}>{totalBrowse.unit}</i></p>
						<div style={{width:"1.1rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
						<span className="category">负面点击量</span>
					</li>
					<li className="prop-item">
						<p className="num">{totalReply.num}<i className={"ft-14"}>{totalReply.unit}</i></p>
						<div style={{width:"1.1rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
						<span className="category">负面回复</span>
					</li>
				</ul>
			</div>
		);
	}
});

export default CurTotal;