import React from 'react';
import AttentionRate from './AttentionRate';
import Classify from './Classify';
import Grade from './Grade';
import Circletype from './Circle';
import Circlesource from './Circlesource';

var classifyOrder = ['热帖活动', '热点新闻', '热点产品', '热点事件'];
var classifyCls = ["activity", "news", "product", "product"];

// 驾驶舱右侧组件
var CabRight = React.createClass({
	// 转换分类统计列表的顺序，按classifyOrder数组中的顺序排列
	classifySequence: function () {
		var i, j, classifyData = [];
		var oldList = this.props.cabStore.classifyData;

		for (i = 0; i < classifyOrder.length; i++) {
			for (j = 0; j < oldList.length; j++) {
				if (classifyOrder[i] === oldList[j].hotpointTypeName) {
					classifyData.push(oldList[j]);
				}
			}
		}
		return classifyData;
	},
	// 显示级别统计弹框
	// showLevel: function (levelId) {
	// 	this.props.toggle({
	// 		show: true,
	// 		type: 'hotLevel'
	// 	});
	// },
	// 显示类型统计弹框
	showType: function (typeIdList, typeName) {
		this.props.toggle({
			show: true,
			type: 'hotType',
			brand: this.props.curBrand.brandName,
			subType: typeName
		});
	},

	render: function () {
		var i, classifyList=[], levelList=[], wordList = [];
		var cabStore = this.props.cabStore;
		var classifyData = this.classifySequence();
		var levelData = cabStore.levelData;
		var wordData = cabStore.wordData;

		// 分类计数
		for (i = 0; i < classifyData.length; i++) {
			classifyList.push(
				<Classify
					show={this.showType}
					item={classifyData[i]}
					cls={classifyCls[i]}
					key={i}
				></Classify>
			)
		}
		// 分级计数
		for (i = 0; i < levelData.length; i++) {
			levelList.push(
				<Grade 
					item={levelData[i]} 
					key={i} ></Grade>
			);
		}
		// 热词
		for (i = 0; i < wordData.length; i++) {
			wordList.push(
				<span className="hotword-unit hotter" key={i}>
					<label>{i+1}</label>
					<span style={i < 3 ? {color:'#fff'} : {} }>{wordData[i].hotword}</span>
				</span>
			);
		}

		return (
			<div className="information-box">
				<AttentionRate item={this.props.curBrand}/>
				<div className="classify fl">
					{classifyList}
				</div>
				<div className="grade fl">
					{levelList} 
				</div>
				<div className="fl" style={{margin:'0.5rem 0 0rem 0.5rem'}}>
					<Circletype 
						timestamp={cabStore.typeDataStamp}
						typeData={cabStore.typeData}/>
				</div>  
				<div className="fl" style={{margin:'0.5rem 0.5rem 0rem 0.2rem'}} >
					<Circlesource 
						timestamp={cabStore.sourceDataStamp}
						sourceData={cabStore.sourceData}/>
				</div>  
				<div className="hotword fl" >
					<h2 className="hot-title">热词汇总</h2>
					{wordList}
				</div>           
			</div>
		);
	}
});

export default CabRight;