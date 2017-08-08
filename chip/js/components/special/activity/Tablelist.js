import React from 'react';


var Tablelist=React.createClass({
     showgaga:function(){
       $("#hehe").show();
       $("#gaga").show();

     },
	render : function(){
		return (
		<tr className={this.props.className}>
            <td className="activity-zhuti">{this.props.arr.zhuti}</td>
            <td>{this.props.arr.biaoqian}</td>
            <td>{this.props.arr.luntan}</td>
            <td className="activity-url">{this.props.arr.wangzhi}</td>
            <td>{this.props.arr.zhongguanzhu}</td>
            <td>{this.props.arr.dianji}</td>
            <td>{this.props.arr.huifu}</td>
            <td>{this.props.arr.rijunguan}</td>
            <td>{this.props.arr.fatieriqi}</td>
            <td>{this.props.arr.gengxin}</td>
            <td className="activity-action"><a onClick={this.showgaga}>详情</a></td>
          
			</tr>
			)
	}
})
export default Tablelist;