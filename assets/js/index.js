$(function() {
    Date.prototype.format = function(fmt) {
        var o = {
            'M+': this.getMonth() + 1, //月份 
            'd+': this.getDate(), //日 
            'h+': this.getHours(), //小时 
            'm+': this.getMinutes(), //分 
            's+': this.getSeconds(), //秒 
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度 
            'S': this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    };
    var consumeGrowth = echarts.init($('.J_consumegrowth')[0]),
        payGrowth = echarts.init($('.J_paygrowth')[0]);
    $(window).on('resize', function() {
        consumeGrowth.resize();
        payGrowth.resize();
    });
    var getLineChartsOptions = function(title, name, data) {
        var xD = [],
            yD = [];
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                xD.push(item);
                yD.push(data[item]);
            }
        }
        var option;
        return option = {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xD
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            series: [{
                name: name,
                type: 'line',
                data: yD
            }]
        };
    };

    var _simulationData = function() {
        var now = new Date(),
            randomNum = function(begin, end) {
                begin = Number(begin);
                end = Number(end);
                var r = Math.random();
                if (isNaN(begin) || isNaN(end) || begin > end) {
                    return r;
                }
                return Math.floor(r * (end - begin + 1) + begin);
            },
            result = {};
        result[now.format('yyyy-MM-dd')] = randomNum(10, 10000);
        for (i = 1; i < 30; i++) {
            now.setDate(now.getDate() - 1);
            result[now.format('yyyy-MM-dd')] = randomNum(10, 10000);
        }
        return result;
    };
    consumeGrowth.setOption(getLineChartsOptions('充值趋势', '充值额度', _simulationData()));
    payGrowth.setOption(getLineChartsOptions('消费趋势', '消费额度', _simulationData()));
});
