import Hotspot from '../../components/hotspot';

var negativeRoute = {
	path: '/hotspot',

	component: Hotspot,
	// 使用require.ensure来分块打包
	getChildRoutes: function (location, callback) {
		require.ensure([], function (require) {
			callback(null, [
				require('./cab'),
				require('./distribution'),
				require('./monitor')
			]);
		});
	}
};

export default negativeRoute;