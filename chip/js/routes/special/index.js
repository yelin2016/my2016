import Special from '../../components/special';

var negativeRoute = {
	path: '/special',

	component: Special,
	// 使用require.ensure来分块打包
	getChildRoutes: function (location, callback) {
		require.ensure([], function (require) {
			callback(null, [
				require('./activity'),
				require('./topic')
			]);
		});
	}
};

export default negativeRoute;