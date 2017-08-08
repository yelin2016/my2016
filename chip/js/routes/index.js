// 生产环境不包含demos路由
if (process.env.NODE_ENV === 'production') {
	// 生产环境store配置
	module.exports = require('./routes.prod');
} else {
	// 开发环境store配置
	module.exports = require('./routes.dev');
}