//Import
var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');
var fs = require('fs');

var downloader = require('./downloader.js');

var getClass = function (dict, cName) {

    var classList = dict;

    console.log('一共有' + classList.length + '个视频');

    const rl = require('readline').createInterface({ //Read Line.
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.question('选择要下载的清晰度【SD】、【HD】、【FHD】，请准确填写！'.green, function (l) {

        var folder_exists = fs.existsSync('./' + cName);
        if (folder_exists == true) {
            console.log('目录存在，可以继续');
        } else {
            fs.mkdir('./' + cName);
            console.log('创建目录：' + cName);
        }

        switch (l) {
            case "SD":
                for (var i = 0; i < classList.length; i++) {
                    downloader(cName, classList[i].title, classList[i].num, 0);
                }
                rl.close();
                break;
            case "HD":
                for (var i = 0; i < classList.length; i++) {
                    downloader(cName, classList[i].title, classList[i].num, 1);
                }
                rl.close();
                break;
            case "FHD":
                for (var i = 0; i < classList.length; i++) {
                    downloader(cName, classList[i].title, classList[i].num, 2);
                }
                rl.close();
                break;
            default:
                console.log('只有【SD(普清)】、【HD(高清)】、【FHD(超清)】三种');
        }
    });
}

var getClassList = function (data) {
    var $ = cheerio.load(data);

    var dict = [];

    var title = $("h2").text();
    var classNum = $("ul.video li");

    for (var i = 0; i < classNum.length; i++) {
        var isVid = $(".video a ").eq(i).attr('href').split("/")[1];
        var classTitle = $(".video a").eq(i).text();
        classTitle = classTitle.substring(0, 150).trim();
        if (isVid != 'video') { //Check isn video.
            //No something do...
        } else { //Is a Video!
            var videoNum = $(".video a").eq(i).attr('href').split("/")[2];
            var info = {
                'title': classTitle,
                'num': videoNum
            }
            dict.push(info);
        }
    }
    getClass(dict, title);
}

//Find Class in URL.
var findClass = function (data) {
    var $ = cheerio.load(data);

    var title = $("h2").text(); //Get Class Title

    var videoSur = $(".video a");
    if (title == '' && videoSur.length == 0) {
        console.log('【课程不存在】'.red + '并没有该课程！！'.cyan);
    } else { //Continue Work.
        console.log('【课程存在】'.green + '您所查找的课程名称为:' + '《'.bold.cyan + title.bold.cyan + '》'.bold.cyan);
        var author = $('span.tit a').text();
        var job = $('span.job').text();
        var classTime = $('span.meta-value').text();
        classTime = classTime.substring(2, classTime.length - 12).trim();
        var classValue = $('span.meta-value').text();
        classValue = classValue.substring(0, classValue.length - 18).trim();
        var classInfo = $('p.auto-wrap').text();
        var classKn = $('.first > dd.autowrap').text();
        var classWh = $('.first ~ dl dd.autowrap').text();
        console.log('【课程老师】： '.green + author.grey + '\n【教师职位】： '.green + job.grey + '\n【课程时间】： '.green + classTime.grey + '\n【课程难度】： '.green + classValue.grey + '\n【课程简介】： '.green + classInfo.grey + '\n【课程须知】： \n'.green + classKn.grey + '\n【我能学到】： \n'.green + classWh.grey);

        const rl = require('readline').createInterface({ //Read Line.
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        rl.question('是否继续操作？(Y/n)'.green, function (l) {
            switch (l) {
                case 'Y':
                    getClassList(data);
                    break;
                case 'n':
                    rl.close();
                    break;
                default:
                    console.log('请选择Y或者n.');
                    rl.close();
            }
        });
    }
}

var main = function () {

    const rl = require('readline').createInterface({ //Read Line.
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    //Read Class Number
    rl.question('输入你想查找的课程编号（http://www.imooc.com/learn/100就是100）\n', function (n) {
        console.log('正在查询课程...\n'.green);
        var url = "http://www.imooc.com/learn/" + n;
        request.get(url, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                findClass(body);
            } else {
                console.log('【网络错误】'.red + '链接不存在或检查网络设置！');
            }
        });
        rl.close();
    });

}
main();
