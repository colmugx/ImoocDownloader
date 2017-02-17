//app.js
var cheerio = require('cheerio');

//处理请求数据
var app = function (data) {
    var allMsg = {};
    var classData = {};
    var $ = cheerio.load(data, { decodeEntities: false });
    //获取课程标题
    var title = $("h2").text();
    //分析课程视频地址
    var videoSur = $(".video a");
    if (title == '' && videoSur.length == 0) {
        //nothings to do 可能不是课程也可能不是视频
        classData['err'] = 'dont found';
    } else {
        var author = $('span.tit a').text();
        var job = $('span.job').text();
        var classTime = $('span.meta-value').text();
        classTime = classTime.substring(2, classTime.length - 12).trim();
        var classValue = $('span.meta-value').text();
        classValue = classValue.substring(0, classValue.length - 18).trim();
        var classInfo = $('p.auto-wrap').text();
        var classKn = $('.first > dd.autowrap').text();
        var classWh = $('.first ~ dl dd.autowrap').text();
        //加载进课程信息json
        classData['title'] = title;
        classData['author'] = author;
        classData['job'] = job;
        classData['classTime'] = classTime;
        classData['classValue'] = classValue;
        classData['classInfo'] = classInfo;
        classData['classKn'] = classKn;
        classData['classWh'] = classWh;

        //读取该课程所有视频
        var viDic = [];
        var classNum = $("ul.video li");
        for (var i = 0; i < classNum.length; i++) {
            var isVid = $(".video a ").eq(i).attr('href').split("/")[1];  //是不是视频，不是滚
            var classTitle = $(".video a").eq(i).text();
            classTitle = classTitle.substring(0, 150).trim();
            if (isVid != 'video') { //检查是不是视频
                //不是视频就不用干活了
            } else {
                var videoNum = $(".video a").eq(i).attr('href').split("/")[2];
                var info = {
                    'title': classTitle,
                    'num': videoNum
                }
                viDic.push(info);
            }
        }

        allMsg['Info'] = classData;
        allMsg['code'] = 200;
        allMsg['vidic'] = viDic;
    }
    return allMsg
}
module.exports = app
