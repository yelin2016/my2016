// 带筛选条件的下拉选择框
import React from 'react';
import InputOptionItem from './optionItem';

var InputDropList = React.createClass({
	getInitialState: function () {
		var i, index = -1, dropData = this.props.dropData;
		var curname = (this.props.curoption+'').split(':')[0];

		for (i = 0; i < dropData.length; i++) {
			if (curname == dropData[i].value) {
				index = i;
			}
		}
		return {
			// 顶部默认显示的选项序号
			index: index,
			// 禁止默认显示第一个选项标志
			nodefault:this.props.nodefault,
			// 点击确定前临时保存的选中项值和序号
			tmpvalue: '',
			tmpindex: -1,
			// 输入框的文本
			txt: ''
		};
	},
	componentWillReceiveProps: function (nextProps) {
		// 如果下拉框收起，清除临时选中项、输入的文本
		if (this.props.curActive === this.props.propKey && nextProps.curActive !== nextProps.propKey) {
			this.setState({
				tmpvalue: '',
				tmpindex: -1,
				txt: ''
			});
		}
	},
	/**
	 * 设置下拉框选中项，保存临时选中项的值和序号
	 * @param  {[type]} name  选中项属性名
	 * @param  {[type]} value 选中项的值
	 * @param  {[type]} index 选中项序号
	 * @return {[type]}       [description]
	 */
	handleSel: function (name, value, index) {
		this.setState({
			tmpvalue: value,
			tmpindex: index
		});
	},
	/**
	 * 点击确定按钮。如果有临时选中项，将选项改变传给外层组件。格式为 产品类型:型号代码
	 * @return {[type]} [description]
	 */
	selOk: function () {
		if (this.state.tmpindex > -1) {
			this.setState({
				index: this.state.tmpindex
			});
			if (this.state.txt !== '') {
				this.props.chgOption(this.props.propKey, this.state.tmpvalue+':'+this.state.txt);
			} else {
				this.props.chgOption(this.props.propKey, this.state.tmpvalue);
			}
		}
		this.props.chgActive('');	
	},
	// 文本输入
	txtChg: function (e) {
		var val = e.target.value;
		val = val.replace(/\s/g, '');
		this.setState({
			txt: val
		});
	},
	// 阻止事件传播
	prevent: function (e) {
		e.stopPropagation();
		e.preventDefault();
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
		var i, dropCls, optList = [];
		for (i = 0; i < dropData.length; i++) {
			optList.push(
				<InputOptionItem key={i} index={i} tmpindex={this.state.tmpindex} chgSel={this.handleSel} item={dropData[i]} />
			)
		}
		// 默认显示的选项
		var defaultOption =  '';
		var curcode = (this.props.curoption+'').split(':')[1];
		if (this.state.index > -1) {
			defaultOption = dropData.length > this.state.index ? dropData[this.state.index].nm : '';
			defaultOption = curcode ? defaultOption + ':'+curcode : defaultOption;
		} else {
			defaultOption = !this.state.nodefault && dropData[0] ? dropData[0].nm : '';
		}
		// 展开状态class
		dropCls = this.props.propKey == this.props.curActive ? 'active' : '';
		return (
			<div ref="drop" className="droplist" onClick={this.switchDrop} style={{position:'relative'}}>
				<span className="icon-arrow"></span>
				<div className="cur-option">{defaultOption}</div>
				<ul onClick={this.prevent} className={"option-list " + dropCls} style={{paddingRight: '100%'}}>
					{optList}
					<li className="option-btn" style={{width: '200%'}}>
						<span className="ok-btn" onClick={this.selOk}>确定</span>
					</li>
				</ul>
				<div onClick={this.prevent} className="option-text" style={{
					display: this.state.tmpindex > -1 && dropCls ? '' : 'none',
					top: (this.state.tmpindex+1)*0.3 + 'rem'
				}}>
					<input 
						value={this.state.txt}
						placeholder={'可输入型号'}
						onChange={this.txtChg}
						style={{width: '80%'}}
						type="text" />
				</div>
			</div>
		)
	}
});

export default InputDropList;