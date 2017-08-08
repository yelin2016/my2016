import React from 'react';
import DropList from '../common/filterdroplist';

var dropData = [
	{nm:'abc',value:201},
	{nm:'bcd',value:202},
	{nm:'cde',value:203},
	{nm:'def',value:204},
	{nm:'efg',value:205}
];

var Dropdemo = React.createClass({
	getInitialState: function () {
		// 当前组件下有一些下拉选框，各下拉选框选择的value保存在curoption中。
		// 当前展开的下拉选框名，保存在curActive中，为空表示没有展开的选框。
		return {
			curoption: {
				drop1: '',
				drop2: ''
			},
			curActive: ''
		};
	},
	// 设置选项
	chgOption: function (key, name, value) {
		var obj = {};
		obj[key] = {name: name, value: value};
		console.log(obj);
		obj = Object.assign({}, this.state.curoption, obj);
		console.log(obj);
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
				<div style={{color:'white'}}>[选框1] 选项名：{this.state.curoption["drop1"].name} 值: {this.state.curoption["drop1"].value}</div>
				<div style={{color:'white'}}>[选框2] 选项名：{this.state.curoption["drop2"].name} 值: {this.state.curoption["drop2"].value}</div>

				<div style={{width:'3rem',float:'left',marginLeft:'0.2rem'}}>
					<DropList 
						curActive={this.state.curActive}
						curoption={this.state.curoption["drop1"]}
						propKey="drop1" 
						chgOption={this.chgOption} 
						chgActive={this.chgActive}
						dropData={dropData} />
				</div>

				<div style={{width:'3rem',float:'left',marginLeft:'0.2rem'}}>
					<DropList 
						curActive={this.state.curActive}
						curoption={this.state.curoption["drop2"]}
						propKey="drop2" 
						chgOption={this.chgOption} 
						chgActive={this.chgActive}
						dropData={dropData} />
				</div>
			</div>
		);
	}
});

export default Dropdemo;