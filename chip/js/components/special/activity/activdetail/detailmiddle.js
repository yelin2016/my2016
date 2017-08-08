import React from 'react';

var Zongguan = React.createClass({
    
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
{             name:'总关注度：',
             type:'gauge',
             z:3,
             min:0,
             max:300,
             startAngle:225,
             endAngle:45,
             splitNumber:6,
             radius:'68.7%',
             axisLine:{
                lineStyle:{
                    width:6,
                    color : [ [ 0.2, '#7bdda7' ],[ 0.8, '#68b4ee' ], [ 1, '#f195bc' ] ], 
                                             
                }
             },
             axisTick:{
                length:13,
                lineStyle:{
                    color:'auto'
                }
             },
             splitLine:{
                length:17,
                lineStyle:{
                    color:'auto'
                }
             },
             title:{
                textStyle:{
                    
                    fontSize:18,
                    color:'#ffffff',
                    fontFamily:"方正细等线简体",
                },
                offsetCenter:[0,50],
             },
            axisLabel :{
                fontSize:12,
                fontFamily:"方正兰亭黑-YS-GB2312",
              },
            pointer: {
                width:4
            },
             detail:{
                textStyle:{
                    fontSize:27,
                    color:'#ffffff',
                    fontFamily:"方正兰亭黑-YS-GB2312",
                },
                offsetCenter:[0,20],
             },
             data:[{value:40,name:'总关注度'}]

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

export default  Zongguan;