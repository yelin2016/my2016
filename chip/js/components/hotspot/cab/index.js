import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrandTol from './BrandTol'; 
import CabRight from './CabRight';
import * as cabActions from '../../../actions/hotspot/cab';
import PopupList from '../../common/popuplist';

// 热点舆情监控的品牌
var brandNames = ['长虹','小米','乐视TV','海信','创维'];
// 品牌logo地址映射
var logoMap = {
	'长虹':"./image/icon/icon_ch.png",
	'小米':"./image/icon/icon_xm.png",
	'乐视TV':"./image/icon/icon_ls.png",
	'海信':"./image/icon/icon_hx.png",
	'创维':"./image/icon/icon_cw.png"
};

var Cab = React.createClass({
	componentDidMount: function () {
		//页面初始化渲染后获取左侧品牌列表的数据
		this.props.actions.getBrandlistData({
			brandNames: brandNames.join(',')
		});
		clearTimeout(Util.fetchTimer);
		Util.fetchTimer = setTimeout(this.intervel, 15000);
	},
	componentDidUpdate: function (prevProps) {
		var cur_branddata = this.props.cab.brandData;
		var indexChg = this.props.cab.curindex != prevProps.cab.curindex;
		var brandDataChg = this.props.cab.brandDataStamp > prevProps.cab.brandDataStamp;
		var param = {};

		// brandData数据变化，或者curindex改变时，都重新请求右侧统计、热词、饼图的数据。
		if (indexChg || brandDataChg) {
			param['brandId'] = cur_branddata[this.props.cab.curindex].brandId;
			// 获取分类统计数据
			this.props.actions.getHotpointTypeData(param);
			// 获取分级统计数据
    	this.props.actions.getHotWarningLevelData(param);
    	// 获取热词
    	this.props.actions.getHotWordData(param);
    	// 获取类型分布图数据
    	this.props.actions.getTypeData(param);
    	// 获取来源分布图数据
      this.props.actions.getSourceData(param);
		}
	},
	// 定时刷新数据
	intervel: function () {
		// 重新获取左侧品牌列表数据
		this.props.actions.getBrandlistData({
			brandNames: brandNames.join(',')
		});
		Util.fetchTimer = setTimeout(this.intervel, 15000);
	},
	componentWillUnmount: function () {
		clearTimeout(Util.fetchTimer);
	},
	/**
	 * 转换品牌列表的顺序，按brandNames数组中的顺序排列
	 * @return {[type]} [description]
	 */
	brandDataSequence: function () {
		var i, j, brandData = [];
		var oldList = this.props.cab.brandData;

		for (i = 0; i < brandNames.length; i++) {
			for (j = 0; j < oldList.length; j++) {
				if (brandNames[i] === oldList[j].brandName) {
					brandData.push(oldList[j]);
				}
			}
		}
		return brandData;
	},
	render: function () {
		var i, brandList = [];
		var brandData = this.brandDataSequence();
		var curindex = this.props.cab.curindex;

		for (i = 0; i < brandData.length; i++) {
			brandList.push(
				<BrandTol 
					click={curindex == i ? true : false} 
					item={brandData[i]} 
					index={i} 
					key={i}  
					logo={logoMap[brandData[i].brandName]}
					branchg={this.props.actions.cghbrandindex} />
			);
		}
		return (
			<div style={{overflow: 'hidden'}}>
				<div className="left-box">
					{brandList}
				</div>
				<CabRight 
					toggle={this.props.actions.togglePopup}
					cabStore={this.props.cab}
					curBrand={brandData[curindex]} />
				<PopupList 
					actions={this.props.actions}
					popupStatus={this.props.cab.popupStatus} 
					popupData={this.props.cab.popupData} />
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		// 这里把cab页面的state全部加进来，比之前部分加载的写法看起来要清晰
		cab: state.app.hotspot.cab
	};
}
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var cabActionCreators = bindActionCreators(cabActions, dispatch);
	return {actions: cabActionCreators};
};
// export default Cab;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cab);