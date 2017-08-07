var fs         = require('fs');
var dirname    = 'singapore2';
var userAgent  = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

var num    = 3228;

var tPage;
var fPage;
var sPage;

function processHistory1 () {
    if (num == 3123) {
        console.log('********************History页面抓取完成**********************');
        return;
    } else{
        var temp;
        var lastUrl  = 'http://www.sg-lotto.com/singapore-pools-toto-results/lottery/' + num + '.php';
        var lastPath = '/singapore-pools-toto-results/lottery/' + num + '.php.htm';

        tPage = require('webpage').create();
        tPage.settings.userAgent  =  userAgent;
        tPage.open(lastUrl, function (status) {
            tPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                temp = tPage.evaluate(function () {
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
                    console.log(lastPath + ': succeed');
                    fs.write(dirname + lastPath, temp, 'w');
                } catch(e) {
                    console.log(lastPath + ': failed');
                }

                num--;
                tPage.release();
                processHistory1();
            });
        });
    }
}

var num2 = 4050;

function processHistory2 () {
    if (num2 == 3969) {
        console.log('********************History页面抓取完成**********************');
        return;
    } else{
        var lastUrl  = 'http://www.sg-lotto.com/4d-lottery-results/past_results_list-4d.php?draw=' + num2;
        var lastPath = '/4d-lottery-results/past_results_list-4d.php-draw=' + num2 + '.htm';

        fPage  = require('webpage').create();
        fPage.settings.userAgent  =  userAgent;
        fPage.open(lastUrl, function (status) {
            fPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = fPage.evaluate(function () {
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

                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + num2, 'past_results_list-4d.php-draw=' + num2 + '.htm');

                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) - 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) - 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) - 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) - 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) - 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) - 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) + 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) + 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) + 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) + 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) + 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) + 1) + '.htm');
                temp = temp.replace('past_results_list-4d.php.htm?draw=' + (parseInt(num2) + 1), 'past_results_list-4d.php-draw=' + (parseInt(num2) + 1) + '.htm');

                /*
                **  加入公共控制脚本
                */
                var bodyEndPos = temp.indexOf('</body>');
                temp = temp.substring(0, bodyEndPos) +  '<script type="text/javascript" src="../js/header.common.js"></script></body></html>';

                try {
                    console.log(lastPath + ': succeed');
                    fs.write(dirname + lastPath, temp, 'w');
                } catch(e) {
                    console.log(lastPath + ': failed');
                }

                num2--;
                fPage.release();
                processHistory2();
            });
        });
    }
}


var arr = [
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=12/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=12-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=11/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=11-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=10/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=10-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=9/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=09-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=8/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=08-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=7/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=07-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=6/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=06-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=5/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=05-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=4/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=04-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=3/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=03-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=2/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=02-2016.htm'
    },
    {
        url : 'http://www.sg-lotto.com/sweep-lottery-results/past_results_list-sweep.php?draw=1/2016',
        writePath : 'sweep-lottery-results/past_results_list-sweep.php-draw=01-2016.htm'
    }
];

function processHistory3 () {
    if (arr.length == 0) {
        console.log('********************History3页面抓取完成**********************');
        return;
    } else{
        var item  = arr.pop();
        sPage = require('webpage').create();
        
        sPage.open(item.url, function () {
            sPage.includeJs('http://code.jquery.com/jquery-latest.min.js', function () {
                var temp = sPage.evaluate(function() {
                    $('.a52').parents('.a5').hide();
                    $('table.containerarticle').css('display', 'none !important');
                    $('table.containerarticle').html('');
                    $($('.a45')[1]).hide();
                    $('.a47').hide();

                    return '<!DOCTYPE html><html lang="en" >' + document.documentElement.innerHTML + '</html>';
                });

                temp = temp.replace('http://www.sg-lotto.com/images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif', '../images/singapore-pools-toto-results-toto-result-toto-results-4d-results-4d-result-lotto_0001.gif')
                temp = temp.replace(/href=\"http\:\/\/www\.sg\-lotto\.com\/\"/g, 'href="../index.htm"');
                temp = temp.replace('http://www.sg-lotto.com/images/keno-results-bg-new-mini.gif', '../images/keno-results-bg-new-mini.gif');
                //temp = temp.replace(/src=\"http:\/\/www\.sg-lotto\.com\//g, 'src="');
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
                    console.log(item.url + ': succeed');
                    fs.write(dirname + '/' + item.writePath, temp, 'w');
                } catch(e) {
                    console.log(item.url + ': failed: '+ e);
                }

                sPage.release();
                processHistory3();
            });
        });
    }
}

function process() {
    processHistory1();
    processHistory2();
    processHistory3();
}

process();