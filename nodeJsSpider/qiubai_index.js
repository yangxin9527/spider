var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var http = require('http');

var run = function(Url,startNum,Sum){
    var page={
        i:startNum,//当前的页数  
        sum:startNum+Sum,//总的爬取页数  
        url:Url,//当前爬取的url地址  
        newUrl:null,//新组装的url地址  
        data:null,//页面爬取的html内容  
        timer:null,//定时器，控制爬虫的结束  
        ws:null,//文件操作变量  
    };
    var duanzi=[];
    //爬取入口函数  
    this.fetchPage = function(){
        // console.log(page);
        startRequest(page.url+page.i);
    }
    //开始爬取数据函数  
    function startRequest(x) {
        var params = {
            url: x,
            headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
            }
        }
        request(params, function (error, response, body) {
            console.log(error);
            if (!error && response.statusCode == 200) {
                //console.log(body);  
                page.data = body;
                //console.log(page.data);  
                if(page.timer==null){
                    page.ws = fs.createWriteStream('output.txt','utf-8');
                    page.timer = setInterval(nextPage,1000);
                }
            }

        });
        function nextPage(){
            //控制爬多少篇文章
            if (page.i <= page.sum) {
                acquireData();
                // console.log('当前爬取的页数: '+page.i);
                //下一篇文章的url
                page.newUrl = page.url + ++page.i;
                startRequest(page.newUrl);
            } else{
                clearInterval(page.timer);
            }
        }

        function acquireData(){
            //cheerio插件相当于jq的功能  
            var $ = cheerio.load(page.data);
            console.log($('.content').length);
            for(let k=0;k<$('.content').length;k++){
                page.ws.write($('.content').eq(k).text());
            }
            // console.log("第"+page.i+"页全部爬取完毕！");
        }
    }
}

var start = new run('http://www.qiushibaike.com/text/page/',1,20);
start.fetchPage();  