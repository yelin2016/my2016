import React from 'react';
import DatePicker from '../common/datepicker';

var DatePickerdemo = React.createClass({
	getInitialState: function () {
		return {
			start: '',
			end:''
		};
	},
	timeChg: function (start, end) {
		this.setState({
			start: start,
			end: end
		});
	},
	render: function () {
		return (
			<div style={{margin:'0.1rem',padding:'0.1rem',background:'#999'}}>
				<div style={{margin:'0 0 0.2rem 0'}}>选择的时间范围-开始：{this.state.start} 结束：{this.state.end}</div>
				<DatePicker title="请选择时间" chg={this.timeChg} />
			</div>
		);
	}
});

export default DatePickerdemo;