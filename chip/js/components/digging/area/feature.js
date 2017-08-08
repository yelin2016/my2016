import React from 'react';
import ChartPie from './ChartPie';
import ChartBar from './ChartBar';

import areaData from './areaData';
import cities from './cityGeocoord';

// 地域功能偏好分布
var Feature = React.createClass({
	getInitialState: function () {
		return {
			curProv: '四川',
			areaId: 0
		};
	},
	componentDidMount: function () {    
		var option = {
			title : {
				text: '',
				subtext: '',
				left: 'center',
				top: 'top',
				textStyle: {
					color: '#fff'
				}
			},
			tooltip : {
				trigger: 'item',
				formatter: '{b}:{c}',
				backgroundColor: '#262e3e',
				textStyle: {
					color: '#63a1e9',
					fontSize:14,
				}
			},
			geo: {
				name: '强',
				type: 'scatter',
				map: 'china',
				label: {
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						areaColor: '#323c48',
						borderColor: '#111'
					},
					emphasis: {
						areaColor: '#2a333d'
					}
				}
			},
			series: [
				{
					name: '数量',
					type: 'map',
					mapType: 'china',
					selectedMode: 'single',
					preventUnselect: true,
					label: {
						normal: {
							show: false,
							textStyle: {
								color: '#ccc'
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								color: '#ccc'
							}
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#1c2b40',
							borderColor:'#535f7a',
							color: 'rgba(0,0,0,0)'
						},
						emphasis: {
							// areaColor: '#1b2635',
							areaColor: 'rgba(27,38,53,0.6)',
							borderColor: '#5a8ac6'
						}
					},
					// data: mapData
				},
				{
					name: '长虹',
					type: 'scatter',
					coordinateSystem: 'geo',
					legendHoverLink: false,
					symbolSize: 2,
					large: true,
					largeThreshold: 10,
					itemStyle: {
						normal: {
							shadowBlur: 4,
							shadowColor: 'rgba(210, 115, 113, 0.8)',
							color: '#d27371'
						},
						emphasis: {
							color: '#d27371'
						}
					},
					data: []
				}
			]
		};
		this.option = option;

		var myChart = echarts.init(this.refs.map);
		this.myChart = myChart;

		// 获取地图json数据，注册地图
		this.registerMap();
		// 获取地域偏好总销量数据
		this.props.actions.getAreaPrefer();

		var _this = this;
		myChart.on('mapselectchanged', function (param) {
			var areaId = _this.getAreaId(param.name);
			_this.setState({
				curProv: param.name,
				areaId: areaId
			});
			_this.props.actions.getAreaRank({areaId: areaId});
			_this.props.actions.getAreaFeature({areaId: areaId});
		});

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	/**
	 * 注册地图数据成功后再设置setOption
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	registerMap: function (callback) {
		var _this = this;
		if (_this.mapRegisted) {
			callback && callback();
		} else {
			$.get('json/china.json', function (chinaJson) {
				echarts.registerMap('china', chinaJson);
				_this.mapRegisted = true;
				callback && callback();
			});        
		}
	},
	/**
	 * 处理绘制chart需要的数据
	 * @return {[type]} [description]
	 */
	getMapData: function () {
		var data = this.props.area.areaPreferData;
		var i, j, tmp, key, shortKey, value;
		var mapData = [];
		var pointTmp, brandNm;
		var pointData = [];

		// 获取数据缩放比例
		var scale = this.getScale(data);

		for (i = 0; i < data.length; i++) {
			key = '';
			value = 0;
			// 因为data中的省份名和echart需要的不同，通过遍历areaData对比来判断属于是哪一个省份
			for (j = 0; j < areaData.length; j++) {
				// 去掉末尾的'省','市'
				tmp = areaData[j].replace(/(\u7701|\u5e02)$/,'');
				if (data[i].areaName.indexOf(tmp) === 0) {
					key = areaData[j];
					shortKey = tmp;
					break;
				}
			}
			if (key === '') {
				break;
			}
			value = data[i].areaMoney;
			// 生成随机打点数据添加到pointData
			pointTmp = this.getRandomPoint(key, value, scale);
			pointData = pointData.concat(pointTmp);
			// 地域总销量数据添加到mapData
			// mapData.push({
			//     name: shortKey,
			//     value: value
			// });
			if (this.state.curProv == shortKey) {
				mapData.push({
					selected: true,
					name: shortKey,
					value: value,
					id: data[i].areaId
				});
			} else {
				mapData.push({
					name: shortKey,
					value: value,
					id: data[i].areaId
				});
			}
		}
		mapData.push({
			name: '南海诸岛',
			value: 0
		});
		// 返回，mapData 总销量数据， pointData 随机打点数据
		return {
			mapData: mapData,
			pointData: pointData
		};
	},
	/**
	 * 获取数据缩小比例, 当最小值大于两位数时，点数按计算的比例缩小
	 * eg:最大值999，最小值27，scale为10
	 * @param  {[type]} data 接口返回的原始数据
	 * @return {[type]}      [description]
	 */
	getScale: function (data) {
		var i, tmp;
		var minimum = 0;
		var maximum = 0;
		var scale = 1;

		for (i = 0; i < data.length; i++) {
			tmp = data[i].areaMoney;
			if (tmp > 0) {
				if (minimum == 0 && maximum == 0) {
					minimum = tmp;
					maximum = tmp;
				} else {
					minimum = tmp < minimum ? tmp : minimum;
					maximum = tmp > maximum ? tmp : maximum;
				}
			}
		}
		maximum = maximum + '';
		minimum = minimum + '';
		if (maximum.length > 2) {
			scale = Math.pow(10, minimum.length - 1);
		}
		return scale;
	},
	/**
	 * 生成随机打点数据，一次生成一个品牌，一个省的数据
	 * @param  {[type]} province  省份名，用于从cites中查找地级市的经纬度
	 * @param  {[type]} dataCount 数据量
	 * @return {[type]}           [description]
	 */
	getRandomPoint: function (province, dataCount, scale) {
		var i, j;
		var tmp, x, y, dx, dy;
		var pointData = [];

		// 集中度，数值越大，散点往省会城市集中
		var concentration = 2;
		// 散布系数，数值越大，散布区域越宽
		var dispersion = 1.2;
		var provCities = cities[province];
		var cityCount = provCities.length;

		// 限制dataCount最大值, 最多99个点
		dataCount = Math.round(dataCount / scale);
		dataCount = dataCount > 99 ? 99 : dataCount;

		// 保证省会城市至少有一个点
		if (dataCount > 0) {
			x = provCities[0].geo[0];
			y = provCities[0].geo[1];
			pointData.push([x, y, 1]);
		}
		// 剩余点随机散步在当前省级行政区内
		for (j = 0; j < dataCount - 1; j++) {
			var index = Math.round(Math.random() * (cityCount + concentration));
			if (index >= cityCount) {
				index = 0;
			}
			x = provCities[index].geo[0];
			y = provCities[index].geo[1];               
			tmp = Math.random() * Math.PI * 2;
			dx = Math.sin(tmp) * Math.random() * dispersion;
			dy = Math.cos(tmp) * Math.random() * dispersion;
			x += dx;
			y += dy;
			pointData.push([x, y, 1]);
		}
		return pointData;
	},
	componentDidUpdate: function (preProps) {
		if (this.props.area.areaPreferStamp > preProps.area.areaPreferStamp) {
			var seriesData = this.getMapData();
			this.option.series[0].data = seriesData.mapData;
			this.option.series[1].data = seriesData.pointData;
			this.registerMap(this.updateChart);

			var areaId = this.getAreaId('四川');
			this.setState({
				areaId: areaId
			});
			this.props.actions.getAreaRank({areaId: areaId});
			this.props.actions.getAreaFeature({areaId: areaId});
		}
	},
	updateChart: function () {
		this.myChart.setOption(this.option);
	},
	// 获取地区代码
	getAreaId: function (areaName) {
		var id = 0;
		var data = this.props.area.areaPreferData;

		for (var i = 0; i < data.length; i++) {
			if (data[i].areaName.indexOf(areaName) === 0) {
				id = data[i].areaId;
				break;
			}
		}
		return id;
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div className={'feature '+(this.props.cur == 1 ? 'middle' : 'down')}>
				<div ref="map" style={{width:'8rem',height:'8rem'}}></div>
				<div className="sub-chart">
					<ChartPie 
						prov={this.state.curProv}
						areaId={this.state.areaId}
						data={this.props.area.areaRankData}
						stamp={this.props.area.areaRankStamp}
					></ChartPie>
					<ChartBar
						prov={this.state.curProv}
						areaId={this.state.areaId}
						data={this.props.area.areaFeatureData}
						stamp={this.props.area.areaFeatureStamp}
					></ChartBar>
				</div>
			</div>			
		)
	}
});

export default Feature;