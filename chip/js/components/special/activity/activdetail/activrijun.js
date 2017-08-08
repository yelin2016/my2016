import React from 'react';
var Rijun = React.createClass({
    componentDidMount: function () {
        this.myChart = echarts.init(this.refs.chart);
        var option={
             tooltip : {
                formatter: "{a}<br/>{c} ",
             
             },
             toolbox:{
                show:false,
                feature:{
                    restore :{show:true}
                }
             },
             series:[
{             name:'日均关注度：',
             type:'gauge',
             z:3,
             min:0,
             max:220,
   
             splitNumber:11,
             radius:'91%',
             axisLine:{
                lineStyle:{
                    width:8,
                    color : [ [ 0.2, '#7bdda7' ],[ 0.8, '#68b4ee' ], [ 1, '#f195bc' ] ], 
                                             
                }
             },
             axisTick:{
                length:15,
                lineStyle:{
                    color:'auto'
                }
             },
             splitLine:{
                length:20,
                lineStyle:{
                    color:'auto'
                }
             },
            pointer: {
                width:5
            },
             title:{
                textStyle:{
                    fontFamily:"方正细等线简体",
                    fontSize:18,
                    color:'#ffffff',
                },
                offsetCenter:[0,60],
             },
              axisLabel :{
                fontSize:'4%',
                fontFamily:"方正兰亭黑-YS-GB2312",
              },

             detail:{
                textStyle:{
                    fontSize:27,
                    color:'#ffffff',
                    fontFamily:"方正兰亭黑-YS-GB2312",
                },
                offsetCenter:[0,20]
             },
             data:[{value:40,name:'日均关注度'}]

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
                <div ref='chart' id={this.props.id} className="activmiddle-1">hehehehe</div>
            )
    }
})

export default Rijun;