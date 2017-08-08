import React from 'react';
import Options_select from'./options_select';
import Function_button from'./function_button';
import FilterDropList from '../../common/filterdroplist';
import DropList from '../../common/droplist';
import CheckboxDroplist from '../../common/checkboxDroplist';
import DatePicker from '../../common/datepicker';

var Options = React.createClass({
	getInitialState: function () {
		// 当前组件下有一些下拉选框，各下拉选框选择的value保存在state中对应的属性中。
		// 当前展开的下拉选框名，保存在curDropActive中，为空表示没有展开的选框。
		var stateCon = this.props.stateData.condition;
		return {
			// 舆情级别
			warningLevelId: stateCon.warningLevelId || '',
			// 标签类型
			typeLabelId: stateCon.typeLabelId || '',
			// 预警内容
			objectContent:'',
			// 网站类型
			sourceTypeId:'',
			// 网站
			sourceId:'',
			// 产生时间
			warnStarttime:'',
			warnEndtime:'',
			// 修改时间
			changeStarttime:'',
			changeEndtime:'',
			// 产品型号
			productModel:'',
			// 服务标签
			fwbq_subid:'',
			// 品牌标签
			ppbq_subid:'',
			// 产品标签
			cpbq_subid:'',
			// 功能标签
			gnbq_subid:'',
			// 当前展开的下拉框
			curDropActive: '',
			// 是否重置网站名称下拉框标志，网站类型改变之后设置
			siteResetStamp: 0
		};
	},
	/**
	 * 设置选项，当点击已选中的选项时，取消选中
	 * @param  {[type]} key   选项在state中对应的属性名
	 * @param  {[type]} value 选项的值
	 * @param  {[type]} name  选项的名称
	 * @return {[type]}       [description]
	 */
	chgOption: function (key, value, name) {
		// console.log(key, value, name, this.state[key] == value);
		var obj = {};
		obj[key] = this.state[key] == value ? '' : value
		// 网站类型切换时，重置网站名称选框
		if (key == 'sourceTypeId') {
			obj['sourceId'] = '';
			obj['siteResetStamp'] = new Date().getTime();
			this.setState(obj);
		} else {
			this.setState(obj);
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
		// 获取分级数据
		this.props.actions.getListWaringLevel();
		// 获取网站类型数据
		this.props.actions.getListSourceTypeId();
		// 获取网站数据
		this.props.actions.getSourceSite();
		// 获取标签类型数据
		this.props.actions.getTypeLabelList();
		// 获取标签数据
		this.props.actions.getSubTypeLabel();
		// 获取列表数据
		this.props.actions.getListData(this.getParam(this.props));
		
		setTimeout(function () {
			this.props.actions.getListWaringLevel();
		}.bind(this), 5000);
	},
	componentWillReceiveProps: function (nextProps) {
    if (this.props.refresh == false && nextProps.refresh == true) {
			this.props.actions.getListData(this.getParam(nextProps));
  	}
	},
	componentWillUnmount: function () {
		window.removeEventListener('click', this.foldAll);
	},
	/**
	 * 组装请求参数
	 * @param  {[type]} props 组件的属性，需要手动指定，可以为this.props或者nextProps
	 * @return {[type]}       [description]
	 */
	getParam: function (props) {
		var condition = props.stateData.condition;
		var arr = ['fwbq_subid','ppbq_subid','cpbq_subid','gnbq_subid'];
	 	var name, subtypeLabelId = [];
	 	for (var i = 0; i < arr.length; i++) {
	 		name = arr[i];
      if (condition[name] !== '') {
         subtypeLabelId.push(condition[name]);
      }
	 	};
		var param = {
			warningLevelId: condition.warningLevelId,
			typeLabelId: condition.typeLabelId,
			subtypeLabelId: subtypeLabelId.join(','),
			objectContent: condition.objectContent,
			sourceTypeId: condition.sourceTypeId,
			sourceId: condition.sourceId,
			warnStarttime: condition.warnStarttime,
			warnEndtime: condition.warnEndtime,
			changeStarttime: condition.changeStarttime,
			chageEndtime: condition.chageEndtime,
			productModel: condition.productModel,
			pageIndex: props.stateData.pageIndex,
			pageSize: props.stateData.pageSize
		};
		return param;
	},
	//存储开始和结束时间
	timeChg: function (sta,en,key) {
		var start={},end={};
		start[key[0]]=sta;
		end[key[1]]=en;
		var obj=Object.assign({},this.state,start,end);
		this.setState(obj);
	},
	//存储输入的条件
	inputsChg:function(value,key){
		this.setState({objectContent: value});
	},
	// 点击查询按钮，保存输入框、选择框的内容到store，设置refresh为true，准备下次收到收到新的props后刷新接口数据。
	query:function(){ 
		this.props.actions.list_query({
			warningLevelId: this.state.warningLevelId,
			typeLabelId: this.state.typeLabelId,
			objectContent: this.state.objectContent,
			sourceTypeId: this.state.sourceTypeId,
			sourceId: this.state.sourceId,
			warnStarttime: this.state.warnStarttime,
			warnEndtime: this.state.warnEndtime,
			changeStarttime: this.state.changeStarttime,
			chageEndtime: this.state.changeEndtime,
			productModel: this.state.productModel,
			fwbq_subid: this.state.fwbq_subid,
			ppbq_subid: this.state.ppbq_subid,
			cpbq_subid: this.state.cpbq_subid,
			gnbq_subid: this.state.gnbq_subid
		}, true);
	},
	//点击下载按钮
	download:function(){
		var param = this.getParam(this.props);
		delete param.pageSize;
		delete param.pageIndex;
		var url = ApiDomain + "/opinion/rest/negative/getNegativeWarningDownload?";
		url+=jQuery.param(param);
		Util.downloadFile(url);
	},
	render: function () {
		var warntime_name=["warnStarttime","warnEndtime"];
		var changetime_name=["changeStarttime","changeEndtime"];
		var stateData = this.props.stateData;
		var labelList = stateData.TypeLabelListdata;
		var subLabels = stateData.subLabels;
		var subSites = stateData.subSites;
		var i, k, showSites, typeMaps = {};	

		//标签类型映射
		for (i = 0; i < labelList.length; i++) {
			typeMaps[labelList[i].nm] = labelList[i].value;
		}
		// 没有选择网站类型时，显示所有的网站
		if (!this.state.sourceTypeId) {
			showSites = [];
			for (k in subSites) {
				showSites = showSites.concat(subSites[k]);
			}
		} else {
			showSites = subSites[this.state.sourceTypeId] || [];
		}

		return (
			<div className='options'>
				<div className='options_line'>
					<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>预警级别:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <DropList 
								curActive={this.state.curDropActive}
								curoption={this.state.warningLevelId}
								propKey="warningLevelId" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={this.props.stateData.Waringleveldata}
								nodefault={true} />
					 	</div>	 
			        </div>
					<Options_select handlechg={this.inputsChg} keys='objectContent' maxlength={70} title='预警内容'/>
					<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>网站类型:</span>
					     </div>
					 	<div  className='options_select_input'>
					 	    <DropList 
								curActive={this.state.curDropActive}
								curoption={this.state.sourceTypeId}
								propKey="sourceTypeId" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={this.props.stateData.SourceTypeIddata}
								nodefault={true} />
					 	</div>	 
			        </div>
					<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>预警网站:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.sourceId}
								propKey="sourceId" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={showSites}
								resetStamp={this.state.siteResetStamp} />
					 	</div>	 
			        </div>
			        <div className='options_select'>
					     <div className='options_select_title'>
					     	<span>服务标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.fwbq_subid}
								propKey="fwbq_subid" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={subLabels[typeMaps['服务']] || []} />
					 	</div>	 
			        </div>
					<DatePicker title="产生日期" prokey={warntime_name} chg={this.timeChg} />
					<Function_button  value='查询' click={this.query} color='#6aaefc'/>
				</div>
				<div className='options_line'>
					<div className='options_select'>
					     <div className='options_select_title'>
					     	<span>预警标签:</span>
					     </div>
					 	<div  className='options_select_input'>
					 	    <CheckboxDroplist 
								curActive={this.state.curDropActive}
								curoption={this.state.typeLabelId}
								propKey="typeLabelId" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={labelList} />
					 	</div>	 
			        </div>
			        <div className='options_select'>
					     <div className='options_select_title'>
					     	<span>品牌标签:</span>
					     </div>
					 	 <div  className='options_select_input'>
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.ppbq_subid}
								propKey="ppbq_subid" 
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
					 	    <FilterDropList 
								curActive={this.state.curDropActive}
								curoption={this.state.cpbq_subid}
								propKey="cpbq_subid" 
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
								curoption={this.state.gnbq_subid}
								propKey="gnbq_subid" 
								chgOption={this.chgOption} 
								chgActive={this.chgActive}
								dropData={subLabels[typeMaps['功能']] || []} />
					 	</div>	 
			        </div>
					<DatePicker title="变更日期" prokey={changetime_name} chg={this.timeChg} />
					<Function_button click={this.download} value='下载表格' color='#5983b2'/>
				</div>
			</div>
		);
	}
});

export default Options;
