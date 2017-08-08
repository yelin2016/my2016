import Digging from '../../components/digging';

var diggingRoute = {
	path: '/digging',

	component: Digging,
	
	// 使用require.ensure来分块打包
	getChildRoutes: function (location, callback) {
		require.ensure([], function (require) {
			callback(null, [
				require('./forum'),
				require('./area'),
				require('./brand')
			]);
		});
	}
};

export default diggingRoute;