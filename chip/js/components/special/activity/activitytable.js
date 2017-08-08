import React from 'react';
import Tablelist from './Tablelist';
var arrnull=[
{
    zhuti:'',
    biaoqian:'',
    luntan:'',
    wangzhi:'',
    zhongguanzhu:'',
    dianji:'',
    huifu:'',
    rijunguan:'',
    fatieriqi:'',
    gengxin:'',
    url:'',
},
];

var Activitytable=React.createClass({
  
	componentDidMount: function () {
            $(this.refs.listBox).mCustomScrollbar({
                  theme:"light-3"
            });
      },
	render : function(){
        var arr=[];
        var arrTr=this.props.redata;
        var pagenum=7;
        var pages=Math.ceil(arrTr.length/pagenum);
        
        if(this.props.currentpaper<pages){
             for(var i=this.props.currentpaper*pagenum-pagenum;i<this.props.currentpaper*pagenum;i++){
                if(i%2==0)
                   { arr.push(<Tablelist key={i} arr={arrTr[i]} className="activity-tr-color"/>);}
                else{
                    arr.push(<Tablelist key={i} arr={arrTr[i]} />);
                }
            }  
        }
        if(this.props.currentpaper==pages){
            for(var j=this.props.currentpaper*pagenum-pagenum;j<arrTr.length;j++){
             
               if(j%2==0) 
                  { arr.push(<Tablelist key={j} arr={arrTr[j]} className="activity-tr-color"/>);}
               else{
                    arr.push(<Tablelist key={j} arr={arrTr[j]} />);
                  }    
            }


        }
		return(
			<div className="activity-table-div">
                  <div ref="listBox" style={{position:'relative',height:'7.80rem'}}>
				<table className="activity-table">
                   <thead >
                   <tr className="activity-table-thead">
                   <th className="activity-width-241">活动主题</th>
                   <th className="activity-width-110">活动标签</th>
                   <th className="activity-width-110">活动论坛</th>
                   <th className="activity-width-240">网址</th>
                   <th className="activity-width-110">总关注度</th>
                   <th className="activity-width-94">点击量</th>
                   <th className="activity-width-94">回复量</th>
                   <th className="activity-width-120">日均关注度</th>
                   <th className="activity-width-130">发帖日期</th>
                   <th className="activity-width-181">最后更新日期</th>
                   <th className="activity-width-70">操作</th>
                   </tr>
                   </thead>
                   <tbody>
                     {arr}
                   </tbody>
                  
				</table>
			</div>	
                  </div>
			);
	}
});

export default Activitytable;