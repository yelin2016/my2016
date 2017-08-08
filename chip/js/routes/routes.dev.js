import MyApp from '../components/MyApp';
import Board from '../components/board';
import NotFound from '../components/NotFound';

import negativeRoute from './negative';
import hotspotRoute from './hotspot';
import specialRoute from './special';
import diggingRoute from './digging';

// 测试环境包含通用ui组件的demo演示页面的路由
import Demos from '../components/demos';
import demosRoute from './demos';

var rootRoute = {
	path: '/',
	component: MyApp,
	indexRoute: { component: Board },
	childRoutes: [
		negativeRoute,
		hotspotRoute,
		specialRoute,
		diggingRoute,
		demosRoute,
		{path: 'board', component: Board},
		{
			path: '*',
			component: NotFound
		}
	]
};

export default rootRoute;