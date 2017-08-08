import React from 'react';

var Topiclist=React.createClass({
	render: function(){
		return (
         <tr className={this.props.className}>
         <td>{this.props.arr.topicname}</td>
         <td>{this.props.arr.topiclabel}</td>
         <td>{this.props.arr.topictype}</td>
         <td>{this.props.arr.topicdate}</td>
         </tr>
	    );
	}
});
export default Topiclist;