//getVideo.js
const request = require('request');

let getVideo = async function (dic) {
    let list = dic;
    let len = list.length;
    let vidMsg = {};
    function msgGet(i) {
        return new Promise((resolve, reject)=> {
            request.get(`http://www.imooc.com/course/ajaxmediainfo/?mid=${list[i].num}&mode=flash`, (err, res, data)=> {
                let json = JSON.parse(data);
                resolve(json)

            })
        })
    }
    for (let i=0;i<len;i++) {
        let json = await msgGet(i);
        let vipath = json['data'].result.mpath;
        // console.log(vipath)
        let viDic = [];
        for (let t=0;t<vipath.length;t++) {
            viDic.push(vipath[t]);
        }
        vidMsg[`${list[i].title}`] = viDic;
    }
    return vidMsg;
}

module.exports = getVideo;
