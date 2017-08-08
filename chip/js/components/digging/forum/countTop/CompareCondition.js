import React from 'react';

const option = [
	['关注度','点击量','回复量','发帖数'],
	['关注度','点击量','回复量','发帖数'],
	['活动','热帖']
];

var ConditionItem = React.createClass({
	handleChg: function () {
		this.props.chg(this.props.index);
	},
	render: function () {
		return (
			<div className="item" onClick={this.handleChg}>
				<span className={"chk-dot "+this.props.chked}></span>
				{this.props.item}
			</div>
		);
	}
});

var CompareCondition = React.createClass({
	getInitialState: function () {
		return {
			unfold: false,
			selected: [
				{
					1: true,
					2: false,
					3: false,
					4: false
				},
				{
					1: true,
					2: false,
					3: false,
					4: false
				},
				{
					1: true,
					2: false
				}
			],
			curSel: null
		};
	},
	toggle: function () {
		this.setState({
			unfold: !this.state.unfold
		});
	},
	prevent: function (e) {
		e.stopPropagation();
	},
	// 改变条件选中状态
	chg: function (itemIndex) {
		// 多选
		// var obj = {};
		// var key = itemIndex*1 + 1;
		// var conIndex = this.props.curIndex;
		// var tmpSel = this.state.selected.slice(0);

		// obj[key] = !this.state.selected[conIndex][key];
		// obj = Object.assign({}, tmpSel[conIndex], obj);
		// tmpSel.splice(conIndex, 1, obj);
		// this.setState({
		// 	selected: tmpSel
		// });
		
		// 单选		
		var obj = {};
		var key = itemIndex*1 + 1;
		var curIndex = this.props.curIndex;
		var curSelected = this.state.selected[curIndex];

		for (var k in curSelected) {
			obj[k] = false;
		}
		obj[key] = true;
		this.setState({
			curSel: obj
		});
	},
	// 确定，提交选择的条件
	onOk: function () {
		var tmpSel = this.state.selected.slice(0);
		var curIndex = this.props.curIndex;
		if (this.state.curSel) {
			tmpSel.splice(curIndex, 1, this.state.curSel);
		}
		this.setState({
			unfold: !this.state.unfold,
			selected: tmpSel
		});
		// this.props.conditionChg(this.state.selected[this.props.curIndex]);
		this.props.conditionChg(tmpSel[this.props.curIndex]);
		// console.log(this.state.selected[this.props.curIndex]);
		// todo 发送action
	},
	componentWillReceiveProps: function (nextProps) {
		if (this.props.curIndex != nextProps.curIndex) {
			this.setState({
				curSel: this.state.selected[nextProps.curIndex]
			});
		}
	},
	render: function () {
		var curOption = option[this.props.curIndex];
		var curSel = this.state.curSel || this.state.selected[this.props.curIndex];
		var i, chked, itemList = [];

		for (i = 0; i < curOption.length; i++) {
			chked = curSel[i+1] ? 'chk' : '';
			itemList.push(
				<ConditionItem chg={this.chg} index={i} key={i} chked={chked} item={curOption[i]}></ConditionItem>
			)
		}
		return (
			<div className="compare-condition" onClick={this.toggle}>
				<div className="conditions" onClick={this.prevent} style={this.state.unfold?{}:{display: 'none'}}>
					{itemList}
					<span onClick={this.onOk} className="btn-ok">确定</span>
				</div>
			</div>
		);
	}
});

export default CompareCondition;