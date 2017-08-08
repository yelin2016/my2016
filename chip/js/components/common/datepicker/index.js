import React from 'react';

// 起始日期选择组件
var DatePicker = React.createClass({
	componentDidMount: function () {
		var startInput = this.refs.date_s;
		var endInput = this.refs.date_e;
		$(startInput).datetimepicker({
            language: 'zh-CN',
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            minView: 2
        });
        $(endInput).datetimepicker({
            language: 'zh-CN',
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            minView: 2
        });
        var chgFunc = this.props.chg;
        $(startInput).datetimepicker().on('changeDate', function(ev){
        		var curEnd = $(endInput).val();
        		var y, m, d;
        		if (curEnd != '') {
        			if (new Date(curEnd) < ev.date) {
        				y = ev.date.getFullYear();
        				m = ((ev.date.getMonth() + 101)+'').substring(1);
        				d = ((ev.date.getDate() + 100)+'').substring(1);
        				$(endInput).val(y+'-'+m+'-'+d);
        				chgFunc($(startInput).val(), $(endInput).val());
        			}
        		}
            $(endInput).datetimepicker('setStartDate', ev.date);
        });
        $(startInput).on("change", this.handleChg);
        $(endInput).on("change", this.handleChg);
        if (this.props.start) {
            var ymd = this.props.start.split('-');
            $(endInput).datetimepicker('setStartDate', new Date(ymd[0], ymd[1]-1, ymd[2]));
        }
	},
	handleChg: function () {
		var start = this.refs.date_s.value;
		var end = this.refs.date_e.value;
		var key=this.props.prokey;
		this.props.chg(start,end,key);
	},
    componentWillUnmount: function () {
        $(this.refs.date_s).datetimepicker('remove');
        $(this.refs.date_e).datetimepicker('remove');
    },
	render: function () {
		return (
			<div className='options_time'>
				<div  className='options_time_title'>
					<span>{this.props.title}:</span>
				</div>
				<input readOnly defaultValue={this.props.start||''} ref="date_s" data-date-format="yyyy-mm-dd" className='options_time_input form-control'  type="text"/>
				<div  className='options_time_to'>
					<span >至</span>
				</div>
				<input readOnly defaultValue={this.props.end||''} ref="date_e" data-date-format="yyyy-mm-dd"  className='options_time_input form-control'  type="text"/>
			</div>
		);
	}
});

export default DatePicker;