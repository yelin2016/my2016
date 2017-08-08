// 添加一些demo页面，用于演示通用组件使用 
import Demos from '../../components/demos';

var demosRoute = {
	path: '/demos',

	component: Demos,
	// 使用require.ensure来分块打包
	getChildRoutes: function (location, callback) {
		require.ensure([], function (require) {
			callback(null, [
				require('./dropdemo'),
				require('./tips'),
				require('./datepicker'),
				require('./pager'),
				require('./filterdrop'),
				require('./checkdedrop'),
				require('./inputdrop')
			]);
		});
	}
};

export default demosRoute;