import React from 'react';
import InputDropList from '../common/inputDroplist';

var dropData = [
	{nm:'选项1',value:201},
	{nm:'选项2',value:202},
	{nm:'选项3',value:203},
	{nm:'选项4',value:204},
	{nm:'选项5',value:205}
];
var InputDropdemo = React.createClass({
	getInitialState: function () {
		// 当前组件下有一些下拉选框，各下拉选框选择的value保存在curoption中。
		// 当前展开的下拉选框名，保存在curActive中，为空表示没有展开的选框。
		return {
			curoption: {
				drop1: '',
				drop2: ''
			},
			txtdrop1: '',
			txtdrop1: '',
			curActive: ''
		};
	},
	// 设置选项
	chgOption: function (key, value) {
		var obj = {};
		obj[key] = value;
		obj = Object.assign({}, this.state.curoption, obj);
		this.setState({curoption: obj});
	},
	// 设置展开的下拉框
	chgActive: function (key) {
		this.setState({
			curActive: key
		})
	},
	// 折叠当前组件下所有下拉框
	foldAll: function () {
		this.chgActive('');
	},
	// 组件加载后在window上添加事件，用于处理点击空白区域收起选框。
	componentDidMount: function () {
		window.addEventListener('click', this.foldAll);
	},
	componentWillUnmount: function () {
		window.removeEventListener('click', this.foldAll);
	},
	render: function () {
		return (
			<div ref="forum" className="digging-forum" onClick={this.fold}>
				<div style={{color:'#fff'}}>论坛舆情挖掘页面</div>
				<div style={{color:'white'}}>选框1的值: {this.state.curoption["drop1"]} - {this.state.txtdrop1}</div>
				<div style={{color:'white'}}>选框2的值: {this.state.curoption["drop2"]} - {this.state.txtdrop2}</div>

				<div style={{width:'1.5rem',float:'left',marginLeft:'0.2rem'}}>
					<InputDropList 
						curActive={this.state.curActive}
						curoption={this.state.curoption["drop1"]}
						propKey="drop1" 
						nodefault={true}
						chgOption={this.chgOption} 
						chgActive={this.chgActive}
						dropData={dropData} />
				</div>

				<div style={{width:'2rem',float:'left',marginLeft:'0.2rem'}}>
					<InputDropList 
						curActive={this.state.curActive}
						curoption={this.state.curoption["drop2"]}
						propKey="drop2" 
						nodefault={true}
						chgOption={this.chgOption} 
						chgActive={this.chgActive}
						dropData={dropData} />
				</div>
			</div>
		);
	}
});

export default InputDropdemo;