/**
 * 舆情分类计数方块组件
 */
import React from 'react';

var CountRect = React.createClass({
	// 数据超过百万，使用百万单位
	getNumUnit: function (num) {
		var out_num = 0, unit = '';
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
		var numUnit = this.getNumUnit(this.props.num)
		return (
			<div className="count-rect">
				<div className="num">
					{numUnit.num}
					<i className={"ft-14"} style={{fontStyle:'normal'}}>{numUnit.unit}</i>
					<span className="trend-icon-box">
						<i className={'trend-icon '+ this.props.trend || ''}></i>
					</span>
				</div>
				<div style={{width:"0.55rem",height:"1px",margin:"0 auto",background:"#4f607a"}}></div>
				<span className="category">{this.props.category}</span>
			</div>
		);
	}
});

export default CountRect;