$(function() {
    var $username = $('#username'),
        $password = $('#password'),
        $submit = $('.btn-login'),
        $errorMessage = $('.text-warning'),
        showErrorMessage = function(message) {
            if (!message) {
                return;
            }
            $errorMessage.text(message).show();
        },
        hideErrorMessage = function() {
            $errorMessage.hide();
        };
    $submit.on('click', function() {
        var uVal = $.trim($username.val()),
            pVal = $.trim($password.val());
        if (uVal === '') {
            showErrorMessage('用户名不能为空');
            $username.focus();
            return;
        }
        if (pVal === '') {
            showErrorMessage('密码不能为空');
            $password.focus();
            return;
        }
        //返回{code:200,message:''}
        $.get('', {
            username: uVal,
            password: pVal
        }).then(function(res) {
            if (res.code == 200) {
                location.href = '';
            } else {
                showErrorMessage(res.message);
                $password.val('');
            }
        }, function() {
            showErrorMessage('请求异常，请重试!');
        });
    });
});
