import React from 'react';

import Topiclist from './Topiclist';

var arrnull=[
{
    topicname:'',
    topiclabel:'',
    topictype:'',
    topicdate:'',
},
];


var Topicpages = React.createClass({

    render: function () {
        var arr=[];
        var arrTr=this.props.redata;
        
        var pages=Math.ceil(arrTr.length/11);
        
        if(this.props.currentpaper<pages){
             for(var i=this.props.currentpaper*11-11;i<this.props.currentpaper*11;i++){
                if(i%2==0)
                   { arr.push(<Topiclist key={i} arr={arrTr[i]} className="topic-tr-color"/>);}
                else{
                    arr.push(<Topiclist key={i} arr={arrTr[i]} />);
                }
            }  
        }
        if(this.props.currentpaper==pages){
            for(var j=this.props.currentpaper*11-11;j<arrTr.length;j++){
             
               if(j%2==0) 
                                  { arr.push(<Topiclist key={j} arr={arrTr[j]} className="topic-tr-color"/>);}
                               else{
                                   arr.push(<Topiclist key={j} arr={arrTr[j]} />);
                               }    
            }
            for(var jj=arrTr.length;jj<this.props.currentpaper*11;jj++){
                if(jj%2==0){arr.push(<Topiclist arr={arrnull[0]} key={jj} className="topic-tr-color" />);}
                else{arr.push(<Topiclist arr={arrnull[0]} key={jj} />);}
            }

        }

        return (
            <div>
               
                <table className="topic-table">
                   <thead>
                       <tr className="topic-table-thead">
                       <th className="topic-width-524">专题舆情名称</th>
                       <th className="topic-width-272">专题标签</th>
                       <th className="topic-width-268">文档类型</th>
                       <th className="topic-width-332">发帖日期</th>
                       </tr>
                   </thead>

                   <tbody>
                   {arr}
                   </tbody> 
                    
                </table>
                
            </div>
        );
    }
});

export default Topicpages;
