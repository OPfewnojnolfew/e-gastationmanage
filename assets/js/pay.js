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
     * 提交充值
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_pay_submit').on('click', function() {
        var $pay = $('.J_pay_input'),
            payNumber = $.trim($pay.val());
        if (payNumber === '') {
            notify.warn('请填写充值金额');
            $pay.focus();
            return;
        }
        $('.J_pay_form').ajaxSubmit({
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
