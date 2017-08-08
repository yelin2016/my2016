/**负面舆情排行页面**/
import React from 'react';
import Filter from './Filter';
import Resultlist from'./Resultlist';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as negativeRankActions from '../../../actions/negative/rank';

var Rank = React.createClass({
	render: function () {
		return (
			<div className='negative-rank'>
				<div className='title'>
					<span className='blue-dot'></span>
					<span style={{paddingLeft:'0.1rem'}} className='title-text'>{'实时负面舆情TOP10'}</span>
        </div>
        <div className='content'>
        	<Filter 
        		sourcedata={this.props.rank.sourcedata}
        		typedata={this.props.rank.typedata}
        		act_select={this.props.actions} 
        		typeSelect={this.props.rank.typeSelect}
        		sourceSelect={this.props.rank.sourceSelect}
        		typeLabel={this.props.rank.typeLabel}
        		sourceType={this.props.rank.sourceType}
        		refresh={this.props.rank.refresh} />
 					<Resultlist 
 						stamp={this.props.rank.stamp}
 						resdata={this.props.rank.data}/>
        </div>
			</div>
		);
	}
});

// 映射state到props
function mapStateToProps (state) {
	return {
		rank: state.app.negative.rank
	};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	var boundActionCreators = bindActionCreators(negativeRankActions, dispatch);
	return {actions: boundActionCreators};
};
// export default Rank;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Rank);