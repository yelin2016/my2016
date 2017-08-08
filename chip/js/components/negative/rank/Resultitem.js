//搜索单条信息组件
import React from 'react';
import ChartLine from './ChartLine';

var Resultitem = React.createClass({
	render:function () {
	    var labels=this.props.labels.split(",");
		var i, tylist=[];
		for(i=0;i<labels.length;i++){
			tylist.push(
				<div className='type' key={i}>{labels[i]}</div>
				)
		}
		return (
			<div className='result_item'>
				<div className='item-logo' style={{backgroundImage:'url(./image/logo/'+this.props.logo+'.png)'}}>
					<div className='border'></div>
				</div>
				<div className='item-type'>
				     <div className='type-list'>
					     {tylist}
					 </div>
					 <div className='border_1'></div>
				</div>
				<div className='item-content'>
					<div className='text'>{this.props.desc}</div>
					<div className='border_1'></div>
				</div>
				<div className='item-attention'>
					 <div className='attention'>
					 	<p>当日关注度：{this.props.focus}</p>
					 	<p>总关注度：</p>
					 </div>
					<div className='border_1'></div>
				</div>
				<div className='item-chart'>
					<ChartLine 
						stamp={this.props.stamp}
						trend={this.props.trend}></ChartLine>
					<div className='border'></div>
				</div>
				<div className='item-details'><a href={this.props.url} target="_blank">详情</a></div>
			</div>	
		);
	}
});
export default Resultitem;