import React from 'react';
import Table_tr from './table-tr';

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
					<Table_tr  
						key={i} 
						item={data[i]}
						modify={this.props.modify}
						level={data[i].level} texts={data[i].texts} category={data[i].category} brand={data[i].brand} 
					products={data[i].products} option={data[i].option} server={data[i].server} deal={data[i].deal} web={data[i].web} other={data[i].other}
					web_type={data[i].web_type}  web_addr={data[i]. web_addr} attention={data[i].attention} 
					paperview={data[i].paperview} reply={data[i].reply} 
					starttime={data[i].starttime} changetime={data[i].changetime}/>
					)
		};
		return (
			<div className='tablediv'>
			      <div ref="listBox" style={{position:'relative',height:'6.9rem'}}>
						<table className='table' >
						  <tbody>
							<tr className="table-th">
								<td className='width-86'>关注度等级</td>
								<td className='width-187'>舆情内容</td>
								<td className='width-76'>舆情类型</td>
								<td className='width-76'>品牌标签</td>
								<td className='width-76'>产品标签</td>
								<td className='width-76'>功能标签</td>
								<td className='width-76'>服务标签</td>
								<td className='width-76'>活动标签</td>
								<td className='width-76'>其他标签</td>
								<td className='width-76'>网站名称</td>
                <td className='width-76'>网站类型</td>
								<td className='width-155'>网址</td>
								<td className='width-56'>关注度</td>
								<td className='width-56'>点击量</td>
								<td className='width-56'>回复量</td>
							    <td className='width-114'>热点产生时间</td>
							    <td className='width-114'>热点变更时间</td>
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