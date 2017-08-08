/**
 * 负面舆情分类中的分级详情组件
 */
import React from 'react';

var levelMap = {"red":"红色","orange":"橙色","yellow":"黄色","blue":"蓝色"};

var LevelDetail = React.createClass({
	getInitialState: function () {
		return {
			newAddHover: 0
		};
	},
	// 显示、隐藏新增分类明细显示小框
	toggleNewAdd: function () {
		this.setState({
			newAddHover: !this.state.newAddHover
		});
	},
	// 显示、隐藏弹框界面
	togglePopup: function () {
		this.props.toggle({show:true, type:'level', subType: this.props.subType, level: this.props.levelData.warningLevel});
	},
	// 阻止点击事件传播
	prevent: function (e) {
		e.stopPropagation();
	},
	// 点击查看，跳转到负面舆情列表页面，并预先指定级别和标签参数。
	toList: function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.viewMore({
			level: levelMap[this.props.levelData.warningLevel],
			type: this.props.subType
		});
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