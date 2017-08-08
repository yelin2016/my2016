import React from 'react';
import Options_select from'./options_select';
import DropList from '../../common/droplist';
import FilterDropList from '../../common/filterdroplist';
import InputDropList from '../../common/inputDroplist';
import DatePicker from '../../common/datepicker';
import Function_button from'./function_button';

// 条件选择面板
var Options = React.createClass({
	getInitialState: function () {
		// 当前组件下有一些下拉选框，各下拉选框选择的value保存在curoption中。
		// 当前展开的下拉选框名，保存在curActive中，为空表示没有展开的选框。
		return {
			// 各下拉框选项
			drops: this.props.monitor.condition.drops,
			// 当前展开的下拉框名称
			curDropActive: '',
			// 输入框内容
			inputs: this.props.monitor.condition.inputs,
			// 产生时间
			producetime: this.props.monitor.condition.producetime,
			// 变更时间
			changetime: this.props.monitor.condition.changetime,
			// 是否重置网站名称下拉框标志，网站类型改变之后设置
			siteResetStamp: 0
		};
	},
	/**
	 * 设置选项，当点击已选中的选项时，取消选中
	 * @param  {[type]} key   选中项在state.drops中对应的属性名
	 * @param  {[type]} value 选中项的值
	 * @return {[type]}       [description]
	 */
	chgOption: function (key, value) {
		var obj = {};
		obj[key] = this.state.drops[key] == value ? '' : value
		// 网站类型切换时，重置网站名称选框
		if (key == 'wzlx') {
			obj['wzmc'] = '';
			obj = Object.assign({}, this.state.drops, obj);
			this.setState({
				drops: obj,
				siteResetStamp: new Date().getTime()
			});
		} else {
			obj = Object.assign({}, this.state.drops, obj);
			this.setState({drops: obj});
		}
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
	// 组件加载后在window上添加事件，用于处理点击空白区域收起选框。
	componentDidMount: function () {
		window.addEventListener('click', this.foldAll);
		var param = this.getParam(this.props);
		this.props.monitor_act.getTableData(param);
	},
	componentWillUnmount: function () {
		window.removeEventListener('click', this.foldAll);
		this.resetQueryParam();
	},
	componentWillReceiveProps: function(nextProps) {
		var param;
    if (this.props.refresh==false && nextProps.refresh == true){
    	param = this.getParam(nextProps);    	
	 		this.props.monitor_act.getTableData(param);
  	}
	},
	/**
	 * 组装请求参数
	 * @param  {[type]} props 组件的属性，需要手动指定，可以为this.props或者nextProps
	 * @return {[type]}       [description]
	 */
	getParam: function (props) {
		var param, subLabels, condition = props.monitor.condition;
  	subLabels = [condition.drops.ppbq, condition.drops.cpbq, condition.drops.gnbq, condition.drops.fwbq, condition.drops.hdbq, condition.drops.qtbq];
  	subLabels = subLabels.join(',');
  	subLabels = subLabels.replace(/(^,+)|(,+$)/g, '');
  	subLabels = subLabels.replace(/,,+/g,',');
  	param = {
  		warningLevelId: condition.drops.gzd,
  		typeLabelId: condition.drops.yqlx,
  		objectContent: condition.inputs.yqnr,
  		sourceTypeId: condition.drops.wzlx,
  		sourceId: condition.drops.wzmc,
  		warnStarttime: condition.producetime.start,
  		warnEndtime: condition.producetime.end,
  		changeStarttime: condition.changetime.start,
  		chageEndtime: condition.changetime.end,
  		subtypeLabelId: subLabels,
  		productModel: condition.inputs.cpxh,
  		pageIndex: props.monitor.currentpaper,
  		pageSize: 5
  	};
  	for (var k in param) {
  		if (param[k] === '') {
  			delete param[k];
  		}
  	}
  	return param;
	},
	// 重置store中的状态
	resetQueryParam: function () {
		// 暂不清除查询条件，只重置分页
		// var k, drops = {}, inputs = {};
		// for (k in this.state.drops) {
		// 	drops[k] = '';
		// }
		// for (k in this.state.inputs) {
		// 	inputs[k] = '';
		// }
		this.props.monitor_act.monitor_query({
		 	drops: this.state.drops,
		 	inputs: this.state.inputs,
		 	producetime: this.state.producetime,
		 	changetime: this.state.producetime
		}, false);
	},
	//存储开始和结束时间
	timeChg: function (sta,en,key) {
		var times={};
		var times={start:sta,
					end:en};
		var obj={};
		obj[key]=times;
		this.setState(obj);
	},
	//存储输入的条件
	inputsChg:function(value,key){
		var input={};
		var input={[key]:value};
		var inputs=Object.assign({},this.state.inputs,input)
		this.setState({inputs: inputs});
	},
	//点击查询按钮时触发一个action，把查询条件保存到store。设置refresh为true，准备下次收到收到新的props后刷新接口数据。
	query:function(){
		 this.props.monitor_act.monitor_query({
		 	drops: this.state.drops,
		 	inputs: this.state.inputs,
		 	producetime: this.state.producetime,
		 	changetime: this.state.changetime}, true) 
	},
	// 下载表格
	download: function () {
		var url = ApiDomain + '/opinion/rest/hot/getHotpointDownload.do?';
		var param = this.getParam(this.props);
		delete param.pageIndex;
		delete param.pageSize;
		for (var k in param) {
			url += k + '=' + param[k] + '&';
		}
		Util.downloadFile(url);
	},
	render: function () {
		var i, k, showSites;
		var monitor = this.props.monitor;
		var typeList = monitor.typeList.slice(1);
		var subSites = monitor.subSites;
		var labelList = monitor.labelList;
		var subLabels = monitor.subLabels;
		var typeMaps = {};	
		//标签类型映射
		for (i = 0; i < labelList.length; i++) {
			typeMaps[labelList[i].typeLabelName] = labelList[i].typeLabelId;
		}
		// 没有选择网站类型时，显示所有的网站
		if (!this.state.drops.wzlx) {
			showSites = [];
			for (var k in subSites) {
				showSites = showSites.concat(subSites[k]);
			}
		} else {
			showSites = subSites[this.state.drops.wzlx] || [];
		}
		return (
			<div className='options'>
			<div className='options_line'>
				<div className='options_select'>
					<div className='options_select_title'>
						<span>关注度等级:</span>
					</div>
					<div  className='options_select_input'>
					  <DropList 
							curActive={this.state.curDropActive}
							curoption={this.state.drops["gzd"]}
							propKey="gzd" 
							chgOption={this.chgOption} 
							chgActive={this.chgActive}
							dropData={monitor.levelList}
							nodefault={true} />
					</div>	 
        </div>
				<Options_select 
					handlechg={this.inputsChg} 
					default={this.state.inputs.yqnr}
					keys='yqnr' 
					title='舆情内容'/>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>舆情类型:</span>
					     </div>
					 	<div  className='options_select_input'>
					 	    <DropList 
								curActive={this.state.curDropActive}
								curoption={this.state.drops["yqlx"]}
								propKey="yqlx" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={typeList}
								nodefault={true} />
					 	</div>	 
			    </div>
				<div className='options_select'>
					<div className='options_select_title'>
						<span>网站类型:</span>
					</div>
				 	<div  className='options_select_input'>
			 	    <DropList 
							curActive={this.state.curDropActive}
							curoption={this.state.drops["wzlx"]}
							propKey="wzlx" 
							chgOption={this.chgOption} 
							chgActive={this.chgActive}
							dropData={monitor.siteList}
							nodefault={true} />
				 	</div>	 
		    </div>
		    <div className='options_select'>
					<div className='options_select_title'>
						<span>网站名称:</span>
					</div>
				 	<div  className='options_select_input'>
			 	    <FilterDropList 
							curActive={this.state.curDropActive}
							curoption={this.state.drops["wzmc"]}
							propKey="wzmc"
							chgOption={this.chgOption} 
							chgActive={this.chgActive}
							dropData={showSites}
							resetStamp={this.state.siteResetStamp} />
				 	</div>	 
		    </div>
				<DatePicker 
					title="产生日期" 
					prokey="producetime" 
					start={this.state.producetime.start}
					end={this.state.producetime.end}
					chg={this.timeChg} />
				<Function_button  value='查询' color='#6aaefc' query={this.query}/>
				
			</div>
			<div className='options_line short'>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>品牌标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.drops["ppbq"]}
								propKey="ppbq" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={subLabels[typeMaps['品牌']] || []} />
						</div>	
				</div>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>产品标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <InputDropList 
									curActive={this.state.curDropActive}
									curoption={this.state.drops["cpbq"]}
									propKey="cpbq" 
									nodefault={true}
									chgOption={this.chgOption} 
									chgActive={this.chgActive}
									dropData={subLabels[typeMaps['产品']] || []} />
						</div>	
				</div>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>功能标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.drops["gnbq"]}
								propKey="gnbq" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={subLabels[typeMaps['功能']] || []} />
						</div>	
				</div>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>服务标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.drops["fwbq"]}
								propKey="fwbq" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={subLabels[typeMaps['服务']] || []} />
						</div>	
				</div>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>活动标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.drops["hdbq"]}
								propKey="hdbq" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={subLabels[typeMaps['活动']] || []} />
						</div>	
				</div>
				<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>其他标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
									curActive={this.state.curDropActive}
									curoption={this.state.drops["qtbq"]}
									propKey="qtbq" 
									chgOption={this.chgOption} 
									chgActive={this.chgActive}
									dropData={subLabels[typeMaps['其他']] || []} />
						</div>	
				</div>
				<DatePicker 
					title="变更日期" 
					prokey="changetime" 
					start={this.state.changetime.start}
					end={this.state.changetime.end}
					chg={this.timeChg} />
				<Function_button  
					query={this.download}
					value='下载表格' 
					color='#5983b2'/>
			</div>
			</div>
		);
	}
});

export default Options;
