import React from 'react';
import areaData from './areaData';
import cities from './cityGeocoord';

var pointColors = ['#e97c77','#7fa3df','#7bdda7','#f5e58e','#7f84df','#eaa97a','#68b4ee','#9bd27c','#f195bc','#45c8e0'];

var Brand = React.createClass({
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
				formatter: getToolTip,
				backgroundColor: '#262e3e',
				textStyle: {
					color: '#63a1e9',
					fontSize:14,
				}
			},
			legend: {
				show: true,
				right: 'right',
				data: ['长虹','TCL'],
				orient: 'vertical',
				textStyle: {
					color: '#8ba7bf'
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
							areaColor: 'rgba(27,38,53,0.6)',
							borderColor: '#5a8ac6'
						}
					},
					data: []
				}
			]
		};
		this.option = option;

		var brandSel = {};
		var _this = this;
		function getToolTip (params) {
			var province = params.name;
			var total = params.value;
			for (var k in brandSel) {
				if (!brandSel[k]) {
					total = total - _this.getBrandValue(province, k);
				}
			}
			return province+':'+total;
		}

		var myChart = echarts.init(this.refs.map);
		this.myChart = myChart;

		// 获取地图json数据，注册地图
		this.registerMap();
		// 获取地域销量数据
		this.props.getAreaSale();

		// 图例选中、取消品牌时，将各品牌选择状态保存下来，供生成tooltip时使用
		this.myChart.on("legendselectchanged", function (param) {
			brandSel = param.selected;
		});

		this.chartResize = this.myChart.resize;
		window.addEventListener('resize', this.chartResize);
	},
	/**
	 * 获取指定省份某个品牌的销售数据.
	 * 当地域销量分布地图legend中有品牌未选中，显示tooltip时需要从总value中减去未选中品牌的销售数据.
	 * @param  {[type]} province 省份名
	 * @param  {[type]} brand    品牌名
	 * @return {[type]}          [description]
	 */
	getBrandValue: function (province, brand) {
		var data = this.props.data;
		var i, saleData = null;
		for (i = 0; i < data.length; i++) {
			if (data[i].areaName.indexOf(province) === 0) {
				saleData = data[i].brandSale;
				break;
			}
		}
		if (saleData) {
			for (i = 0; i < saleData.length; i++) {
				if (saleData[i].brandName == brand) {
					return saleData[i].brandMoney;
				}
			}
		}
		return 0;
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
		var data = this.props.data;
		var i, j, tmp, key, shortKey, value;
		var mapData = [];
		var brandList = [];
		var pointTmp, brandNm;
		var pointData = {};

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
			tmp = data[i].brandSale;
			// 生成随机打点数据添加到pointData，品牌名按出现的先后顺序添加到brandList
			for (j = 0; j < tmp.length; j++) {
				value = value + tmp[j].brandMoney;
				brandNm = tmp[j].brandName;
				pointTmp = this.getRandomPoint(key, tmp[j].brandMoney, scale);

				if (pointData[brandNm]) {
					pointData[brandNm] = pointData[brandNm].concat(pointTmp);
				} else {
					brandList.push(brandNm);
					pointData[brandNm] = pointTmp;
				}
			}
			// 地域总销量数据添加到mapData
			mapData.push({
				name: shortKey,
				value: value
			});
		}
		mapData.push({
			name: '南海诸岛',
			value: 0
		});
		// 返回，mapData 总销量数据， brandList 品牌名列表， pointData 随机打点数据
		return {
			mapData: mapData,
			brandList: brandList,
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
		var i, j, tmp;
		var minimum = 0;
		var maximum = 0;
		var scale = 1;

		for (i = 0; i < data.length; i++) {
			for (j = 0; j < data[i].brandSale.length; j++) {
				tmp = data[i].brandSale[j].brandMoney;
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
		if (this.props.stamp > preProps.stamp) {
			var seriesData = this.getMapData();
			this.option.series[0].data = seriesData.mapData;
			// 清除散点数据
			while (this.option.series.length > 1) {
				this.option.series.pop();
			}
			// 重设散点数据
			for (var i = 0; i < seriesData.brandList.length; i++) {
				this.option.series.push({
					name: seriesData.brandList[i],
					type: 'scatter',
					coordinateSystem: 'geo',
					legendHoverLink: false,
					symbolSize: 2,
					large: true,
					largeThreshold: 10,
					itemStyle: {
						normal: {
							shadowBlur: 4,
							shadowColor: Util.toRgba(pointColors[i], 0.8),
							color: pointColors[i]
						}
					},
					data: seriesData.pointData[seriesData.brandList[i]]
				});
			}
			this.registerMap(this.updateChart)
		}
	},
	updateChart: function () {
		this.myChart.setOption(this.option);
	},
	componentWillUnmount: function () {
		window.removeEventListener('resize', this.chartResize);
		this.myChart.dispose();
	},
	render: function () {
		return (
			<div className={'brand '+(this.props.cur == 0 ? 'middle' : 'up')}>
				<div ref="map" style={{width:'16rem',height:'8rem',margin:'0 auto'}}></div>
			</div>			
		)
	}
});

export default Brand;