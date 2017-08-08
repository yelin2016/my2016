var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//本地调试时设置接口跨域访问代理
//使用示例：
//eclipse接口访问地址localhost:8080
//代理接口访问地址localhost:8081
//前端webpack-dev-server调试地址localhost:8082
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");


		var originalUrl = req.originalUrl;
    if (originalUrl.indexOf('opinion') > -1) {
    	var option = {
    		url: 'http://10.9.44.103:8080'+originalUrl
    	};
    	var method = req.method;
    	// 处理post类型接口，未测试
    	if (method == 'POST') {
    		option.method = 'POST';
    		option.form = req.body;
    	}

    	console.log(method + ' ' + originalUrl + ' ' + new Date().toLocaleString());

    	request(option, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			  	res.send(body);
			  } else {
			  	if (error) {
			  		res.status(500).send(error);
			  	} else {
			  		res.status(500).send('remote error, status: ' + response.statusCode);
			  	}
			  }
			});
    } else {
    	res.status(404).end();
    }
});

app.listen(8081);

console.log('Listening on port 8081...');