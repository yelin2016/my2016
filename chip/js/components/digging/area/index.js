import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Brand from './brand';
import Feature from './feature';

import * as diggingAreaActions from '../../../actions/digging/area';

// 地域电商分析
var Area = React.createClass({
	getInitialState: function () {
		return {
			cur: 0
		};
	},
	animating: false,
	slideUp: function () {
		if (this.state.cur > 0) {
			if (!this.animating) {
				this.animating = true;
				this.setState({
					cur: this.state.cur - 1
				});
				setTimeout(function () {
					this.animating = false;
				}.bind(this), 400)
			}			
		}		
	},
	slideDown: function () {
		if (this.state.cur < 1) {
			if (!this.animating) {
				this.animating = true;
				this.setState({
					cur: this.state.cur + 1
				});
				setTimeout(function () {
					this.animating = false;
				}.bind(this), 400)
			}
		}		
	},
	// 鼠标滚动滑动
	mousescroll: function (event) {
		// 大于0向下,小于0向上
		if (event.deltaY > 0) {
			this.slideDown();
		} else {
			this.slideUp();
		}
	},
	render: function () {
		return (
			<div className="digging-area">
				<div className="title">{this.state.cur == 0 ? '品牌电商地域销量分布图' : '地域电商功能偏好分布图'}</div>
				<div className={"slide-btn up " + (this.state.cur == 0 ? 'hide' : '')} onClick={this.slideUp}></div>
				<div className="slide-container" onWheel={this.mousescroll}>
					<Brand 
						getAreaSale={this.props.actions.getAreaSale}
						data={this.props.area.areaSaleData}
						stamp={this.props.area.areaSaleStamp}
						cur={this.state.cur}></Brand>
					<Feature 
						actions={this.props.actions}
						area={this.props.area}
						cur={this.state.cur}></Feature>
				</div>
				<div  className={"slide-btn down" + (this.state.cur == 1 ? 'hide' : '')} onClick={this.slideDown}></div>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		area: state.app.digging.area
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(diggingAreaActions, dispatch);
	return {actions: boundActionCreators};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Area);