import React from 'react';

var levelMap = {
	1: '一级',
	2: '二级',
	3: '三级',
	4: '四级',
};

var Grade =React.createClass({
	render:function(){
		var item = this.props.item;
		return(
			<div className="grade-content">
				<p className="grade-num">{item.totalHotCount}</p>
				<p className="grade-text">{levelMap[item.warningLevelId]}</p>
			</div>
		);
	}
})
export default Grade;