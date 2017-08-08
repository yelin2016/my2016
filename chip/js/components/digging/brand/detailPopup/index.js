// 弹出窗口，显示品牌挖掘云图的详细内容
import React from 'react';
import ListItem from './ListItem';

var DetailPopup = React.createClass({
	componentDidMount: function () {
		if (this.props.status.type !== 'single') {
			$(this.refs.listBox).mCustomScrollbar({
				theme:"light-3"
			});
		}
	},
	handleClose: function () {
		this.props.toggle({
			show: false
		});
	},
	render: function () {
		var i , items = [];
		var visible = this.props.status.show ? '' : 'hide';
		var single = this.props.status.type ? 'single' : '';
		// var data = this.props.data;
		var data = this.props.status.data;

		items.push(
			<ListItem
				item={data}
				key={0}
			></ListItem>
		);		

		// for (i = 0; i < data.length; i++) {
		// 	items.push(
		// 		<ListItem
		// 			item={data[i]}
		// 			key={i}
		// 		></ListItem>
		// 	);
		// }

		return (
			<div className={"popup-cover "+visible}>
				<div className={"detail-container "+single}>
					<div className="popup-title">{this.props.status.name}
						<span className="close-btn" onClick={this.handleClose}></span>
					</div>
					<div ref="listBox" className="detail-content">
						{items}
					</div>
				</div>
			</div>
		);
	}
});

export default DetailPopup;