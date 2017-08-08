import React from 'react';
import CountRect from './CountRect';
import CompareCondition from './CompareCondition';

var defaultList1 = [
	{"num":'',"category":"关注度",key:'focusCount'},
	{"num":'',"category":"点击量",key:'clickCount'},
	{"num":'',"category":"回复量",key:'replyCount'},
	{"num":'',"category":"发帖数",key:'articleCount'}
];
var defaultList2 = [
	{"num":'',"category":"关注度",key:'focusCount'},
	{"num":'',"category":"点击量",key:'clickCount'},
	{"num":'',"category":"回复量",key:'replyCount'},
	{"num":'',"category":"发帖数",key:'articleCount'}
];

// 对比详情，顶部计数显示
var CountTop = React.createClass({
	render: function () {
		// var countList1 = this.props.data.left.length > 0 ? this.props.data.left : defaultList1;
		// var countList2 = this.props.data.right.length > 0 ? this.props.data.right : defaultList2;
		var countList1 = defaultList1;
		var countList2 = defaultList2;
		var data = this.props.data;

		var i, list1 = [], list2 = [];
		for (i = 0; i < countList1.length; i++) {
			list1.push(
				<CountRect key={i} num={data.left[countList1[i].key] || ''} category={countList1[i].category} />
			);
			list2.push(
				<CountRect key={i} num={data.right[countList1[i].key] || ''} category={countList2[i].category} />
			);
		}
		return (
			<div className="count-top">
				<div className="left-part">
					{list1}
				</div>
				<div className="right-part">
					{list2}
				</div>
				<CompareCondition 
					conditionChg={this.props.conditionChg}
					curIndex={this.props.curIndex} />
			</div>
		);
	}
});

export default CountTop;