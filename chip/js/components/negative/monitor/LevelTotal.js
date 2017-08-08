/**
 * 分级负面总舆情组件
 */
import React from 'react';
// import CountCircle from './CountCircle';
import CountCircle from '../../common/CountCircle';

// 设置初始值，动画效果需要
var levelData = [
	{"num":0,"newAdd":0,"level":"red"},
	{"num":0,"newAdd":0,"level":"orange"},
	{"num":0,"newAdd":0,"level":"yellow"},
	{"num":0,"newAdd":0,"level":"blue"}
];

var LevelTotal = React.createClass({
	render: function () {
		var i, circleList = [];
		var level = this.props.level;
		for (i = 0; i < level.length; i++) {
			levelData[i].num = level[i].totalArticleCount;
			levelData[i].newAdd = level[i].todayNewArticleCount;
		}
		for (i = 0; i < levelData.length; i++) {
			circleList.push(
				<CountCircle num={levelData[i].num} newAdd={levelData[i].newAdd} level={levelData[i].level} key={i} />
			);	
		}
		return (
			<div className="level-total">
				{circleList}
			</div>
		);
	}
});

export default LevelTotal;