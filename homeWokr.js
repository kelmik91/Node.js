const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const handlebars = require('handlebars');
const fs = require('fs');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { title } = require('process');

const app = express();
app.use(cookieParser())

//-----------------------handlebars-------------------------
var source = fs.readFileSync('index.hbs', 'utf-8');
var template = handlebars.compile(source);
var data = {};
//-----------------------handlebars-------------------------

//-----------------------body-parser------------------------
const urlencodedParser = bodyParser.urlencoded({extended: false});
//-----------------------body-parser------------------------

let url = 'https://ria.ru/';
let head = {
    head: {title: 'Главная', desc: 'head'},
    politics: {title: 'Политика', desc: 'politics'},
    economy: {title: 'Экономика', desc: 'economy'},
    society: {title: 'Общество', desc: 'society'}

}

app.get('/', (req, res) => {
    let resu = [];

    countNews = 99;
    res.cookie('counte', 99);
    data.counte = countNews;
    
    data.title = head.head.title;
    console.log(data);

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            
            $('.cell-list__item-title').each(function (i, element) {
                if (i < countNews) {
                    resu.push($(this).text());
                    // console.log($(this).text());  
                }
            });
            data.news = resu;
            // console.log(data);
            var result = template(data);
            res.send(result);
        } else {
            console.log(error);
        }
    });


});

app.post('/', urlencodedParser,  (req, res) => {
    let resu = [];
    data.title = head[req.body.select].title

    countNews = req.body.counte ? req.body.counte : 99;
    res.cookie('counte', req.body.counte);
    data.counte = countNews;

    req.body.select = req.body.select === 'head' ? '' : req.body.select;

    const postUrl = url + req.body.select;

    let item = '';
    if (req.body.select === '') {
        item = '.cell-list__item-title';
    } else {
        item = '.list-item__title' 
    }

    request(postUrl, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            $(item).each(function (i, element) {
                if (i < countNews) {
                    resu.push($(this).text());
                    // console.log($(this).text());  
                }
                
            });
            data.news = resu;
            // console.log(data);
            var result = template(data);
            res.send(result);
        } else {
            console.log(error);
        }
    });

});

app.listen(3000, () => console.log('Listening on port 3000'));
