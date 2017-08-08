import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrandSwitch from './BrandSwitch';
import ScrollContent from './ScrollContent';
import DetailPopup from './detailPopup';

import * as diggingBrandActions from '../../../actions/digging/brand';

var brandNames = ['长虹','小米','海信','创维','乐视'];
// 品牌舆情挖掘
var Brand = React.createClass({
	componentDidMount: function () {
		var brandName = brandNames[this.props.brand.curBrandIndex];
		// 品牌标签页数据
		this.props.actions.getBrandCloud({brandName: brandName});
		// 价格分布
		this.props.actions.getPriceDist({brandName: brandName});
		// 销量排行
		this.props.actions.getSaleRank({brandName: brandName});
		// 功能标签页数据
		this.props.actions.getPriceRep({brandName: brandName});
		// 服务标签页数据
		this.props.actions.getService({brandName: brandName});
		// 活动top10数据
		this.props.actions.getTop10({brandName: brandName});
	},
	componentDidUpdate: function (prevProps) {
		var brandName = brandNames[this.props.brand.curBrandIndex];
		// 品牌改变，重新获取数据
		if (this.props.brand.curBrandIndex != prevProps.brand.curBrandIndex) {
			this.props.actions.getPriceDist({brandName: brandName});
			this.props.actions.getSaleRank({brandName: brandName});
			this.props.actions.getPriceRep({brandName: brandName});
			this.props.actions.getService({brandName: brandName});
			this.props.actions.getTop10({brandName: brandName});
		}
		// 品牌不变，priceId改变，重新请求销量排行的数据
		else if (this.props.brand.priceId != prevProps.brand.priceId) {
			if (this.props.brand.priceId >= 0) {
				this.props.actions.getSaleRank({brandName: brandName, priceId: this.props.brand.priceId});	
			} else {
				this.props.actions.getSaleRank({brandName: brandName});	
			}
		}
	},
	render: function () {
		return (
			<div className="digging-brand">
				<BrandSwitch 
					curindex={this.props.brand.curBrandIndex}
					chgBrand={this.props.actions.chgBrand}
				></BrandSwitch>
				<ScrollContent
					brand={this.props.brand}
					actions={this.props.actions}
					toggle={this.props.actions.toggleDetail}
				></ScrollContent>
				<DetailPopup
					status={this.props.brand.detailStatus}
					data={this.props.brand.detailData}
					toggle={this.props.actions.toggleDetail}
				></DetailPopup>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		brand: state.app.digging.brand
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(diggingBrandActions, dispatch);
	return {actions: boundActionCreators};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Brand);