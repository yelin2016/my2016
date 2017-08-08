import React from 'react';
var Table_tr = React.createClass({
	//解除预警
	handleWarning:function(){
		this.props.handleWarning(this.props.objectId)
	},
	//处理返回数据中的字符串，变为数组，在页面换行展示。（如品牌标签等返回数据）
	turn:function(arr){
			var i,out=[];
			if(arr){
				var data=arr.split(",");
			for (i = 0; i < data.length; i++) {
				out.push(<p className='br_p' key={i} >{data[i]}</p>)
	          };
	          return out;
	          }
		},
	render: function () {
		var levelColor;
        switch(this.props.warningLevelId){
        	case 4:levelColor ='blue';break;
        	case 2:levelColor ='orange';break;
        	case 3:levelColor ='yellow';break;
        	case 1:levelColor ='red';break;
        	default: levelColor=''
        };
		return (
			<tr className="dark">
					<td>
                        <span className={levelColor}>{this.props.warningLevelName}</span>
					</td>  
					<td className='texts-td'>{this.props.objectContent}</td>
					<td>{this.turn(this.props.typeLabelNameList)}</td>
					<td>{this.props.brandLabel}</td>
					<td>{this.turn(this.props.productLabel)}</td>
					<td>{this.turn(this.props.functionLabel)}</td>
					<td>{this.turn(this.props.serviceLabel)}</td>
					<td>{this.props.sourceName}</td>
					<td>{this.props.sourceTypeName}</td>
					<td className='texts-td'>{this.props.objectUrl}</td>
					<td>{this.props.objectFocus}</td>
					<td>{this.props.browCount}</td>
					<td>{this.props.replyCount}</td>
					<td>{this.props.replyNegativeRate}</td>
				    <td className='time'>{this.props.warningDatetime.replace(/\.\d*$/,'')}</td>
				    <td className='time'>{this.props.warningChangeDatetime}</td>
				    <td className='CZ'>
					    <a href={this.props.objectUrl} target="_blank">查看详细</a><br/>
					    <p onClick={this.handleWarning}>解除预警</p>
				    </td>
				</tr>
		);
	}
});

export default Table_tr;