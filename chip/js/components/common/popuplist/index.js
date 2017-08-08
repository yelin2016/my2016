// 弹出窗口，显示6条最新舆情数据。舆情看板页面和负面舆情页面使用
import React from 'react';
import ListItem from './ListItem';

var levelMap = {"red":"红色","orange":"橙色","yellow":"黄色","blue":"蓝色"};

var PopupList = React.createClass({
	componentDidMount: function () {
		$(this.refs.listBox).mCustomScrollbar({
			theme:"light-3"
		});
	},
	componentWillReceiveProps: function (nextProps) {
		// 如果弹框由隐藏转为显示状态，重新加载数据
		if (nextProps.popupStatus.show && !this.props.popupStatus.show) {
			// setTimeout(this.fetchData, 500);
			this.fetchData(nextProps);
		}
	},
	componentDidUpdate: function () {
		// 组件更新后，如果cancelId不为0，有需要解除预警的数据。调用接口，解除预警。
		if (this.props.popupStatus.cancelId != 0) {
			// setTimeout(this.cancelWarning, 200);
			this.cancelWarning();
		}
	},
	fetchData: function (props) {
		var popupStatus = props.popupStatus;
		var query = popupStatus.type == 'level' ? popupStatus.level : popupStatus.brand;
		this.props.actions.getPopupData(popupStatus.type, query, popupStatus.subType);
	},
	cancelWarning: function () {
		this.props.actions.doCancelWarning(this.props.popupStatus.cancelId);
	},
	handleClose: function () {
		this.props.actions.togglePopup({show: false});
	},
	// 查看更多
	viewMore: function () {
		this.props.viewMore({
			type: this.props.popupStatus.subType,
			level: levelMap[this.props.popupStatus.level]
		});
		this.props.actions.togglePopup({show: false});
	},
	render: function () {
		var title, i, itemList = [];
		var popupStatus = this.props.popupStatus;
		var listData = this.props.popupData;
		var visibility = popupStatus.show ? '' : 'hide';

		switch (popupStatus.type) {
			case 'level':
				title = popupStatus.subType+'负面舆情'+levelMap[popupStatus.level]+'预警';
				break;
			case 'brand':
				title = popupStatus.brand + '舆情预警';
				break;
			case 'hotType':
				title = popupStatus.brand + '热点舆情' + '\u00a0\u00a0\u00a0\u00a0' +  popupStatus.subType + '类';
				break;
			default:
				title = '舆情';
				break;
		}
		
		for (i = 0; i < listData.length; i++) {
			itemList.push(
				<ListItem 
					key={i} 
					popupType={popupStatus.type}
					cancelAction={this.props.cancelAction} 
					item={listData[i]} 
					showTips={this.props.showTips} />
			);
		}
		return (
			<div className={"popup-cover "+visibility}>
				<div className="popup-container">
					<div className="popup-title">{title}
						<span className="close-btn" onClick={this.handleClose}></span>
					</div>
					<div ref="listBox" className="popup-content">
						<ul>
							{itemList}
						</ul>
					</div>
					<div className="popup-footer">
						<a href="javascript:void(0);" onClick={this.viewMore} className="view-more">查看更多</a>
					</div>
				</div>
			</div>
		);
	}
});

export default PopupList;