import React from 'react';

var Dianhui = React.createClass({
    componentDidMount: function () {
        this.myChart = echarts.init(this.refs.chart);
       var option={
             tooltip : {
                formatter: "{a}<br/>{c} "
             },
             toolbox:{
                show:false,
                feature:{
                    restore :{show:true}
                }
             },
             series:[
{            name:'点击量：',
             type:'gauge',
             center:['50%','50%'],
             min:0,
             max:800,
             startAngle:135,
             endAngle:45,
             splitNumber:2,
             radius:'66%',
             axisLine:{
                lineStyle:{
                    width:4,
                    color : [ [ 0.2, '#7bdda7' ],[ 0.8, '#68b4ee' ], [ 1, '#f195bc' ] ], 
                                             
                }
             },
             axisTick:{
                length:7,
                lineStyle:{
                    color:'auto'
                }
             },
             splitLine:{
                length:15,
                lineStyle:{
                    color:'auto'
                }
             },
             title:{
                textStyle:{                   
                    fontSize:12,
                    color:'#ffffff',
                    fontFamily:"方正兰亭黑-YS-GB2312",
                },
                offsetCenter:[0,-20],

             },
              axisLabel :{
                fontSize:12
              },
              pointer:{
                width:2,
              },
             detail:{
                
                    show: false
                
             },
             data:[{value:40,name:'点击量'}]

         },
           {name:'回复量：',
             type:'gauge',
             center:['50%','50%'],
             min:800,
             max:0,
            startAngle:315,
            endAngle:225,
             splitNumber:2,
             radius:'66%',
             axisLine:{
                lineStyle:{
                    width:4,
                    color : [ [ 0.2, '#7bdda7' ],[ 0.8, '#68b4ee' ], [ 1, '#f195bc' ] ], 
                                             
                }
             },
             axisTick:{
                length:7,
                lineStyle:{
                    color:'auto'
                }
             },
             pointer:{
                width:2,
             },
             splitLine:{
                length:15,
                lineStyle:{
                    color:'auto'
                }
             },
             title:{
                textStyle:{                   
                    fontSize:12,
                    color:'#ffffff',
                    fontFamily:"方正兰亭黑-YS-GB2312",
                },
                offsetCenter:[0,20]
             },
              axisLabel :{
                fontSize:12
              },

             detail:{
              show: false
             },
             data:[{value:40,name:'回复量'}]

         }


             ]
        };
        this.myChart.setOption(option);
        this.chartResize = this.myChart.resize;
        window.addEventListener('resize', this.chartResize);
    },
    componentWillUnmount: function () {
        window.removeEventListener('resize', this.chartResize);
        this.myChart.dispose();
    },
    render:function(){
        return(
                <div ref='chart' id={this.props.id} className="activmiddle-1"></div>
            )
    }
})

export default  Dianhui;