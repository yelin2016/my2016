import MyApp from '../components/MyApp';
import Board from '../components/board';
import NotFound from '../components/NotFound';

import negativeRoute from './negative';
import hotspotRoute from './hotspot';
import specialRoute from './special';
import diggingRoute from './digging';

var rootRoute = {
	path: '/',
	component: MyApp,
	indexRoute: { component: Board },
	childRoutes: [
		negativeRoute,
		hotspotRoute,
		specialRoute,
		diggingRoute,
		{path: 'board', component: Board},
		{
			path: '*',
			component: NotFound
		}
	]
};

export default rootRoute;