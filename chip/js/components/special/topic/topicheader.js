import React from 'react';
import DatePicker from '../../common/datepicker';
var Topicheader=React.createClass({
    getInitialState: function(){
      return{
      	objectContent:'',
      	warnStarttime:'',
      	warnEndtime:'',
      }
    },
    componentDidMount: function () {
        this.props.list_act.getListData(this.props.stateData);
     },
    componentWillReceiveProps:function(nextProps){
    	if(this.props.refresh == false && nextProps.refresh == true){
    		this.props.list_act.getListData(nextProps.stateData);
    	}
    },
 
	dateSelect : function(start,end,key){
		    var start={},end={};
		    start[key[0]]=sta;
		    end[key[1]]=en;
		    var obj=Object.assign({},this.state,start,end);
			this.setState(obj);
		},
	inputsChg : function(event){
	
			var input={};
			var key='topicname';
			this.setState({objectContent:event.target.value});		
	},
	query:function(){
          this.props.list_act.list_query(this.state,true);
	},
	render : function(){
		var warntime_name=["start","end"];
		return(
            <div className="topic-header">

	             <div className="topic-header-title">
	                <div className="topic-header-name">
	                   <span>专题名称:</span>
	                </div>
	                <input type="text" className="topic-header-input" onBlur={this.inputsChg} />
	             </div>
                  <DatePicker title="专题日期" chg={this.dateSelect} prokey={warntime_name} />
                 
                <button className="topic-button" onClick={this.query}>查询</button>
                <button className="topic-button" onClick={this.download}>下载表格</button>
	           
            </div>
			)
	}
})

export default Topicheader;