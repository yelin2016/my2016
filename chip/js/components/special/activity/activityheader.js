import React from 'react';

import DatePicker from '../../common/datepicker/';
import DropList from '../../common/droplist/index';
var dropData = {
	activityf:[
	    {nm:'百度',value:'百度'},
		{nm:'腾讯',value:'腾讯'},
		{nm:'阿里',value:'阿里'},
	]};


var Activityheader=React.createClass({

	getInitialState : function (){
		return{
			inputs:{
             activityname:'',
			},
			drops: dropData.activityf[0].value,
			producetime:{
				start: '',
				end:'',
			},
			changetime:{
				start:'',
				end:'',
			},
			curDropActive:'',
		};
	},
	// 设置选项
	chgOption: function (key, value) {
		var obj = {};
		obj[key] = value;
		obj = Object.assign({}, this.state.drops, obj);
		this.setState({drops: obj});
	},
	// 设置展开的下拉框
	chgActive: function (key) {
		this.setState({
			curDropActive: key
		})
	},
	// 折叠当前组件下所有下拉框
	foldAll: function () {
		this.chgActive('');
	},
	componentDidMount: function () {
		window.addEventListener('click',this.foldAll);
		this.props.list_act.getListData();
	},
	componentWillUnmount: function(){
		window.removeEventListener('click',this.foldAll);
	},
	componentWillReceiveProps: function(nextProps) {
        if (this.props.refresh==false && nextProps.refresh == true){
        	 this.props.list_act.getListData();}
	},
	dateSelect : function (start,end,key){
		var times={};
		times={start:start,end:end};
		var obj={};
		obj[key]=times;
		this.setState(obj);
	},
	inputsChg:function(event){
		var input={};
		var key='activityname';
        var input={[key] : event.target.value};
        var inputs=Object.assign({},this.state.inputs,input);
        this.setState({inputs:inputs});
	},
	query:function(){
         this.props.list_act.list_query({
         	drops:this.state.drops,
         	inputs:this.state.inputs,
         	producetime:this.state.producetime,
         	changetime:this.state.changetime
         },true)
	},
	render : function(){
	
		return(
            <div className="activity-header">

	             <div className="activity-header-title">
	                <div className="activity-header-name">
	                   <span>活动主题:</span>
	                </div>
	                <input type="text" className="activity-header-input" onBlur={this.inputsChg}/>
	             </div>

	             <div className="activity-header-title">
	                <div className="activity-header-name">
	                   <span>活动论坛:</span>
	                </div>
	             <div  className="activity-select" >
					<DropList 
						curActive={this.state.curDropActive}
								curoption={this.state.drops["activityf"]}
								propKey="activityf" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={dropData["activityf"]} />
			    </div>
	             </div>

	          
                 <DatePicker title="发帖日期" prokey="producetime" chg={this.dateSelect} />
	             <DatePicker title="更新日期" prokey="changetime" chg={this.dateSelect} />

	            
	          
	                <button className="activity-button">查询</button>
	            
            </div>
			);
	}
});

export default Activityheader;