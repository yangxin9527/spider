# nodejs爬虫
### index.js
- http://jandan.net/ooxx/page-1
- http://jandan.net/ooxx/page-2
爬取美女图片存到images

### qiubai_index.js
规则很简单
- http://www.qiushibaike.com/text/page/1
- http://www.qiushibaike.com/text/page/2
爬取内容保存在output.txt里面


## 请求头修改

找到规则，传递必要参数

    var params={
       url: 'http://xxx.com',
       headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
       }    
    }
    

        
        request(params, function (error, response, body){

        ...
        ...

        })
        
        
## cheerio        
var cheerio = require('cheerio');

语法类似jquery,用于筛选内容
