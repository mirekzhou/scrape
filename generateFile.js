"use strict";

var user_agent_list = [
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
    "Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/19.77.34.5 Safari/537.1",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
    "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'
];

var fs         = require('fs');
var dirname    = 'singapore2';
var x          = Math.floor((Math.random() * 10));
var userAgent  = user_agent_list[x];

var indexPage       = require('webpage').create();
var analysisPage    = require('webpage').create();
var totoLastPage    = require('webpage').create();
var totoNextPage    = require('webpage').create();
var fourDLastPage   = require('webpage').create();
var fourDNextPage   = require('webpage').create();
var sweepLastPage   = require('webpage').create();
var sweepNextPage   = require('webpage').create();

indexPage.settings.userAgent      =  userAgent;
analysisPage.settings.userAgent   =  userAgent;
totoLastPage.settings.userAgent   =  userAgent;
totoNextPage.settings.userAgent   =  userAgent;
fourDLastPage.settings.userAgent  =  userAgent;
fourDNextPage.settings.userAgent  =  userAgent;
sweepLastPage.settings.userAgent  =  userAgent;
sweepNextPage.settings.userAgent  =  userAgent;

function generateTotoLastAndNext (num) {
    var lastUrl  = 'http://www.sg-lotto.com/singapore-pools-toto-results/lottery/' + num + '.php';
    var lastPath = '/singapore-pools-toto-results/lottery/' + num + '.php.htm';
    var nextUrl  = 'http://www.sg-lotto.com/toto-lottery-results/next_draw.php';
    var nextPath = '/toto-lottery-results/next_draw.php.htm';

    totoLastPage.open(lastUrl, function (status) {
        if (status !== 'success') {
            console.log('Open totoLastPage failed!');
        } else {
            var temp;
            
            totoLastPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                temp = totoLastPage.evaluate(function () {
                    $('table.a5').hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\.\.\/\"/g, 'href="../../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../../js/header.common.js"></script></body></html>';


                try {
                    console.log('ToTo last draw page: successed!');
                    fs.write(dirname + lastPath, temp, 'w');
                } catch(e) {
                    console.log('ToTo last draw page: failed: ' + e);
                }
            });
        }
    });

    totoNextPage.open(nextUrl, function (status) {
        if (status !== 'success') {
            console.log('Open totoNextPage failed!');
        } else {
            var temp;

            totoNextPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                temp = totoNextPage.evaluate(function () {
                    $('table.a5').hide();
                    $('.a45').hide();
                    $($('.a47')[1]).hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log('ToTo next draw page: successed!');
                    fs.write(dirname + nextPath, temp, 'w');
                } catch(e) {
                    console.log('ToTo next draw page: failed:');
                }
            });
        }
    });
}

function generateFourDLastAndNext (num) {
    var lastUrl  = 'http://www.sg-lotto.com/4d-lottery-results/past_results_list-4d.php?draw=' + num;
    var lastPath = '/4d-lottery-results/past_results_list-4d.php-draw=' + num + '.htm';
    var nextUrl  = 'http://www.sg-lotto.com/4d-lottery-results/next_draw.php';
    var nextPath = '/4d-lottery-results/next_draw.php.htm';

    fourDLastPage.open(lastUrl, function (status) {
        if (status !== 'success') {
            console.log('Open fourDLastPage failed!');
        } else {
            fourDLastPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = fourDLastPage.evaluate(function () {
                    $('table.a5').hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num, 'past_results_list-4d.php-draw=' + num + '.htm');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log('4D last draw page: successed');
                    fs.write(dirname + lastPath, temp, 'w');
                } catch(e) {
                    console.log('4D last draw page: failed');
                }
            });
        }
    });

    fourDNextPage.open(nextUrl, function (status) {
        if (status !== 'success') {
            console.log('Open fourDNextPage failed!');
        } else {
            var temp;

            fourDNextPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                temp = fourDNextPage.evaluate(function () {
                    $('table.a5').hide();
                    $('.a45').hide();
                    $($('.a47')[1]).hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log('4D next draw page: successed');
                    fs.write(dirname + nextPath, temp, 'w');
                } catch(e) {
                    console.log('4D next draw page: failed');
                }
            });
        }
    });
}

function generateSweepLastAndNext (num) {
    var lastUrl  = 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=' + num;
    var lastPath = '/sweep-lottery-results/past_results_list-sweep.php-draw=' + num + '.htm';
    var nextUrl  = 'http://www.sg-lotto.com/sweep-lottery-results/next-draw.php';
    var nextPath = '/sweep-lottery-results/next-draw.php.htm';

    sweepLastPage.open(lastUrl, function (status) {
        if (status !== 'success') {
            console.log('Open sweepLastPage failed!');
        } else {
            sweepLastPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = sweepLastPage.evaluate(function () {
                    $('table.a5').hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');
                
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + num, 'past_results_list-sweep.php-draw=' + num + '.htm');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log('Sweep last draw page: successed!');
                    fs.write(dirname + lastPath, temp, 'w');
                } catch(e) {
                    console.log('Sweep last draw page: failed!');
                }
            });
        }
    });

    sweepNextPage.open(nextUrl, function (status) {
        if (status !== 'success') {
            console.log('Open sweepNextPage failed!');
        } else {
            var temp;

            sweepNextPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                temp = sweepNextPage.evaluate(function () {
                    $('table.a5').hide();
                    $('.a45').hide();
                    $($('.a47')[1]).hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log('Sweep next draw page: successed');
                    fs.write(dirname + nextPath, temp, 'w');
                } catch(e) {
                    console.log('Sweep next draw page: failed');
                }
            });
        }
    });
}

/*
**  ----------------------index page-------------------
*/
function index () {
    indexPage.open('http://www.sg-lotto.com/', function (status) {
        if (status !== 'success') {
            console.log('Open indexPage failed!');
        } else {
            var temp;

            indexPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                temp = indexPage.evaluate(function () {
                    $('.a52').parents('.a5').hide();
                    $('.a45').hide();
                    $('table.a2, table.a51').css('pointer-events', 'none');
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    $('#___page_0').hide();

                    /*
                    **-------增加首页Keno的广告倒计时图片
                    */
                    var fourDAd = $($('.new1mini')[1]);
                    var sweepAd = $($('.new1mini')[2]);
                    var ad      = sweepAd.parent();
                    var clone   = fourDAd.clone();
                    clone.css({
                        'background-image': 'url("images/keno-results-bg-new-mini.gif")',
                        'border': 'none'
                    });
                    clone.find('.buttonclick').attr('href', 'keno-lottery-results/index.php');
                    ad.append(clone);

                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                temp = temp.replace('http://www.sg-lotto.com/images/keno-results-bg-new-mini.gif', 'images/keno-results-bg-new-mini.gif');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="');
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入Keno开奖号码控制脚本和公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="js/index.keno.js"></script>' + 
                                                        '<script type="text/javascript" src="js/header.common.js"></script>' + 
                                                        '</body></html>';

                try {
                    console.log('Index page: succeed');
                    fs.write(dirname + '/index.htm', temp, 'w');
                } catch(e) {
                    console.log('Index page: failed: ');
                }

                var pos1 = temp.indexOf('TOTO Lottery (Draw: ');
                var pos2 = temp.indexOf('4D Lottery (Draw: ');
                var pos3 = temp.indexOf('SWEEP Lottery (Draw: ');
                var totalLastDraw = temp.substr(pos1 + 20, 4);
                var fourDLastDraw = temp.substr(pos2 + 18, 4);
                var sweepLastDraw = temp.substr(pos3 + 21, 7);
                console.log('totalLastDraw = ' + totalLastDraw);
                console.log('fourDLastDraw = ' + fourDLastDraw);
                console.log('sweepLastDraw = ' + sweepLastDraw);
                generateTotoLastAndNext(totalLastDraw);
                generateFourDLastAndNext(fourDLastDraw);
                generateSweepLastAndNext(sweepLastDraw);
            });
        }
    });
}

/*
**  ----------------------Result  Page-------------------
*/
var resultPage = require('webpage').create();
var resultUrls = [
    {
        url: 'http://www.sg-lotto.com/toto-lottery-results/index.php',
        writePath: 'toto-lottery-results/index.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/4d-lottery-results/index.php',
        writePath: '4d-lottery-results/index.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/sweep-lottery-results/index.php',
        writePath: 'sweep-lottery-results/index.php.htm'
    }
];

function processResultPage () {
    if (resultUrls.length == 0) {
        console.log('********************Result页面抓取完成**********************');
        return;
    } else{
        var item   = resultUrls.pop();
        resultPage = require('webpage').create();
        resultPage.open(item.url, function (status) {
            resultPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = resultPage.evaluate(function () {
                    /*
                    ** 保留 PAST RESULTS
                    */
                    $('table.a45 .hordraws').hide();
                    $($('table.a45 .hordraws')[0]).show();

                    /*
                    **  除去 “"THIS WEBSITE IS NOT AN OFFICIAL WEBSITE AND IS NOT ASSOCIATED WITH SINGAPORE POOLS LOTTERY AGENT”
                    */
                    $('.a47').hide();

                    /*
                    **  除去最后一个广告区
                    */
                    // var len = $('.a4article').length;
                    // $($('.a4article')[len-1]).hide();

                    /*
                    ** 除去三排广告区
                    */
                    $('table.a5stat').hide();

                    /*
                    ** 除去各种新加坡过期和彩票图片
                    */
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');

                    /*
                    ** 除去sg-lotto facebook图片
                    */
                    $('#widget_bounds').hide();

                    /*
                    ** 禁止表单的点击事件
                    */
                    $('input[type="submit"]').parent('form').remove();

                    /*
                    ** footer姐妹网址的链接
                    */
                    $('.a52').parents('.a5').hide();

                    /*
                    ** a4article 链接点击失效
                    */
                    $('table.a4article').css('pointer-events', 'none');

                    /*
                    ** past result下面的大空白区
                    */
                    $('table.a450').hide();

                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../');
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                var pos2 = temp.indexOf('4D Lottery (Draw: ');
                var pos3 = temp.indexOf('SWEEP Lottery (Draw: ');
                var fourDLastDraw = temp.substr(pos2 + 18, 4);
                var sweepLastDraw = temp.substr(pos3 + 21, 7);
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + fourDLastDraw, 'past_results_list-4d.php-draw=' + fourDLastDraw + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + fourDLastDraw, 'past_results_list-4d.php-draw=' + fourDLastDraw + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + fourDLastDraw, 'past_results_list-4d.php-draw=' + fourDLastDraw + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(fourDLastDraw) - 1), 'past_results_list-4d.php-draw=' + (parseInt(fourDLastDraw) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(fourDLastDraw) - 1), 'past_results_list-4d.php-draw=' + (parseInt(fourDLastDraw) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(fourDLastDraw) - 1), 'past_results_list-4d.php-draw=' + (parseInt(fourDLastDraw) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(fourDLastDraw) + 1), 'past_results_list-4d.php-draw=' + (parseInt(fourDLastDraw) + 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(fourDLastDraw) + 1), 'past_results_list-4d.php-draw=' + (parseInt(fourDLastDraw) + 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(fourDLastDraw) + 1), 'past_results_list-4d.php-draw=' + (parseInt(fourDLastDraw) + 1) + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + sweepLastDraw, 'past_results_list-sweep.php-draw=' + sweepLastDraw + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + sweepLastDraw, 'past_results_list-sweep.php-draw=' + sweepLastDraw + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + sweepLastDraw, 'past_results_list-sweep.php-draw=' + sweepLastDraw + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + (parseInt(sweepLastDraw) - 1), 'past_results_list-sweep.php-draw=' + (parseInt(sweepLastDraw) - 1) + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + (parseInt(sweepLastDraw) - 1), 'past_results_list-sweep.php-draw=' + (parseInt(sweepLastDraw) - 1) + '.htm');
                temp = temp.replace('past_results_list-sweep.php.htm?draw=' + (parseInt(sweepLastDraw) - 1), 'past_results_list-sweep.php-draw=' + (parseInt(sweepLastDraw) - 1) + '.htm');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log(item.url + ': succeed');
                    fs.write(dirname + '/' + item.writePath, temp, 'w');
                } catch(e) {
                    console.log(item.url + ': failed: '+ e);
                }

                resultPage.release();
                processResultPage();
            });
        });
    }
}

/*
**  ----------------------Analysis Page -------------------
*/

function analysis () {
    analysisPage.open('http://www.sg-lotto.com/toto-lottery-results/draw-analysis/index.php', function (status) {
        if (status !== 'success') {
            console.log('Open analysisPage failed!');
        } else {
            analysisPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = analysisPage.evaluate(function () {
                    $('#graph svg:last-child').remove();
                    $('table.a5').hide();

                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                temp = temp.replace(/href=\"http\:\/\/www\.sg\-lotto\.com\/\"/g, 'href="../../index.htm"');
                temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\.\.\/\"/g, 'href="../../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../../js/header.common.js"></script></body></html>';

                try {
                    console.log('Analysis page: successed!');
                    fs.write(dirname + '/toto-lottery-results/draw-analysis/index.php.htm', temp, 'w');
                } catch(e) {
                    console.log('Analysis page:  failed');
                }
            });
        }
    });
}


/*
**  ----------------------Static Pages 1 -------------------
*/
var urls1 = [
    {
        url: 'http://www.sg-lotto.com/about_us.php',
        writePath: 'about_us.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/register.php',
        writePath: 'register.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/contact_us.php',
        writePath: 'contact_us.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-play-singapore-toto-lotto.php',
        writePath: 'how-to-play-singapore-toto-lotto.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-choose-your-loto-numbers.php',
        writePath: 'how-to-choose-your-loto-numbers.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-win-singapore-loto-tips.php',
        writePath: 'how-to-win-singapore-loto-tips.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-lottery-dictionary.php',
        writePath: 'how-to-lottery-dictionary.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-calculate-lotto-odds.php',
        writePath: 'how-to-calculate-lotto-odds.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-play-singapore-sweep-lottery.php',
        writePath: 'how-to-play-singapore-sweep-lottery.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/how-to-play-singapore-4d-lottery.php',
        writePath: 'how-to-play-singapore-4d-lottery.php.htm'
    }
];

var arrayPage1 = require('webpage').create();

function processPageArray1 () {
    if (urls1.length == 0) {
        console.log('********************深度为1的页面抓取完成**********************');
        return;
    } else{
        var item    = urls1.pop();
        arrayPage1 = require('webpage').create();
        arrayPage1.open(item.url, function () {
            arrayPage1.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = arrayPage1.evaluate(function() {
                    $('.a52').parents('.a5').hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    $($('.a45')[1]).hide();
                    $('.a47').hide();

                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', 'images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http\:\/\/www\.sg\-lotto\.com\/\"/g, 'href="index.htm"');
                temp = temp.replace('http://www.sg-lotto.com/images/keno-results-bg-new-mini.gif', 'images/keno-results-bg-new-mini.gif');
                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="');
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="js/header.common.js"></script></body></html>';

                try {
                    console.log(item.url + ': succeed');
                    fs.write(dirname + '/' + item.writePath, temp, 'w');
                } catch(e) {
                    console.log(item.url + ': failed: '+ e);
                }

                arrayPage1.release();
                processPageArray1();
            });
        });
    }
}

/*
**  ----------------------Static Pages 2 -------------------
*/
var urls2 = [
    {
        url: 'http://www.sg-lotto.com/forex/index.php',
        writePath: 'forex/index.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/forex/forex-trading-platform-tips-and-tricks.php',
        writePath: 'forex/forex-trading-platform-tips-and-tricks.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/forex/forex-trading-is-not-lottery-it-is-business.php',
        writePath: 'forex/forex-trading-is-not-lottery-it-is-business.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/forex/forex-trading-platform-top-best-online-brokers.php',
        writePath: 'forex/forex-trading-platform-top-best-online-brokers.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/toto-lottery-results/past_results_list-toto.php',
        writePath: 'toto-lottery-results/past_results_list-toto.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/4d-lottery-results/past_results.php',
        writePath: '4d-lottery-results/past_results.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/sweep-lottery-results/past_results.php',
        writePath: 'sweep-lottery-results/past_results.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/toto-lottery-results/past_results_list-toto.php?pastyearsresults=2016',
        writePath: 'toto-lottery-results/past_results_list-toto.php-pastyearsresults=2016.htm'
    },
    {
        url: 'http://www.sg-lotto.com/toto-lottery-results/past_results_list-toto.php?pastyearsresults=2017',
        writePath: 'toto-lottery-results/past_results_list-toto.php-pastyearsresults=2017.htm'
    },
    {
        url: 'http://www.sg-lotto.com/4d-lottery-results/past_results.php?pastyearsresults=2017',
        writePath: '4d-lottery-results/past_results.php-pastyearsresults=2017.htm'
    },
    {
        url: 'http://www.sg-lotto.com/4d-lottery-results/past_results.php?pastyearsresults=2016',
        writePath: '4d-lottery-results/past_results.php-pastyearsresults=2016.htm'
    }
];

var arrayPage2 = require('webpage').create();

function processPageArray2 () {
    if (urls2.length == 0) {
        console.log('********************深度为2抓取完成**********************');
        return;
    } else{
        var item    = urls2.pop();
        arrayPage2 = require('webpage').create();
        
        arrayPage2.open(item.url, function () {
            arrayPage2.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = arrayPage2.evaluate(function() {
                    $('.a52').parents('.a5').hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');

                    if ($('.a47').length === 2) {
                        $($('.a47')[1]).hide();         
                    } else {
                        $('.a47').hide();       
                    }
                            
                    $('table.a5stat').hide();

                    /*
                    ** 保留 PAST RESULTS
                    */
                    $('table.a45 .hordraws').hide();

                    $('table.a45').find('.center').hide();
                    $($('table.a45')[1]).hide();

                    /*
                    ** 只保留06年和07年的数据
                    */
                    $('.minimal:gt(1)').hide();

                    /*
                    ** past result下面的大空白区
                    */
                    $('table.a450').hide();

                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace('http://www.sg-lotto.com/images/keno-results-bg-new-mini.gif', '../images/keno-results-bg-new-mini.gif');
                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../');
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\"/g, 'href="../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');

                temp = temp.replace(/toto-lottery-results\/past_results_list-toto.php.htm\?pastyearsresults=2017/g, 'toto-lottery-results/past_results_list-toto.php-pastyearsresults=2017.htm');
                temp = temp.replace(/toto-lottery-results\/past_results_list-toto.php.htm\?pastyearsresults=2016/g, 'toto-lottery-results/past_results_list-toto.php-pastyearsresults=2016.htm');
                temp = temp.replace(/4d-lottery-results\/past_results.php.htm\?pastyearsresults=2017/g, '4d-lottery-results/past_results.php-pastyearsresults=2017.htm');
                temp = temp.replace(/4d-lottery-results\/past_results.php.htm\?pastyearsresults=2016/g, '4d-lottery-results/past_results.php-pastyearsresults=2016.htm');
                


                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log(item.url + ': succeed');
                    fs.write(dirname + '/' + item.writePath, temp, 'w');
                } catch(e) {
                    console.log(item.url + ': failed: '+ e);
                }

                arrayPage2.release();
                processPageArray2();
            });
        });
    }
}

/*
**  ----------------------Static Pages 3 -------------------
*/
var urls3 = [
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/index.php',
        writePath: 'statistics/toto-lottery-results/index.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-number-all.php',
        writePath: 'statistics/toto-lottery-results/x-number-all.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-jackpot-won.php',
        writePath: 'statistics/toto-lottery-results/x-jackpot-won.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x_search.php',
        writePath: 'statistics/toto-lottery-results/x_search.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-common-pairs_mix.php',
        writePath: 'statistics/toto-lottery-results/x-common-pairs_mix.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-common-pairs.php',
        writePath: 'statistics/toto-lottery-results/x-common-pairs.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-common-triplets.php',
        writePath: 'statistics/toto-lottery-results/x-common-triplets.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-common-quadruplet.php',
        writePath: 'statistics/toto-lottery-results/x-common-quadruplet.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-oddeven.php',
        writePath: 'statistics/toto-lottery-results/x-oddeven.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-sum-of-numbers.php',
        writePath: 'statistics/toto-lottery-results/x-sum-of-numbers.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-skip_and_hit.php',
        writePath: 'statistics/toto-lottery-results/x-skip_and_hit.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-statistics_same_unit.php',
        writePath: 'statistics/toto-lottery-results/x-statistics_same_unit.php.htm'
    },
    {
        url: 'http://www.sg-lotto.com/statistics/toto-lottery-results/x-days.php',
        writePath: 'statistics/toto-lottery-results/x-days.php.htm'
    }
];

var arrayPage3 = require('webpage').create();

function processPageArray3 () {
    if (urls3.length == 0) {
        console.log('********************深度为3抓取完成**********************');
        return;
    } else{
        var item   = urls3.pop();
        arrayPage3 = require('webpage').create();
        arrayPage3.open(item.url, function (status) {
            arrayPage3.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = arrayPage3.evaluate(function() {
                    $($('.a47')[1]).hide();
                    $($('table.a5')[1]).html('');
                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });
  
                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif');
                temp = temp.replace('http://www.sg-lotto.com/images/keno-results-bg-new-mini.gif', '../../images/keno-results-bg-new-mini.gif');
                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="../../');
                temp = temp.replace(/href=\"http:\/\/www\.sg-lotto\.com\//g, 'href="../../');
                temp = temp.replace(/\.php/g, '.php.htm');
                temp = temp.replace(/href=\"\.\.\/\.\.\/\"/g, 'href="../../index.htm"');
                temp = temp.replace(/SWEEP, 4D/g, 'SWEEP, 4D, KENO');
                
                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../../js/header.common.js"></script></body></html>';

                try {
                    console.log(item.url + ': succeed');
                    fs.write(dirname + '/' + item.writePath, temp, 'w');
                } catch(e) {
                    console.log(item.url + ': failed: '+ e);
                }

                arrayPage3.release();
                processPageArray3();
            });
        });
    }
}

function switchUserAgent () {
    var x          = Math.floor((Math.random() * 10));
    var userAgent  = user_agent_list[x];

    indexPage.settings.userAgent      =  userAgent;
    analysisPage.settings.userAgent   =  userAgent;
    totoLastPage.settings.userAgent   =  userAgent;
    totoNextPage.settings.userAgent   =  userAgent;
    fourDLastPage.settings.userAgent  =  userAgent;
    fourDNextPage.settings.userAgent  =  userAgent;
    sweepLastPage.settings.userAgent  =  userAgent;
    sweepNextPage.settings.userAgent  =  userAgent;
}

function process () {
    switchUserAgent();
    index();
    analysis();
    processResultPage();
    processPageArray1();
    processPageArray2();
    processPageArray3();
}

setInterval(function () {
    process();
}, 21600000);

process();