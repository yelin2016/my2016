/**
 * 分类负面舆情详情组件
 */
import React from 'react';
import LevelDetail from './LevelDetail';
import CateNegativeTrend from './CateNegativeTrend';

var colorIndex = ['red','orange','yellow','blue'];

var categoryDetail = React.createClass({
	render: function () {
		var cateData = this.props.cateData;
		var trendIcon = this.props.trendIcon;

		// var levelData = cateData.levelData;
		var levelData = cateData.typeLabelList;
		var i, j, levelList = [];
		var itemData;
		// for (i = 0; i < levelData.length; i++) {
		for (i = 0; i < 4; i++) {
			itemData = null;
			for (j = 0; j < levelData.length; j++) {
				if (levelData[j].warningLevel == colorIndex[i]) {
					itemData = levelData[j];
				}
			}
			if (!itemData) {
				itemData = {
					"todayCount":0,
					"todayNewCount":0,
					"warningLevel":colorIndex[i],
					"sourceTypeList":[]
				};
			}
			// if (i < levelData.length) {
			// 	itemData = levelData[i];
			// } else {
			// 	itemData = {
			// 		"todayCount":0,
			// 		"todayNewCount":0,
			// 		"warningLevel":colorIndex[i],
			// 		"sourceTypeList":[]
			// 	};
			// }
			levelList.push(
				<LevelDetail 
					toggle={this.props.toggle} 
					viewMore={this.props.viewMore}
					subType={cateData.typeLabel} 
					levelData={itemData} 
					key={i} />
			);
		}
		return (
			<div className="cate-detail">
				<div className="title">{'今日'+cateData.typeLabel+'负面舆情'}
					<span className="trend-icon" style={{
						backgroundImage: 'url(./image/icon/'+trendIcon+'.png)'
					}}></span>
				</div>
				{levelList}
				<CateNegativeTrend trend={this.props.trend} stamp={this.props.stamp} />
			</div>
		);
	}
});

export default categoryDetail;