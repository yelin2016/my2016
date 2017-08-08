import React from 'react';
import OptionItem from './optionItem';

// 多选下拉选择框
var CheckboxDroplist = React.createClass({
	getInitialState: function () {
		var i, j, nm = [], dropData = this.props.dropData;
		var curoptionArr = this.props.curoption === '' ? [] : this.props.curoption.split(',');

		for (i = 0; i < dropData.length; i++) {
			for(j = 0; j < curoptionArr.length; j++){
				if (curoptionArr[j] == dropData[i].value) {
					nm.push(dropData[i].nm);
				};
			};
		};
		return {
			value: this.props.curoption == '' ? [] : this.props.curoption.split(','),
			nm:nm
		}
	},
	componentWillReceiveProps: function  (nextProps)  {
		var i, j, nm = [], dropData = nextProps.dropData;
		var curoptionArr = nextProps.curoption === '' ? [] : nextProps.curoption.split(',');
		// 选项改变，重新计算nm和value的值
		if (this.props.curoption !== nextProps.curoption || this.props.dropData.length != dropData.length) {
			for (i = 0; i < dropData.length; i++) {
				for(j = 0; j < curoptionArr.length; j++){
					if (curoptionArr[j] == dropData[i].value) {
						nm.push(dropData[i].nm);
					};
				};
			};
			this.setState({
				value: nextProps.curoption == '' ? [] : nextProps.curoption.split(','),
				nm:nm
			});
		}
	},
	// 设置下拉框选中项
	handleSel: function (value, name, index) {
		var valueArr = this.state.value;
		var nmArr = this.state.nm;
		var i, flag = false;

		// 如果选项数组为空，直接添加选项。
		// 如果选项数组不为空，判断是否已经添加了相同选项，如果有就不添加，并移除选项。
		if (valueArr.length == 0) {
			valueArr.push(value);
			nmArr.push(name);
		} else {
			for (i = 0; i < valueArr.length; i++) {
				if (valueArr[i] == value) {
					valueArr.splice(i,1);
					nmArr.splice(i,1);
					flag = true;
					break;
				}
			};
			if(flag == false){
				valueArr.push(value);
				nmArr.push(name);
			}
		};
		this.setState({
			value: valueArr,
			nm: nmArr
		});
		this.props.chgOption(this.props.propKey, valueArr.join(','));
	},
	// 切换展开收起状态
	switchDrop: function (event) {
		event.stopPropagation();
		event.preventDefault();
		var curActive = this.props.curActive == this.props.propKey ? '' : this.props.propKey;
		this.props.chgActive(curActive);
	},
	render: function () {
		var dropData = this.props.dropData;
		var valueArr = this.state.value;
		var i, j, chked, dropCls, optList = [];
		for (i = 0; i < dropData.length; i++) {
			chked = false;
			for (j = 0; j < valueArr.length; j++) {
				if (valueArr[j] == dropData[i].value) {
					chked = true;
					break;
				}
			}
			optList.push(
				<OptionItem key={i} index={i} chked={chked} chgSel={this.handleSel} item={dropData[i]} />
			)
		}
		var showoption=this.state.nm.toString();
		var defaultOption = dropData.length > 0 ?showoption : '';
		dropCls = this.props.propKey == this.props.curActive ? 'active' : '';
		return (
			<div ref="drop" className="droplist" onClick={this.switchDrop} style={{position:'relative'}}>
				<span className="icon-arrow"></span>
				<div className="cur-option" style={{overflow:'hidden'}}>{defaultOption}</div>
				<ul className={"option-list " + dropCls}>
					{optList}
				</ul>
			</div>
		)
	}
});

export default CheckboxDroplist;