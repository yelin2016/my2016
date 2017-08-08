import React from 'react';

var Top10Item = React.createClass({
	render: function () {
		var i, labels = [];
		var item = this.props.item;
		var labelNamesList = item.typeLabelNameList.split(',');
		for (i = 0; i < labelNamesList.length; i++) {
			labels.push(
				<span key={i} className="label">{labelNamesList[i]}</span>
			);
		}
		
		return (
			<div className="top10-item">
				<div className="labels">
					{labels}
				</div>
				<div className="desc">{item.objectContent}</div>
				<div className="count">
					<p className="count-item">关注度:{item.objectFocus}</p>
					<p className="count-item">点击量:{item.browCount}</p>
					<p className="count-item">回复度:{item.replyCount}</p>
				</div>
				<a className="detail-link" target="_blank" href={item.objectUrl}>详情</a>
			</div>
		);
	}
});

export default Top10Item;