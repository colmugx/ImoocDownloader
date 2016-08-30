var request = require('request');
var fs = require('fs');
var colors = require('colors');

module.exports = function (cName, vName, num, dis) {

    request.get("http://www.imooc.com/course/ajaxmediainfo/?mid=" + num + "&mode=flash", function (err, res, data) {
        if (!err && res.statusCode == 200) {
            var json = JSON.parse(data);
            var disVid = json['data'].result.mpath[dis];

            switch (dis) {
                case 0:
                    var dislevel = '标清';
                    break;
                case 1:
                    var dislevel = '高清';
                    break;
                case 2:
                    var dislevel = '超清';
                    break;
                default:
                    break;
            }

            download(disVid, vName, cName, dislevel, function () {
                console.log('【下载完成】'.green + '【' + cName + '】' + vName + '(' + dislevel + ')');
            });
        }
    });

    var download = function (url, videoName, className, dis, callback) {

        var stream = fs.createWriteStream('./' + className + '/' + '【' + className + '】' + videoName + '(' + dis + ').mp4');
        console.log('【正在下载】'.green + '【' + className + '】' + videoName);
        request(url).pipe(stream).on('close', callback);
    }
}
