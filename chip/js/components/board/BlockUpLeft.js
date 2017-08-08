import React from 'react';
import { Link } from 'react-router';
import CountRect from './CountRect';
import CountCircle from '../common/CountCircle';

var categoryData = [
	{"num":0,"category":"总舆情"},
	{"num":0,"category":"热度"},
	{"num":0,"category":"点击量"},
	{"num":0,"category":"回复量"}
];
var levelData = [
	{"num":0,"newAdd":0,"level":"red"},
	{"num":0,"newAdd":0,"level":"orange"},
	{"num":0,"newAdd":0,"level":"yellow"},
	{"num":0,"newAdd":0,"level":"blue"}
];
// 走势名称对应图标class名
var trendMap = {
	"爆发": 'explosion',
	"上涨": 'up',
	"平缓": 'smooth',
	"下降": 'down',
	"骤降": 'sudden'
};

var BlockUpLeft = React.createClass({
	render: function () {
		var i, rectList = [], circleList = [];
		// 将store中保存的接口返回数据，转换为方便组件数组使用的数据。
		var total = this.props.total;
		categoryData[0].num = total.totalOpinion || 0;
		categoryData[1].num = total.totalHeat || 0;
		categoryData[2].num = total.totalBrowseCount || 0;
		categoryData[3].num = total.totalReplyCount || 0;
		var level = this.props.level;
		for (i = 0; i < level.length; i++) {
			levelData[i].num = level[i].totalArticleCount;
			levelData[i].newAdd = level[i].todayNewArticleCount;
		}
		
		for (i = 0; i < categoryData.length; i++) {
			rectList.push(
				<CountRect 
					num={categoryData[i].num} 
					trend={i == 1 ? trendMap[total.trend] : ''} 
					category={categoryData[i].category} 
					key={i} />
			);
		}
		for (i = 0; i < levelData.length; i++) {
			circleList.push(
				<CountCircle toggle={this.props.toggle} num={levelData[i].num} newAdd={levelData[i].newAdd} level={levelData[i].level} key={i} />
			);	
		}
		return (
			<div className="up-left">
				<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
					<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
					<span className="title-text" style={{marginLeft:"0.1rem"}}>长虹负面舆情预警</span>
					<Link className="link" to={"/more?abc=123&cde=456"}>{'更多'}</Link>
				</div>
				<div className="block-content" style={{height:"4.2rem",marginTop:"2px"}}>
					<div className="yuqing-category">
						{rectList}
					</div>
					<div className="yuqing-level">
						{circleList}
					</div>
				</div>
			</div>
		);
	}
});

export default BlockUpLeft;