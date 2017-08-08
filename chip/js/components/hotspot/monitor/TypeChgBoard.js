import React from 'react';
import Chk from './Chk';

var TypeChgBoard = React.createClass({
	getInitialState: function () {
		var i, preTypeId = this.props.status.preTypeId.split(',');
		var typeLabel = {};
		for (i = 0; i < preTypeId.length; i++) {
			typeLabel[preTypeId[i]] = true;
		}

		return {
			typeLabel: typeLabel
		};
	},
	// 取消修改
	handleClose: function () {
		this.props.modify({}, 'cancel');
	},
	// 确认修改
	handleOk: function () {
		var ids = [];
		for (var k in this.state.typeLabel) {
			if (this.state.typeLabel[k]) {
				ids.push(k);
			}
		}
		this.props.modifyReq({
			objectId: this.props.status.objectId,
			hotpointTypeIdList: ids.join(',')
		});
	},
	// 选择标签类型
	chgChk: function (type, key) {
		var obj = {};
		obj[key] = !this.state[type][key];
		obj = Object.assign({}, this.state.typeLabel, obj);
		this.setState({
			typeLabel: obj
		});
	},
	render: function () {
		var typeList = this.props.typeList.slice(1);
		var perTypeId = this.props.status.preTypeId.split(',');
		var i, chkItems = [];

		for (i = 0; i < typeList.length; i++) {
			chkItems.push(
				<Chk 
					chked={this.state.typeLabel[typeList[i].value]} 
					chgchk={this.chgChk}
					info={typeList[i].nm} 
					type={"typeLabel"} 
					chkKey={typeList[i].value} key={i}></Chk>
			);
		}

		return (
			<div className={"popup-cover "}>
				<div className="chg-container">
					<div className="popup-title">{'修改舆情类型'}
						<span className="close-btn" onClick={this.handleClose}></span>
					</div>
					<div className="chk-list-wrap">
						{chkItems}
					</div>
					<span onClick={this.handleOk} className='btn-blue btn-ok'>确认修改</span>
				</div>
			</div>
		);
	}
});

export default TypeChgBoard;