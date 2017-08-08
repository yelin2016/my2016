import Negative from '../../components/negative';

var negativeRoute = {
	path: '/negative',

	component: Negative,
	// 使用require.ensure来分块打包
	getChildRoutes: function (location, callback) {
		require.ensure([], function (require) {
			callback(null, [
				require('./monitor'),
				require('./distribution'),
				require('./trend'),
				require('./rank'),
				require('./list'),
				require('./history')
			]);
		});
	}
};

export default negativeRoute;