var len = $('.new1mini').length;
var kenoDrawItem = $($('.new1mini')[len - 1]);

kenoDrawItem.find('.nextdrawcounter').html('<p class="keno-time" data-countdown="2017-01-04 18:30:00" style="margin:0">Keno的倒计时填在这里</p>');
kenoDrawItem.find('.headerday').text('Keno星期几开');
kenoDrawItem.find('.headerdate').text('Keno几号开');
kenoDrawItem.find('.thedrawbig').text('~~12345~~');
