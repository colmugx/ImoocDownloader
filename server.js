var express = require('express');
var search = require('./src/search.js');
var appMain = require('./src/app.js');
var getVideoUrl = require('./src/getVideo.js');

var app = express();

// 基础路由区
app.get('/', function(req, res) {
    res.send('hello world');
    console.log('hello world');
});

app.get('/search', function(req, res) {
    var id = req.query.id;
    var msg = search(id);

    msg.then((data)=> {
        var s = {};
        if (!data['err']) {
            // res.send(data['vidic']);
            // console.log(data['vidic']);
            var vidInfo = getVideoUrl(data['vidic']);
            vidInfo.then((v)=> {
                let s = {};
                s['code'] = data['code'];
                s['Info'] = data['Info'];
                s['Video'] = v;

                res.send(s);
                return console.log('request finish')
            })
        }
    })
});
//启动服务 监听端口
var server = app.listen(6698, function() {
    console.log('服务启动于6698端口')
});
