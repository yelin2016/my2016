import React from 'react';
// {this.props.category}

var Table_tr = React.createClass({
	turn:function(arr){
		arr = typeof arr === 'string' ? arr.split(',') : arr;
		var i, out=[];
		for (i = 0; i < arr.length; i++) {
			out.push(
				<p className='br_p' key={i} >{arr[i]}</p>
			);
    }
    return out;
	},
	modify: function () {
		// 传入当前修改的舆情的objectId和当前类型id
		this.props.modify({
			preTypeId: this.props.item.hotpointTypeIdList,
			objectId: this.props.item.objectId
		}, 'editing');
	},
	render: function () {
		var item = this.props.item;
		return (
			<tr className="dark"> 
					<td>
            <span>{item.warningLevelName.substring(4)}</span>
					</td>
					<td className='texts-td'>{item.objectContent}</td>
					<td>{this.turn(item.hotpointTypeNameList)}</td>
					<td>{this.turn(item.brandLabel)}</td>
					<td>{this.turn(item.productLabel)}</td>
					<td>{this.turn(item.functionLabel)}</td>
					<td>{this.turn(item.serviceLabel)}</td>
					<td>{this.turn(item.activeLabel)}</td>
					<td>{this.turn(item.otherLabel)}</td>
					<td>{item.sourceName}</td>
					<td>{item.sourceTypeName}</td>
					<td className='texts-td'>{item.objectUrl}</td>
					<td>{item.objectFocus}</td>
					<td>{item.browCount}</td>
					<td>{item.replyCount}</td>
				    <td className='time'>{item.warningDatetime}</td>
				    <td className='time'>{item.warningChangeDatetime}</td>
				    <td className='CZ'>
				      <a href={item.objectUrl} target="_blank">查看详细</a><br/>
				      <a href="javascript:void(0);" onClick={this.modify} target="_blank">修改</a>
				    </td>
				</tr>
		);
	}
});

export default Table_tr;