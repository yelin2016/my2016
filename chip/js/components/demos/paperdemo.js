import React from 'react';
import Paper from'../common/pagination/paper';
var paperdemo = React.createClass({
	getInitialState: function () {
		return {
			currentpaper: 1,
			totalpaper: 8,
		};
	},
	paperclick:function(papernum){
		if(papernum=='上一页'){
			papernum=parseInt(this.state.currentpaper)-1
		}else{
			if(papernum=='下一页'){
			papernum=parseInt(this.state.currentpaper)+1}
		};
		this.setState({
			currentpaper: papernum
		});
        console.log('加载第'+papernum+'页');
	},
	save:function(){
		var tol=$('input')[0].value;
		this.setState({
			totalpaper: tol
		});
     // this.state.totalpaper= $('input')[0].value
	},
	render: function () {
		return (
			<div style={{color:'white',margin:'0.20rem'}}>
			    <div>
			      <span>请设置：总页码为</span><input onBlur={this.save} type="text"  placeholder='20'/>
			    </div>
			    <div>选择了第<span>{this.state.currentpaper}</span>页</div>
				<Paper click={this.paperclick} currentpaper={this.state.currentpaper} totalpaper={this.state.totalpaper} />
			</div>
		);
	}
});

export default paperdemo;
