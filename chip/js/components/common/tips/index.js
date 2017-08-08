/**
 * 操作弹出框
 */
import React from 'react';

var Tips = React.createClass({
	onOk: function () {
		this.props.hideTips(this.props.tipStatus.okAction);
	},
	onCancel: function () {
		this.props.hideTips(this.props.tipStatus.cancelAction);
	},
	render: function () {
		var tipStatus = this.props.tipStatus;
		return (
			<div className="tips tip-cover" style={{
				display: tipStatus.show ? 'block' : 'none'
			}}>
				<div className="tips-container">
					<p style={{margin:'0.4rem 0.2rem 0 0.2rem',textAlign:'center'}}>{tipStatus.text}</p>
					<div style={{
						width:'100%',
						position:'absolute',
						bottom:'0.2rem',
						left:'0',
						textAlign:'center',
						color: '#fff'
					}}>
						<span className="tips-btns" style={{
							display: tipStatus.pureTip ? 'none' : 'inline-block',
							width:'0.96rem',
							height:'0.3rem',
							margin:'0 0.08rem',
							lineHeight:'0.3rem',
							borderRadius: '2px',
							cursor: 'pointer',
							backgroundColor: '#99a0aa'
						}} onClick={this.onCancel}>取消</span>
						<span className="tips-btns" style={{
							display:'inline-block',
							width:'0.96rem',
							height:'0.3rem',
							margin:'0 0.08rem',
							lineHeight:'0.3rem',
							borderRadius: '2px',
							cursor: 'pointer',
							backgroundColor: '#6aaefc'
						}} onClick={this.onOk}>确定</span>
					</div>
				</div>
			</div>
		);
	}
});

export default Tips;