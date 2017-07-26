var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var http = require('http');

var requrl1 = "http://jandan.net/duan/page-";
var i=2449;
var arr=[];

function fetchPage(x){
    startRequest(x);
}

fetchPage("http://jandan.net/duan/page-2449");

function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {
        //用来储存请求的网页整个html内容
        var html = '';
        var titles = [];
        //设置编码格式
        res.setEncoding('utf-8');
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            acquireData(html);
            // //下一篇文章的url
            // var nextLink = requrl1 + i++;
            // //控制爬多少篇文章
            // if (i <= 2) {
            //     console.log('i: '+i);
            //     fetchPage(nextLink);
            // }
        });

    }).on('error', function (err) {
        console.log(err);
    });
}

function acquireData(data){
    //cheerio插件相当于jq的功能
    var $ = cheerio.load(data);
    //看页面可以知道，当前的图片有class=test，将它们当数组存进meizi变量
    $('.bad_content').parent().remove();
    $('.righttext').remove();

    var meizi = $('.text p').toArray();
    var len = meizi.length;
    for(var i=0;i<len;i++){
        if(meizi[i]&&meizi[i].children){
            for(j in meizi[i].children){
                if(meizi[i].children[j].data){
                    console.log(meizi[i].children[j].data)
                }


            }

        }
    }
}
//
// function parseUrlForFileName(address){
//     //提取出用 ‘/' 隔开的path的最后一部分，即图片名字
//     var filename = path.basename(address);
//     return filename;
// }

// //下载图片函数
// var downloadImg = function(uri,filename,callback){
//     //http请求
//     request.head(uri,function(err,res,body){
//         if(err){
//             console.log('err:'+err);
//             return false;
//         }
//         console.log('res: '+res);
//         //水管式保存数据，防止未来得及记录数据又开始读取数据而导致数据丢失
//         request(uri).pipe(fs.createWriteStream('./images/'+filename)).on('close',callback);
//     });
// }