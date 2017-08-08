import React from 'react';
import Top10Item from './Top10Item';

// 论坛对比的top10舆情
var Top10 = React.createClass({
	componentDidMount: function () {
		$(this.refs.listBox).mCustomScrollbar({
			theme:"light-3"
		});
	},
	render: function () {
		var i, scrolls1 = [], scrolls2 = [];
		var leftData = this.props.data.left;
		var rightData = this.props.data.right;
		for (i = 0; i < 10; i++) {
			if (leftData[i]) {
				scrolls1.push(
					<Top10Item key={i} item={leftData[i]} />
				);
			}
			if (rightData[i]) {
				scrolls2.push(
					<Top10Item key={i} item={rightData[i]} />
				);
			}
		}
		return (
			<div ref="listBox" className="top10" style={{position:'relative',height:'5.6rem'}}>
				<div style={{width:'50%',height:'100%',float:'left',marginBottom:'0.1rem'}}>
					<p className="top10-title">论坛舆情TOP10</p>
					{scrolls1}
				</div>
				<div style={{width:'50%',height:'100%',float:'left',marginBottom:'0.1rem'}}>
					<p className="top10-title">论坛舆情TOP10</p>
					{scrolls2}
				</div>
			</div>
		);
	}
});

export default Top10;