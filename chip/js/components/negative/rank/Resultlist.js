/*负面舆情排行页面---查询结果展示组件*/
import React from 'react';
import Resultitem from './Resultitem';

var logos = [
	{brand:'长虹', logo: 'ch'},
	{brand:'创维', logo: 'cw'},
	{brand:'海信', logo: 'hx'},
	{brand:'乐视', logo: 'ls'},
	{brand:'奇珀', logo: 'qp'},
	{brand:'小米', logo: 'xm'}
];

var Resultlist = React.createClass({
	componentDidMount: function () {
		$(this.refs.listBox).mCustomScrollbar({
			theme:"light-3"
		});
	},
	render: function () {
		var i, data, reslist = [];
		for (i=0;i<this.props.resdata.length;i++){
			data = this.props.resdata[i];
			reslist.push(
				<Resultitem 
					logo={logos[Math.round(Math.random()*5)].logo}
					stamp={this.props.stamp}
					brand={data.sourceName} 
					trend={data.articleFocusList}
					labels={data.typeLabelIdList} 
					desc={data.objectTitle} 
					articleFocusList={data.articleFocusList}
					focus={data.objectFocus} 
					url={data.objectUrl} 
					key={i}/>
				);
		}
			return (
				<div ref="listBox" style={{position:'relative',height:'7.57rem'}}>
					<div className='Resultlist'>
						{reslist}
					</div>
				</div>
			);
		}
});

export default Resultlist;