import React from 'react';

var Detailsheader=React.createClass({

	render: function(){
		return(
            <div>
	            <div className="detailsheader-1">
	            <span className="detailheader-11">舆情详情</span>
                <span className="detailheader-12" onClick={this.props.detailhide}></span>
	            </div>
	            
	            <div className="detailsheader-2">
		             <span className="detailsheader-21">长虹论坛</span>
		             <input type="text" className="detailsheaderinput" value="呵呵"/>
		             <input type="text" className="detailsheaderinput" value="哈哈"/>
		             <span className="detailsheader-22">【长虹电视】</span>
	            </div>
            </div>
			)
	}
})

export default Detailsheader;