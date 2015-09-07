$(function() {
    var $em = $('.e-countdown em'),
        downSecond = 5;
    var countdown = function() {
        downSecond -= 1;
        if (downSecond > 0) {
            setTimeout(countdown, 1000);
            $em.text(downSecond + '秒');
        } else {
            location.href = $em.attr('data-href');
        }
    };
    $em.length && setTimeout(countdown, 1000);
    /**
     * 提交储值卡ID
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_card_submit').on('click', function() {
        var $card = $('.J_card_input'),
            cardNumber = $.trim($card.val());
        if (cardNumber === '') {
            notify.warn('请填写储值卡ID');
            $card.focus();
            return;
        }
        $('.J_card_form').ajaxSubmit({
            success: function(res) {
                if (res.code == 200) {
                    notify.success('储值卡ID正确');
                    location.href = '';
                } else {
                    notify.warn('失败');
                }
            }
        });
    });
    /**
     * 提交消费
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_consume_submit').on('click', function() {
        var $consumemoney = $('.J_consume_money'),
            consumemoney = $.trim($consumemoney.val()),
            $consumegasweight = $('.J_consume_gasweight'),
            consumegasweight = $.trim($consumegasweight.val());
        if (consumemoney === '') {
            notify.warn('请填写消费金额');
            $consumemoney.focus();
            return;
        }
        if (consumegasweight === '') {
            notify.warn('请填写所需购气');
            $consumegasweight.focus();
            return;
        }
        $('.J_consume_form').ajaxSubmit({
            success: function(res) {
                if (res.code == 200) {
                    notify.success('充值成功');
                    location.href = '';
                } else {
                    notify.warn('充值失败');
                }
            }
        });
    });
});
