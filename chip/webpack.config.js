var webpack = require("webpack");
var path = require("path");

var config = {
	entry: './js/index.js',

	output: {
		path: './js/build/',
		filename: 'bundle.js',
		publicPath: '/js/build/',
		chunkFilename: "[id].bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.js$/, 
				include: [
					path.resolve(__dirname, "js")
				],
				exclude: [
					path.resolve(__dirname, "js/build"),
					path.resolve(__dirname, "node_modules")
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-object-assign']
				}
			}
		]
	},

	plugins: []
};

var env = process.env.NODE_ENV;
console.log("node env: \x1b[32m" + env + "\x1b[0m");
if (env === 'production') {
	// 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
	config.plugins.push(
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	);
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
	// 开启sourcemap
	config.devtool = "source-map";
	// publicPath改为相对路径
	config.output.publicPath = "./js/build/";
	// // 开启文件hash	//暂不使用，上线时再开启
	// config.output.filename = "[hash].bundle.js";
	// config.output.chunkFilename = "[id].[hash].bundle.js";
}
module.exports = config;