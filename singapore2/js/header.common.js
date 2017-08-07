var lotteryGameUl = $($('#nav .subs')[0]).children('ul');
var resultUl      = $($('#nav .subs')[1]).children('ul');

var lgToto  = $(lotteryGameUl.children('li')[0]).children('a');
var lg4D    = $(lotteryGameUl.children('li')[1]).children('a');
var lgSweep = $(lotteryGameUl.children('li')[2]).children('a');

var lgTotoTemp  = lgToto.text();
var lg4DTemp    = lg4D.text();
var lgSweepTemp = lgSweep.text();

var pos1 = lgTotoTemp.indexOf('(Draw:');
var pos2 = lg4DTemp.indexOf('(Draw:');
var pos3 = lgSweepTemp.indexOf('(Draw:');

lgToto.text(lgTotoTemp.substring(0, pos1));
lg4D.text(lg4DTemp.substring(0, pos2));
lgSweep.text(lgSweepTemp.substring(0, pos3));


$('<li><a href="../../keno-lottery-results/index.php.htm">KENO Lottery</a></li>').insertAfter(lgSweep);
$('<li class="keno-path"><a href="../../keno-lottery-results/index.php.htm">KENO Lottery</a></li>').insertBefore(resultUl.find('li:last-child'));

$('meta').remove();
/*
**  footer 链接点击无效
*/
$($('table.a5')[1]).hide();
$('table.a5').css('pointer-events', 'none');
$($('table.a51 tr:first-child a')[0]).css('pointer-events', 'auto');
$($('table.a51 tr:first-child a')[1]).css('pointer-events', 'auto');


if (window.location.href.indexOf('statistics') == -1) {
	$('.a47').hide();
} else {
	$('table.a47').css('pointer-events', 'none');
}


$('input[type="submit"]').parent('form').css('pointer-events', 'none !important');
$('input[type="submit"]').attr('disabled', 'disabled');

/*
**  Static文件的a的背景色
*/
$('table.a45stat td a').css({
	'background-color': '#3987C2',
	'color': '#FFF'
})

/*
** 三排广告去掉两排
*/
$('.GoogleAf #ac_222836').remove();
$('.GoogleAf #ac_222836').remove();

$('table.a4article').css('pointer-events', 'none');
var arr = $('table.a4article');


for (var i = 0; i < arr.length; i++) {
	if ($(arr[i]).find('ins.adsbygoogle').length > 0) {
		$(arr[i]).hide();
	}
}

$('.allpages').children('strong').hide();  //去掉foxtitle附件的sg-lotto信息

/*
**-------增加首页Keno的文字介绍部分
*/
var temp2 = '<p class="rightp">' +
                '<br><br>' +
                '<strong>SINGAPORE POOLS LOTTO</strong><br>' +
                '<br>KENO，' +
                'Singapore Pools is the sole legal bookmaker and totalisator for association football and motor racing betting.' +
                'Keno is a lottery-type casino game with Lottery roots. Of the casino games, it is one of the easiest to play, ' +
                    'and you can have an active Keno ticket while you eat or gamble elsewhere in the casino. Based on odds,' +
                    ' Keno has a poor payout rate, but the possibility of hitting large prizes on a small bet makes it intriguing.' +
                'In Keno, 20 numbers are drawn per game out of a possible 80, and the more numbers you select on your ticket, ' +
                    'the better your chance of winning. It is really difficult to beat Keno, but a smart player can still walk away on ' +
                    'the winning side.' +
            '</p>';

$($('#box-containerarticle .rightp')[0]).hide();
$('#box-containerarticle').prepend(temp2);

if (window.location.href.indexOf('4d-lottery-results/past_results.php-pastyearsresults=') !== -1) {
	var arr  = $('p.drawlist').parent('a');
	var i;
	var href;
	var newHref;

	for (i = 0; i < arr.length; i++) {
		href    = $(arr[i]).attr('href');
		newHref = href.replace('?', '-').replace('.htm', '') + '.htm';
		$(arr[i]).attr('href', newHref);
	}

	arr = $('#nav .subs a');

	for (i = 0; i < arr.length; i++) {
		href = $(arr[i]).attr('href');

		if (href.indexOf('4d-lottery-results/past_results_list-4d.php.htm?draw=') !== -1) {
			newHref = href.replace('?', '-').replace('.htm', '') + '.htm';
			$(arr[i]).attr('href', newHref);
		}
	}
}

if (window.location.href.indexOf('4d-lottery-results/past_results_list-4d.php-draw=') !== -1) {
	$($('table.a5')[0]).show();
	$($('table.a5')[0]).parent().prev().hide();
}

$('.menuSmall').hide();

var arr  = $('#nav .subs a');

for (i = 0; i < arr.length; i++) {
	href = $(arr[i]).attr('href');

	if (href.indexOf('4d-lottery-results/past_results_list-4d.php.htm?draw=') !== -1) {
		newHref = href.replace('?', '-').replace('.htm', '') + '.htm';
		$(arr[i]).attr('href', newHref);
	}

	if (href.indexOf('sweep-lottery-results/past_results_list-sweep.php-draw=') !== -1) {
		newHref  = href.replace('?', '-').replace('.htm', '') + '.htm';
		var p    = newHref.indexOf('draw=');
		var temp = newHref.substring(p + 5).replace('/','-');
		newHref  = newHref.substring(0, p + 5) + temp;

		$(arr[i]).attr('href', newHref);
	}

	if (href.indexOf('sweep-lottery-results/past_results_list-sweep.php.htm?draw=') !== -1) {
		newHref  = href.replace('?', '-').replace('.htm', '') + '.htm';
		var p    = newHref.indexOf('draw=');
		var temp = newHref.substring(p + 5).replace('/','-');
		newHref  = newHref.substring(0, p + 5) + temp;

		$(arr[i]).attr('href', newHref);
	}
}

var arr2 = $('.foxHeader a, table.style2 a');

for (i = 0; i < arr2.length; i++) {
	href = $(arr2[i]).attr('href');

	if (href.indexOf('4d-lottery-results/past_results_list-4d.php.htm?draw=') !== -1) {
		newHref = href.replace('?', '-').replace('.htm', '') + '.htm';
		$(arr2[i]).attr('href', newHref);
	}

	if (href.indexOf('sweep-lottery-results/past_results_list-sweep.php-draw=') !== -1) {
		newHref  = href.replace('?', '-').replace('.htm', '') + '.htm';
		var p    = newHref.indexOf('draw=');
		var temp = newHref.substring(p + 5).replace('/','-');
		newHref  = newHref.substring(0, p + 5) + temp;

		$(arr2[i]).attr('href', newHref);
	}

	if (href.indexOf('sweep-lottery-results/past_results_list-sweep.php.htm?draw=') !== -1) {
		newHref  = href.replace('?', '-').replace('.htm', '') + '.htm';
		var p    = newHref.indexOf('draw=');
		var temp = newHref.substring(p + 5).replace('/','-');
		newHref  = newHref.substring(0, p + 5) + temp;

		$(arr2[i]).attr('href', newHref);
	}
}


