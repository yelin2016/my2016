var Constants = {
	MENUDATA: [
		{
			"name": "舆情看板",
			"level": 1,
			"route": "board",
			"child": false
		},
		{
			"name": "舆情负面预警",
			"level": 1,
			"route": 'negative',
			"child": [
				{
					"name": "负面舆情监控",
					"level": 2,
					"route": "negative/monitor",
					"child": false
				},
				{
					"name": "负面舆情分布",
					"level": 2,
					"route": "negative/distribution",
					"child": false
				},
				{
					"name": "负面舆情走势",
					"level": 2,
					"route": "negative/trend",
					"child": false
				},
				{
					"name": "负面舆情排行",
					"level": 2,
					"route": "negative/rank",
					"child": false
				},
				{
					"name": "负面舆情列表",
					"level": 2,
					"route": "negative/list",
					"child": false
				},
				{
					"name": "历史负面舆情列表",
					"level": 2,
					"route": "negative/history",
					"child": false
				}
			]
		},
		{
			"name": "热点舆情监控",
			"level": 1,
			"route": 'hotspot',
			"child": [
				{
					"name": "热点舆情驾驶舱",
					"level": 2,
					"route": "hotspot/cab",
					"child": false
				},
				{
					"name": "论坛热点舆情分布",
					"level": 2,
					"route": "hotspot/distribution",
					"child": false
				},
				{
					"name": "热点舆情监控表",
					"level": 2,
					"route": "hotspot/monitor",
					"child": false
				}
			]
		},
		{
			"name": "专题舆情列表",
			"level": 1,
			"route": 'special',
			"child": [
				{
					"name": "活动舆情简报",
					"level": 2,
					"route": "special/activity",
					"child": false
				},
				{
					"name": "专题舆情简报",
					"level": 2,
					"route": "special/topic",
					"child": false
				}
			]
		},
		{
			"name": "舆情挖掘",
			"level": 1,
			"route": 'digging',
			"child": [
				{
					"name": "论坛舆情挖掘",
					"level": 2,
					"route": "digging/forum",
					"child": false
				},
				{
					"name": "地域电商分析",
					"level": 2,
					"route": "digging/area",
					"child": false
				},
				{
					"name": "品牌舆情挖掘",
					"level": 2,
					"route": "digging/brand",
					"child": false
				}
			]
		}
	]
};

export default Constants;