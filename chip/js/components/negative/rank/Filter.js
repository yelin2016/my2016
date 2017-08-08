/**负面舆情排行——搜索过滤框组件**/
import React from 'react';
import Chk from './Filter_chk';

var Filter = React.createClass({
	getInitialState: function () {
		return {
			typeLabel: this.props.typeLabel,
			sourceType: this.props.sourceType
			// typeLabel:{
			// 	1:false,
			// 	2:false,
			// 	3:false,
			// 	4:false

			// },
			// sourceType:{
			// 	1:false,
			// 	2:false,
			// 	3:false,
			// 	4:false
			// }
		};
	},
//将选择的条件状态保存到组件的state.
	change: function (key,type) {
		var obj = {};
		obj[key] = !this.state[type][key]; 
		var obj2 = {};
		obj2[type]= Object.assign({}, this.state[type], obj);
		this.setState(obj2);
	},
//点击查询按钮时触发一个action，把查询条件保存到store。设置refresh为true，准备下次收到收到新的props后刷新接口数据。
	query:function(){
    var a=this.state.typeLabel;
    var b=this.state.sourceType;
    var typeselect=[];
    var sourceselect=[];
    for (var n in a) {
    	if(a[n]==true) {
    		typeselect.push(n)
    	}
    };
  	for (var m in b) {
    	if(b[m]==true) {
    		sourceselect.push(m)
    	}
  	};
		this.props.act_select.rankselect(this.state.typeLabel, this.state.sourceType, typeselect, sourceselect, true);
	},
	componentDidMount:function(){
		// 舆情类型选项
		this.props.act_select.getRankTypeData();
		// 来源网站选项
		this.props.act_select.getRankSourceData();
		// top10列表数据
		this.props.act_select.getRankData(this.props.typeSelect, this.props.sourceSelect);
	},
	componentWillReceiveProps: function(nextProps) {
    if (this.props.refresh==false && nextProps.refresh == true){
    	 this.props.act_select.getRankData(nextProps.typeSelect,nextProps.sourceSelect);
  	}
	},
	render: function () {
    var chkListData =this.props.typedata;
		var fromlist_data = this.props.sourcedata;
    var typeLabel = this.state.typeLabel;
		var sourceType = this.state.sourceType;
		var i, chkList = [];

		for (i =0; i < chkListData.length; i++) {
			if (chkListData[i].typeLabelId == -1) {
				continue;
			}
			chkList.push(
				<Chk 
					type='typeLabel'
					chgchk={this.change}
					chkKey={chkListData[i].typeLabelId}
					chked={typeLabel[chkListData[i].typeLabelId]}
					info={chkListData[i].typeLabelName}
					key={i} />
			);
		};

		var j,formlist=[];
		for (j = 0; j< fromlist_data.length; j++) {
	 		if (fromlist_data[j].sourceTypeId== -1) {
				continue;
			}
	 		formlist.push(
	 			<Chk 
		 			type='sourceType'
		 			chgchk={this.change}
		 			chkKey={fromlist_data[j].sourceTypeId}
		 			chked={sourceType[fromlist_data[j].sourceTypeId]}
		 			info={fromlist_data[j].sourceTypeName}
		 			key={j} />
			);
	 	};
	 	
		return (
			<div className='filter'>
				<div className='waring-type'>
					<sapn className='waring-type-title'>预警类型：</sapn>
					{chkList}					
				</div>
				<div className='waring-from'>
					<sapn className='waring-from-title'>预警来源：</sapn>
					{formlist}
				</div>
				<div className='search'>
					<input  type="button" value="查询" onClick={this.query} className='search—button'/>
				</div>
			</div>
		);
	}
});

export default Filter;