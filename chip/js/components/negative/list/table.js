import React from 'react';
import Table_tr from './table-tr';
// 
var Table = React.createClass({
	componentDidMount: function () {
		$(this.refs.listBox).mCustomScrollbar({
			theme:"light-3"
		});
	},
	render: function () {
		var i,table_tr=[];
		var data=this.props.redata;
		for (var i = 0; i <data.length;i++) {
				table_tr.push(
					<Table_tr  key={i} warningLevelName={data[i].warningLevelName} warningLevelId={data[i].warningLevelId} objectContent={data[i].objectContent} 
					typeLabelNameList={data[i].typeLabelNameList} brandLabel={data[i].brandLabel} 
					productLabel={data[i].productLabel} functionLabel={data[i].functionLabel} serviceLabel={data[i].serviceLabel} sourceName={data[i].sourceName}
					sourceTypeName={data[i].sourceTypeName}  objectId={data[i].objectId} objectUrl={data[i].objectUrl} objectFocus={data[i].objectFocus} 
					browCount={data[i].browCount} replyCount={data[i].replyCount} replyNegativeRate={data[i].replyNegativeRate} 
					warningDatetime={data[i].warningDatetime} warningChangeDatetime={data[i].warningChangeDatetime} objectId={data[i].objectId}
					handleWarning={this.props.handleWarning}/>
					)
		};
		return (
			    <div className='tablediv'>
			      <div ref="listBox" style={{position:'relative',height:'7.57rem'}}>
					<table className='table' >
					  <tbody>
						<tr className="table-th">
							<td className='width-80'>预警级别</td>
							<td className='width-185'>预警内容</td>
							<td className='width-80'>预警标签</td>
							<td className='width-80'>品牌标签</td>
							<td className='width-80'>产品标签</td>
							<td className='width-80'>功能标签</td>
							<td className='width-80'>服务标签</td>
							<td className='width-80'>预警网站</td>
							<td className='width-80'>网站类型</td>
							<td className='width-190'>网址</td>
							<td className='width-65'>关注度</td>
							<td className='width-65'>点击量</td>
							<td className='width-65'>回复量</td>
							<td className='width-65'>差评率</td>
						    <td className='width-105'>预警产生时间</td>
						    <td className='width-105'>预警变更时间</td>
						    <td style={{width:'*'}}>操作</td>
						</tr>
						{table_tr}
						</tbody>
					</table>
					</div>
				</div>
			
		);
	}
});

export default Table;