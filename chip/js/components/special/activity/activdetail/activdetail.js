import React from 'react';
import Detailsheader from './detailheader';
import Zongguan from './detailmiddle';
import Rijun from './activrijun';
import Dianhui from './dianhui';
import Xinlao from './xinlao';
import Zoushi from './detailfooter'; 

var  Acdetails=React.createClass({
      detailhide:function(){
       $(this.refs.acba).hide();
      },
    render:function(){
      return (<div className="acdetails-background" id="hehe" ref="acba">
      <div className="acdetails" ref="acdetails" id="gaga">
      <Detailsheader detailhide={this.detailhide}/>
      <div className="activmiddle">
       <Zongguan />
       <Rijun />
       <Dianhui />
       <Xinlao/>
       <Zoushi />
      </div>

     </div></div>
            )
    }

});
export default Acdetails;
