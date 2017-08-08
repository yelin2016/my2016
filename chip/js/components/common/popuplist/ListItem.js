import React from 'react';

var ListItem = React.createClass({
	hanldeTips: function () {
		// 点击解除预警时，弹出一个tips提示框，如果点击确定，分配一个cancelAction事件，
		// 注意事件状态为pending。
		var cancelAction = this.props.cancelAction;
		var id = this.props.item.objectId || this.props.item.id;
		this.props.showTips('确定要解除预警吗',{type:cancelAction,id:id, status:'pending'});
	},
	render: function () {
		var item = this.props.item;
		var timeStr = Util.timeNumToStr(item.warningDatetime);

		// 标签列表
		var labels = null;
		var i, labelList = [];
		// 解除预警按钮
		var cancelBtn = null;
		if (this.props.popupType == 'hotType') {
			labels = item.typeLabelIdList.split(',');
			for (i = 0; i < labels.length; i++) {
				labelList.push(
					<span className="label" key={i}>{labels[i]}</span>
				);
			}
		}
		if (this.props.popupType != 'hotType') {
			cancelBtn = <span className="opt-btn" onClick={this.hanldeTips}>解除预警</span>;
		}

		return (
			<li className="list-item">
				<div className="brand-name">{item.sourceName}</div>
				<div className="detail">
					<p style={{display: labels ? '' : 'none'}}>标签：{labelList}</p>
					<p>{item.objectTitle}</p>
					<p className="alert-time">预警时间 {timeStr}</p>
				</div>
				<div className="opts">
					<a className="opt-btn" target="_blank" href={item.objectUrl}>查看详情</a>
					{cancelBtn}
				</div>
			</li>
		);
	}
});

export default ListItem;