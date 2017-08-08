// 生产环境不包含调试工具
if (process.env.NODE_ENV === 'production') {
	// 生产环境配置
	module.exports = require('./MyApp.prod');
} else {
	// 开发环境配置
	module.exports = require('./MyApp.dev');
}