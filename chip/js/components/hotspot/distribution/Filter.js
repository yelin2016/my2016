import React from 'react';
import Chk from './Filter_chk';

// 论坛热点舆情分布筛选条件
var Filter = React.createClass({
	getInitialState: function () {
		return {
			// 图形类型
			graphic:{
				pie: true,
				bar: false
			},
			// 对比条件
			compare:{
				total: true,
				activity: false,
				hot: false
			},
			// 对比品牌
			brand:{
				ch:true,
				xm:true,
				ls:true,
				cw:true,
				hx:true,
				tcl:true
			}
		};
	},
	// 选项改变
	change: function (stype, key) {
		var obj = {};
		var name;
		// 图形类型、对比类型为单选
		if (stype == "graphic" || stype == "compare") {
			for (name in this.state[stype]) {
				if (name == key) {
					 obj[name] = true;
				} else {
					obj[name] = false;
				}
			}
		} else {
			obj[key] = !this.state[stype][key]; 
		};
		var obj2 = {};
		obj2 = Object.assign({}, this.state[stype], obj);
		var obj3 = {};
		obj3[stype] = obj2;
		this.setState(obj3);
		// 图形类型切换，可以不重新请求数据
		if (stype == 'graphic') {
			this.props.actions.chgChartType(obj);
		}
	},
	// 发送一个action，把选择状态保存store
	distributionSearch:function(){
		this.props.actions.query({
			graphic: this.state.graphic,
			compare: this.state.compare,
			brand: this.state.brand,
			query: true
		});
	},
	render:function(){
		var i, graphicList = [];
		var compareData = this.props.compareData;
		var graphicData = this.props.graphicData;
		var brandData= this.props.brandData;
		var graphic = this.props.graphic;
		var compare = this.props.compare;
		var brand = this.props.brand;
		for (i = 0; i < graphicData.length; i++) {
			graphicList.push(
				<Chk type='graphic' chgchk={this.change} chkKey={graphicData[i].key} chked={this.state.graphic[graphicData[i].key]} info={graphicData[i].info} key={i} />
			);
		};
		var j,comparelist=[];
		 for (j=0;j<compareData.length; j++) {
			comparelist.push(
				<Chk type='compare' chgchk={this.change} chkKey={compareData[j].key} chked={this.state.compare[compareData[j].key]} info={compareData[j].info} key={j} />
			);
		 };
		var k,brandlist=[];
		 for (k=0;k<brandData.length; k++) {
			brandlist.push(
				<Chk type='brand' chgchk={this.change} chkKey={brandData[k].key} chked={this.state.brand[brandData[k].key]} info={brandData[k].info} key={k} />
			);
		 };
		return(
			<div className='filter'>
				<div className='waring-type'>
				   <sapn className='waring-type-title'>图示类型：</sapn>
				   {graphicList}                    
				</div>
				<div className='waring-from from-compare'>
					<sapn className='waring-from-title'>对比类型：</sapn>
					{comparelist}
				</div>
				<div className='waring-from from-brand'>
					<sapn className='waring-from-title'>品牌选择：</sapn>
					{brandlist}
				</div>
				<div className='search'>
					<input  type="button" value="查询" className="search—button" onClick={this.distributionSearch}/>
				</div>
			</div>
		);
	}
});


export default Filter;
