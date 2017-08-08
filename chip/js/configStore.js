// 生产环境不包含调试工具
if (process.env.NODE_ENV === 'production') {
	// 生产环境store配置
	module.exports = require('./configStore.prod');
} else {
	// 开发环境store配置
	module.exports = require('./configStore.dev');
}