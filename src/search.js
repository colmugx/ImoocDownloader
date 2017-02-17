//Search.js
var cheerio = require('cheerio');
var request = require('request');

var app = require('./app')

//主入口
var search = async function(con) {
    var url = `http://www.imooc.com/learn/${con}`;
    var msgGet = function(url) {
        return new Promise(function(resolve, reject) {
            request.get(url, function(err, res, body) {
                if (err) return reject(err);
                resolve(body);
            });
        });
    }
    var msg = app(await msgGet(url));
    return msg;
}
module.exports = search
