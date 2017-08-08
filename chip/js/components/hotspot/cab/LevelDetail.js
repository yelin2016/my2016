/**
 * 负面舆情分类中的分级详情组件
 */
import React from 'react';
import { hashHistory } from 'react-router'

var LevelDetail = React.createClass({
	getInitialState: function () {
		return {
			newAddHover: 0
		};
	},
	toggleNewAdd: function () {
		// console.log("hover 000000");
		this.setState({
			newAddHover: !this.state.newAddHover
		});
	},
	togglePopup: function () {
		this.props.toggle({show:true, type:'level', subType: this.props.subType, level: this.props.levelData.warningLevel});
	},
	prevent: function (e) {
		e.stopPropagation();
	},
	toList: function (e) {
		e.preventDefault();
		e.stopPropagation();
		// todo设置negative/list页面预定义查询条件
		hashHistory.push('/negative/list');
	},
	render: function () {
		var levelData = this.props.levelData;
		var newAddCls = levelData.todayNewCount > 0 ? 'new-add show' : 'new-add';
		var i, labels = [];
		for (i = 0; i < levelData.sourceTypeList.length; i++) {
			labels.push({key:levelData.sourceTypeList[i].sourceType, value: levelData.sourceTypeList[i].sourceTypeCount});
		}
		return (
			<div className={"level-item "+levelData.warningLevel} onClick={this.togglePopup}>
				<span onMouseEnter={this.toggleNewAdd} onMouseLeave={this.toggleNewAdd}  className={newAddCls}>{'+'+levelData.todayNewCount}</span>
				<div className="newadd-category" style={{
					height: this.state.newAddHover ? '' : '0'
				}}>
					<p>论坛 +1</p>
					<p>微博 +1</p>
					<p>电商 +1</p>
					<p>权威网站 +1</p>
				</div>
				<span className="count">{levelData.todayCount}</span>
				<div className="labels">
					<div className="one-label">
						<span>{labels[0] ? labels[0].key : ''}</span>
						<span style={{float:'right'}}>{labels[0] ? labels[0].value : ''}</span>
					</div>
					<div className="one-label">
						<span>{labels[1] ? labels[1].key : ''}</span>
						<span style={{float:'right'}}>{labels[1] ? labels[1].value : ''}</span>
					</div>
				</div>
				<div className="labels">
					<div className="one-label">
						<span>{labels[2] ? labels[2].key : ''}</span>
						<span style={{float:'right'}}>{labels[2] ? labels[2].value : ''}</span>
					</div>
					<div className="one-label">
						<span>{labels[3] ? labels[3].key : ''}</span>
						<span style={{float:'right'}}>{labels[3] ? labels[3].value : ''}</span>
					</div>
				</div>
				{/*<Link className="view-detail" to={"/negative/list"}>{'查看'}</Link>*/}
				<a onClick={this.toList} href="javascript:void(0);" target="_blank" className="view-detail">查看</a>
			</div>
		);
	}
});

export default LevelDetail;