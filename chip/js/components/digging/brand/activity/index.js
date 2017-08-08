import React from 'react';
import ChartLine from './ChartLine';
import ActivityItem from './ActivityItem';

var acList = [
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589},
	{source: '奇珀网', info: '这里主要是活动主题的内容归纳点击此条可以转到活动详情...', url: 'https://www.baidu.com', focus: 6589}
];

var Activity = React.createClass({
	render: function () {
		var acList = this.props.data;
		var i, actItems = [];
		for (i = 0; i < acList.length; i++) {
			actItems.push(
				<ActivityItem 
				index={i}
				key={i}
				url={acList[i].objectUrl}
				focus={acList[i].objectFocus}
				info={acList[i].objectTitle}
				source={acList[i].sourceName}></ActivityItem>
			);
		}
		return (
			<div className="scroll-content activity" style={{top: this.props.top}}>
				<div className="trend">
					<ChartLine></ChartLine>
				</div>
				<div className="rank">
					<div className="title">当月活动排行</div>
					<div className="list-header">
						<div className="td-l">来源网站</div>
						<div className="td-m">活动主题</div>
						<div className="td-r">关注度</div>
					</div>
					{actItems}
				</div>
			</div>
		);
	}
});

export default Activity;