import React from 'react';
var Xinlao = React.createClass({
componentDidMount: function () {
        this.myChart = echarts.init(this.refs.chart);
var dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false}
    }
};
var placeHolderStyle = {
    normal : {
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
    },
    emphasis : {
        color: 'rgba(0,0,0,0)',

    }
};
var option = {
    title: {
        text: '新老用户分布',
     
        x: '20%',
        y: 'center',
        itemGap: 20,
        textStyle : {
            
            color:'#ffffff',
            fontSize : '6%',
            fontWeight:'normal',
            fontFamily:"方正细等线简体"
            
        }
    },
    tooltip : {
        show: true,
        formatter: "{a}:{c} <br/> {b}占比: {d}%"
    },
    legend: {
        orient : 'vertical',
        x : '60%',
        y : '20%',
        itemGap:12,
        itemWidth:16,
        itemHeight:10,
        textStyle:{
            color:'#ffffff',
            fontSize:10,
        },
        data:['老用户','新用户']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            name:'老用户数',
            type:'pie',
            center:['36%','50%'],
            radius : ['58%', '71.4%'],
            itemStyle : dataStyle,
            hoverAnimation:false,
            data:[
                {
                    value:68,
                    name:'老用户',
                    itemStyle :{
                        normal:{
                            color:"#7bdda7"
                        }
                    }
                },
                {
                    value:32,
                    name:'invisible',
                    itemStyle : placeHolderStyle,
                    tooltip:{show:false,showContent:false},
                }
            ]
        },
        {
            name:'新用户数',
            type:'pie',
            center:['36%','50%'],
            radius : ['44.4%', '58%'],
            itemStyle : dataStyle,
             hoverAnimation:false,
            data:[
                {
                    value:29, 
                    name:'新用户',
                    itemStyle :{
                        normal:{
                            color:"#f5e58e"
                        }
                    }
                },
                {
                    value:71,
                    name:'invisible',
                    itemStyle : placeHolderStyle,
                    tooltip:{show:false,showContent:false},
                }
            ]
        },

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
                <div ref='chart' id={this.props.id} className="activmiddle-2"></div>
            )
    }
})

export default Xinlao;