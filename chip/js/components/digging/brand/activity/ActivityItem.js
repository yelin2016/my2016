import React from 'react';

var ActivityItem = React.createClass({
	render: function () {
		return (
			<div className="list-item">
				<div className={"td-l"}>
					<span className={this.props.index < 3 ? "bold" : ""}>{this.props.index + 1}</span>
					{'.' + this.props.source}
				</div>
				<div className="td-m">
					<a className="ac-link" href={this.props.url} target="_blank">{this.props.info}</a>
				</div>
				<div className="td-r">{this.props.focus}</div>
			</div>
		);
	}
});

export default ActivityItem;