import React from 'react';

var levelMap = {"lv1":"客户服务","lv2":"物流配送","lv3":"产品安装","lv4":"产品维修"};
// var colorMap = {"lv1":"#f195bc","lv2":"#7fa3df","lv3":"#7bdda7","lv4":"#f0e296"};
var colorMap = {"客服服务":"#f195bc","物流配送":"#7fa3df","产品安装":"#7bdda7","售后维修":"#f0e296"};

var commentsList = [
	'这里是精选的用户评论，或者评论最多的热点',
	'这里是精选的用户评论，或者评论最多的热点',
	'这里是精选的用户评论，或者评论最多的热点',
	'这里是精选的用户评论，或者评论最多的热点',
	'这里是精选的用户评论，或者评论最多的热点'
];

var StaticBoard = React.createClass({
	render: function () {
		var item = this.props.item;
		var commentsList = item.replyLabelList;
		var i, commentItems = [];
		for (i = 0; i < commentsList.length; i++) {
			commentItems.push(
				<p className="comment" key={i}>{commentsList[i].labelName}</p>
			);
		}
		return (
			<div className="static-board">
				<div className="top-bar" style={{
					background: colorMap[item.subtypeLabelName]
				}}></div>
				<div className="numbers">
					<p className="numbers-title">{item.subtypeLabelName}</p>
					<div className="num-item">
						<p>关注度:</p>
						<p>{item.totalFocus || 0}</p>
					</div>
					<div className="num-item">
						<p>占比:</p>
						<p>{Math.ceil(item.totalFocus*100/(item.totalReputation || 1))}%</p>
					</div>
					<div className="num-item">
						<p>美誉度:</p>
						<p>{item.totalReputation || 0}</p>
					</div>
				</div>
				<div className="comments">
					{commentItems}
				</div>
				<div className="bot-bar" style={{
					background: colorMap[item.subtypeLabelName]
				}}></div>
			</div>
		);
	}
});

export default StaticBoard;