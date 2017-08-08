import React from 'react';
import { Link } from 'react-router';

var Demos = React.createClass({
	render: function () {
		return (
			<div className="demos" style={{width:'100%',height:'100%',overflow:'hidden'}}>
				<div style={{margin:'0.1rem',padding:'0.1rem',border:'solid 1px #eee',background:'#999'}}>
					<Link style={{margin:'0 0.05rem'}} to={"demos/dropdemo"}>dropdemo(下拉选框)</Link>
					<Link style={{margin:'0 0.05rem'}} to={"demos/tipsdemo"}>tipsdemo(操作提示框)</Link>
					<Link style={{margin:'0 0.05rem'}} to={"demos/datepickerdemo"}>datepickerdemo(日期选择)</Link>
					<Link style={{margin:'0 0.05rem'}} to={"demos/paperdemo"}>paperdemo(分页页码)</Link>
					<Link style={{margin:'0 0.05rem'}} to={"demos/filterDropdemo"}>filterDropdemo(带筛选条件下拉框)</Link>
					<Link style={{margin:'0 0.05rem'}} to={"demos/checkdroplistdemo"}>CheckboxDroplist(多选下拉框)</Link>
					<Link style={{margin:'0 0.05rem'}} to={"demos/inputDropdemo"}>inputDroplist(选项带输入框下拉框)</Link>
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
});

export default Demos;