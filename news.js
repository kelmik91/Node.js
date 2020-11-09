var request = require('request');
var cheerio = require('cheerio');
request('https://yandex.ru/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('.news__item-content').each(function(i, element){
            console.log($(this).text());
        });
    } else {
        console.log(error, response.statusCode);
    }
});
