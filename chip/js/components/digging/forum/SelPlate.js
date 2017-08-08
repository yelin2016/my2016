import React from 'react';
import ChartCircle from './ChartCircle';
import Lv3conditions from './Lv3conditions';

// 三级板块选择面板
var SelPlate = React.createClass({
	getInitialState: function () {
		// 初始状态，left左侧选择的板块，right右侧选择的板块，refreshChart更新时是否重新加载图表。
		return {
			left: this.props.compareConditons.left,
			right: this.props.compareConditons.right,
			refreshChart: false
		}
	},
	componentWillReceiveProps: function (nextProps) {
		// 参数更新,重新获取选择圆环的数据
		var i, resetConditions = false, clearChart = false;
		var curPorps = this. props;
		var left = this.state.left;
		var right = this.state.right;

		if (nextProps.selList.length == 0) {
			left = [];
			right = [];
			resetConditions = true;
		} else {
			for (i = 0; i < curPorps.selList.length; i++) {
				// 新的selList没有第i项，或者第i项和之前的不同，清空选择的条件
				if (!nextProps.selList[i] || curPorps.selList[i].key != nextProps.selList[i].key) {
					i == 0 ? left = [] : right = [];
					resetConditions = true;
					if (i == 0) {
						clearChart = true;
					}
				}
			}
		}
		// 点击了查询按钮，设置刷新chart标志
		if (!this.props.query && nextProps.query) {
			clearChart = true;
			// 非对比状态下点击查询按钮，重置conditions
			if (!this.props.comparing) {
				resetConditions = true;
				left = [];
				right = [];
			}
			this.props.clearQueryFlag();
		}
		
		if (resetConditions) {
			this.setState({
				left: left,
				right: right,
				refreshChart: clearChart
			});
		} else {
			this.setState({
				refreshChart: clearChart
			});
		}
	},
	componentDidUpdate: function () {
		// 如果需要刷新图表，组件更新完成后没有加载图表，设置refreshChart为false，组件重新render加载图表。
		if (this.state.refreshChart) {
			this.setState({
				refreshChart: false
			});
		}
	},
	updateCondition: function (place, conditionList) {
		var obj = {};
		// 如果正在对比中，保持当前选择的板块，不做修改。
		if (this.props.comparing) {
			return ;
		}
		obj[place] = conditionList;
		this.setState(obj);
	},
	// 点击对比按钮，设置对比中状态
	doCompare: function () {
		if (this.state.left.length > 0 && this.state.left.length > 0) {
			this.props.chgCompare(true, {
				left: this.state.left,
				right: this.state.right
			});
		}
	},
	render: function () {
		var bbsL = this.props.selList[0] || '';
		var bbsR = this.props.selList[1] || '';

		var circleL = null;
		var circleR = null;
		// var compareDetail = null;

		// 如果要刷新图表，render时先不加载ChartCircle组件，更新完成后再render一次，重新加载组件。
		if (!this.state.refreshChart && !this.props.comparing) {
			if (bbsL) {
				circleL = <ChartCircle 
					bbs={bbsL}
					duration={this.props.duration}
					place="left" 
					updateCon={this.updateCondition} 
					conditions={this.state.left} 
					showTip={this.props.showTip} />;
			}
			if (bbsR) {
				circleR = <ChartCircle 
					bbs={bbsR}
					duration={this.props.duration}
					place="right" 
					updateCon={this.updateCondition} 
					conditions={this.state.right} 
					showTip={this.props.showTip} />;
			}
		}

		// 是否显示对比详情
		// if (this.props.comparing) {
		// 	compareDetail = <CompareDetail />;
		// }

		// 对比按钮是否允许点击
		var compareBtnCls = 'btn-compare';
		if (this.state.left.length > 0 && this.state.right.length > 0) {
			compareBtnCls += ' allow'
		}
		

		return (
			<div className='sel-plate'>

				<div className="left-plate" style={bbsL ? {background:'none'} : {}}>
					<div className="brand-img">
						<img src={bbsL ? bbsL.logo : ''} style={bbsL ? {} : {display:'none'}} />
					</div>
					<Lv3conditions place="left" updateCon={this.updateCondition} conditions={this.state.left} />
					{circleL}
				</div>
				<div className="separate-line"></div>

				<div className="right-plate" style={bbsR ? {background:'none'} : {}}>
					<div className="brand-img">
						<img src={bbsR ? bbsR.logo : ''} style={bbsR ? {} : {display:'none'}} />
					</div>
					<Lv3conditions place="right" updateCon={this.updateCondition} conditions={this.state.right} />
					{circleR}
				</div>

				<span 
					style={this.props.comparing?{'display':'none'}:{}}
					className={compareBtnCls} 
					onClick={this.doCompare}>开始对比</span>
	    </div>
		);
	}
});

export default SelPlate;