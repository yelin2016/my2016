import React from 'react';
import Select from './select';
var  bbsList=[
        {"info":"点击量",key:"dianji"},
        {"info":"关注度",key:"guanzhu"},
        {"info":"回复量",key:"huifu"},
       
    ];
var bbsdata={dianji:[97,96,396,95,95,194,94,194,94,94,194,94,94,194,],
      guanzhu:[2.3,1.4,1.0,0.9,0,0.1,0.7,0.8,0.9,1.0,1.10,1.20,1.30,1.40],
      huifu:[2.3,1.4,1.0,0.9,0,0.1,1.7,1.8,1.9,1.0,1.10,1.20,1.30,1.40]};
var option={};
var curbbs={};
var Zoushi = React.createClass({
    
    getInitialState: function(){
        var i,j;
        var selBbs={
        dianji: true,
        guanzhu:true,
        };
        for(i=0;i<bbsList.length;i++){
        curbbs[bbsList[i].key]= false;
        if(selBbs[bbsList[i].key]){curbbs[bbsList[i].key]=true;}
        }
        return{
            bbs:curbbs,
        }
    },
    change:function(key){
        var k,count=0;
        var curbbs=this.state.bbs;
        var obj={};
        var obj1={};
        for(k in curbbs){
            if(curbbs[k]){count +=1;}
        }
        if(count>=2 && !curbbs[key]){
            alert("不可以再选择了！");
        }else{
            obj[key]=!curbbs[key];
            obj1=Object.assign({},curbbs,obj);
            this.setState({
                bbs:obj1,
            })
        }
    },
    componentDidMount: function () {

        this.myChart = echarts.init(this.refs.chart);
option = {

    title : {
        text: '活动舆情关注走势图',
         textStyle:{
            color:'#ffffff',
            fontSize:20,
            fontWeight:'normal',
            fontFamily:"方正细等线简体",
         },
        x: 'center',
        y: '4%',
        align: 'right'
    },

    grid: {
        bottom: '13%',
        right:'4%',
        width:'92%',
        height:'66.7%',
    },

    tooltip : {
        trigger: 'axis',
        formatter: function(params) {
            return  params[0].seriesName + ' : ' + params[0].value + '<br/>'
                   + params[1].seriesName + ' : ' + -params[1].value;
        },
        textStyle:{
            color:'#8ba7bf',
            fontSize:12,
            backgroundColor:'#19273a',
            opacity:0.9,

        },
        axisPointer: {
            animation: false
        }
    },

    legend: {
        data:[{name:'点击量',textStyle:{color:'#68beee',fontSize:14,fontFamily:"方正细等线简体"},},{name:'关注度',textStyle:{color:'#f195bc',fontSize:14,fontFamily:"方正细等线简体"},}],
        itemWidth:36,
        itemHeight:12,
        backgroundColor:'transparent',
        x: '70%',
        top:'5%',
    },

    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: false},
            splitNumber:7,
            axisLabel:{
                show :true,
                textStyle:{
                    color:'#8ba7bf',
                    fontSize:'3.5%',
                },
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#3f475e',
                }
            },
            data : [
                '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00', '2009/6/12 14:00', '2009/6/12 15:00',
               
            ].map(function (str) {
                return str.replace(' ', '\n')
            })
        }
    ],

    yAxis: [
        {
          
            type: 'value',
           
            axisLine:{
              show:true,
              lineStyle:{
                color:'#3f475e',
                width:1,
                type:'solid',
              },
            },
            axisLabel:{
                show:true,
                textStyle:{
                    color:'#8ba7bf',
                    fontSize:'3.5%',
                },
            },
             splitLine:{
                show:true,
                lineStyle:{
                    color:'#3f475e',
                    width:1,
                    type:'solid',
                },
             },

        },
        {
            
            nameLocation: 'start',
            
            type: 'value',
            inverse: true,
            axisLine:{
              show:true,
              lineStyle:{
                color:'#3f475e',
                width:1,
                type:'solid',
              },
            },
            axisLabel:{
                show:true,
                textStyle:{
                    color:'#8ba7bf',
                    fontSize:'3.5%',
                },
            },
             splitLine:{
                show:true,
                lineStyle:{
                    color:'#3f475e',
                    width:1,
                    type:'solid',
                },
             },

        }
    ],

    series: [
        {
            name:'点击量',
            type:'line',
            hoverAnimation: false,
            areaStyle: {
                normal: {
                    color:'#f195bc',
                    opacity:0.65,
                }
            },
            lineStyle: {
                normal: {
                    width: 1,
                    color:'#3f475e',
                }
            },
            data:bbsdata.dianji,
        },
        {
            name:'关注度',
            type:'line',
            yAxisIndex:1,
            hoverAnimation: false,
            areaStyle: {
                normal: {
                    color:'#68b4ee',
                    opacity:0.65,
                }
            },
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            data: bbsdata.guanzhu,
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
    compareshoww: function(){  
        var k;
        var curbbs=this.state.bbs;
        var i=0;
         this.myChart = echarts.init(this.refs.chart);
        for(k in curbbs){
            if(curbbs[k]==true){
                switch(k){
                    case "dianji" : 
                    option.series[i].data=bbsdata.dianji;
                    option.legend.data[i].name="点击量";
                    option.series[i].name="点击量";
                    break;
                    case "huifu" : 
                    option.series[i].data=bbsdata.huifu;
                    option.legend.data[i].name="回复量";
                    option.series[i].name="回复量";
                    break;
                    case "guanzhu" : 
                    option.series[i].data=bbsdata.guanzhu;
                    option.legend.data[i].name="关注度";
                    option.series[i].name="关注度";                   
                    break;
                }
               i++;
            }
            
        }

        this.myChart.setOption(option);
        this.chartResize = this.myChart.resize;
        window.addEventListener('resize', this.chartResize);
        $(this.refs.compare).toggle();
    },
    comparehide:function(){
    $(this.refs.compare).toggle();
    },

    render:function(){
        var i,sellist=[],chklist=[];
        for(i=0;i<bbsList.length;i++){
            chklist.push(
                <Select chgchk={this.change}
                chkkey={bbsList[i].key}
                chked={this.state.bbs[bbsList[i].key]}
                info={bbsList[i].info}
                key={i} />
                );
            if(this.state.bbs[bbsList[i].key]){
                sellist.push(bbsList[i]);
            }
        }

        return(<div className="detailfooter">

                 
                 <button className="detailfooter-title" onClick={this.comparehide}></button>
                 <div className="detailfooter-compare" ref="compare" id="compare">
                  
                  {chklist}
                  <input type="button" value="确认" className="detailfooter-button" onClick={this.compareshoww}/>
                 </div>
                <div ref='chart' id={this.props.id} className="detailfooter-body"></div> 
               </div>
            )
    }
})

export default Zoushi;