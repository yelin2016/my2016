import React from 'react';
import StaticBoard from './StaticBoard';

var Service = React.createClass({
	render: function () {
		var statisList = this.props.data;
		var i, statisItems = [], score = 0;
		for (i = 0; i < statisList.length; i++) {
			statisItems.push(
				<StaticBoard
					item={statisList[i]}
					level={'lv1'}
					key={i}
				></StaticBoard>
			);
			score = score + (statisList[i].serviceGrade || 0);
		}
		return (
			<div className="scroll-content service" style={{top: this.props.top}}>
				<div className="score-board">
					<p className="score">{score}</p>
					<p className="info">评分</p>
				</div>
				<div className="aside-left">他们这样说</div>
				{statisItems}
			</div>
		);
	}
});

export default Service;