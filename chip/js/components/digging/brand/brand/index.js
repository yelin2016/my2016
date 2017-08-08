import React from 'react';
import ChartLine from './ChartLine';
import ChartCloud from './ChartCloud';

var Brand = React.createClass({
	render: function () {
		return (
			<div className="scroll-content brand" style={{top: this.props.top}}>
				<div className="reputation">
					<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
						<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
						<span className="title-text" style={{marginLeft:"0.1rem"}}>美誉度评分</span>
					</div>
					<p className="count">78</p>
				</div>
				<div className="trend">
					<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
						<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
						<span className="title-text" style={{marginLeft:"0.1rem"}}>关注度走势</span>
					</div>
					<ChartLine></ChartLine>
				</div>
				<div className="cloud">
					<div className="block-title" style={{height:"0.5rem",lineHeight:"0.5rem"}}>
						<span className="blue-dot" style={{marginLeft:"0.3rem",marginTop:"0.2rem"}}></span>
						<span className="title-text" style={{marginLeft:"0.1rem"}}>品牌舆情云图</span>
					</div>
					<ChartCloud
						data={this.props.data}
						stamp={this.props.stamp}
						toggle={this.props.toggle}
					></ChartCloud>
				</div>
			</div>
		);
	}
});

export default Brand;