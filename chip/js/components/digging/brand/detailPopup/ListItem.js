import React from 'react';

var ListItem = React.createClass({
	render: function () {
		var i, labelItems = [];
		var item = this.props.item;
		var labels = item.typeLabelNameList || '';
		// var labels = item.labels.split(',');
		labels = labels.split(',');
		

		for (i = 0; i < labels.length; i++) {
			if (labels[i]) {
				labelItems.push(
					<li className={"label"} key={i}>{labels[i]}</li>
				);
			}
		}
		return (
			<div className="detail-item">
				<ul className="labels">
					{labelItems}
				</ul>
				<p className="url">{item.objectUrl}</p>
				<p className="info">{item.objectTitle}</p>
				<a className="view-btn" href={item.objectUrl} target="_blank">查看详情</a>
			</div>
		)
	}
});

export default ListItem;