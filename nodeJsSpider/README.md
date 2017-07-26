# nodejs爬虫

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

语法类似jquery,
