import React from 'react';
var  Paper = React.createClass({
      handleclick: function(event){
            if(event.target.className=="disable"){
                 
            }else if( event.target.innerHTML==this.props.currentpaper){
                  
            }else{ this.props.click(event.target.innerHTML);}
      },
      render: function () {
             var total=parseInt(this.props.totalpaper), current=parseInt(this.props.currentpaper) ,dif=total-current;
           var sp=[],i;
           if(current<6){
            if(dif<5){
                  for(i=1;i<total+1;i++){
                   if(i==current){
                              sp.push(<span  onClick={this.handleclick} className='active' key={i}>{i}</span>)
                         }else{sp.push(<span onClick={this.handleclick} key={i}>{i}</span>)};
                  };
            }else{
                  for(i=1;i<Math.min(total+1,10);i++){
                         if(i==current){
                              sp.push(<span  onClick={this.handleclick} className='active' key={i}>{i}</span>)
                         }else{sp.push(<span onClick={this.handleclick}  key={i}>{i}</span>)};
                  };
            }
           }else{
            if(dif<5){
                  for(i=current-4;i<total+1;i++){
                   if(i==current){
                              sp.push(<span onClick={this.handleclick} className='active' key={i}>{i}</span>)
                         }else{sp.push(<span onClick={this.handleclick} key={i}>{i}</span>)};
                  };
            }else{
                  for(i=current-4;i<current+5;i++){
                         if(i==current){
                              sp.push(<span onClick={this.handleclick} className='active' key={i}>{i}</span>)
                         }else{sp.push(<span onClick={this.handleclick} key={i}>{i}</span>)};
                  };
            }
           };
           var up='',down='';
           if(total==1){up='disable';down='disable'}else{
            if(current==1){up='disable'}else if(current==total){down='disable'};
           };
            return (
                        <div className='paper unselectable'>
                           <span onClick={this.handleclick} className={up}>上一页</span> 
                          {sp}
                           <span onClick={this.handleclick} className={down} >下一页</span>
                        </div>
                );
         }
});

export default Paper;