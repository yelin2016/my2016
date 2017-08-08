// 带筛选条件的下拉选择框
import React from 'react';
import OptionItem from './optionItem';

// 带输入模糊匹配功能的下拉框
var FilterDropList = React.createClass({
	/**
	 * 初始化时设置state状态，index当前选中项 filter过滤文本 val输入框的值
	 * @return {[type]} [description]
	 */
	getInitialState: function () {
		var i, index = -1, dropData = this.props.dropData;
		for (i = 0; i < dropData.length; i++) {
			if (this.props.curoption === dropData[i].value) {
				index = i;
			}
		}
		return {
			index: index,
			filter: index > -1 ? dropData[index].nm : '',
			val: index > -1 ? dropData[index].nm : ''
		}
	},
	componentWillReceiveProps: function (nextProps) {
		// 重置选中状态和筛选条件
		if (nextProps.resetStamp > this.props.resetStamp) {
			this.setState({
				filter: '',
				val: ''
			});
		}
	},
	/**
	 * 设置下拉框选中项，当点击已选中的选项时，取消选中
	 * @param  {[type]} name  选项名
	 * @param  {[type]} value 选项value
	 * @param  {[type]} index 选项序号
	 * @return {[type]}       [description]
	 */
	handleSel: function (name, value, index) {
		var sameOption = this.state.index == index;
		this.setState({
			index: sameOption ? -1 : index,
			filter: sameOption ? '' : name,
			val: sameOption ? '' : name
		});
		// 将选项改变传给外层组件
		this.props.chgOption(this.props.propKey, value, name);
	},
	/**
	 * 输入框获得焦点，展开下拉列表
	 * @return {[type]} [description]
	 */
	handleFocus: function () {
		this.props.chgActive(this.props.propKey);
	},
	/**
	 * 输入框失去焦点，如果内容为空，清空选项
	 * @return {[type]} [description]
	 */
	handleBlur: function (event) {
		var val = event.target.value;
		if (val == '' && this.state.index > -1) {
			this.handleSel('', '', -1);
		}
	},
	/**
	 * 表单输入，设置过滤文本。
	 * 此处input有value属性，是受控组件[http://reactjs.cn/react/docs/forms.html]，所以要设置val。
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	handleInput: function (event) {
		var val = event.target.value;
		val = val.replace(/\s/g, '');
		this.setState({
			filter: val,
			val: val
		});
	},
	/**
	 * 阻止事件继续传播。
	 * 用于输入框点击时，避免点击事件传递到父级，导致下拉框展开后马上收起。
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	prevent: function (event) {
		event.stopPropagation();
		event.preventDefault();
	},
	/**
	 * 切换展开收起状态
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	switchDrop: function (event) {
		event.stopPropagation();
		event.preventDefault();
		var curActive = this.props.curActive == this.props.propKey ? '' : this.props.propKey;
		this.props.chgActive(curActive);
	},
	render: function () {
		var dropData = this.props.dropData;
		var i, dropCls, optList = [];
		var filterDropData = [];
		var originalIndex = [];

		// 用filter文本过滤选项，生成当前选项数组。
		// 生成数组中每个选项在dropData的原始序号，保存在originalIndex数组中
		for (i = 0; i < dropData.length; i++) {
			if (dropData[i].nm.match(this.state.filter)) {
				filterDropData.push(dropData[i]);
				originalIndex.push(i);
			}
		}
		for (i = 0; i < filterDropData.length; i++) {
			optList.push(
				<OptionItem key={i} index={originalIndex[i]} chgSel={this.handleSel} item={filterDropData[i]} />
			)
		}
		dropCls = this.props.propKey == this.props.curActive ? 'active' : '';
		return (
			<div ref="drop" className="droplist" onClick={this.switchDrop} style={{position:'relative'}}>
				<span className="icon-arrow"></span>
				<div className="cur-option">
					<input 
						type="text"
						onChange={this.handleInput} 
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						onClick={this.prevent}
					 	value={this.state.val} />
				</div>
				<ul className={"option-list " + dropCls}>
					{optList}
				</ul>
			</div>
		);
	}
});

export default FilterDropList;