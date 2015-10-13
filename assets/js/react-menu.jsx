var React = require('react');
var ReactDOM = require('react-dom');
var LeafMenu = React.createClass({
    render: function() {
        var leafItem = this.props.leafMenuData;
        return <li>
                <a class={leafItem.active ? 'active' : ''} href={leafItem.href}>
                    <span class={leafItem.iconClass}></span>{leafItem.name}
                </a>
            </li>;
    }
});
var SubMenu = React.createClass({
    render: function() {
        var itemName = '{target: \'#' + this.props.pinyinName + '\'}',
            ulClassName = 'am-list admin-sidebar-sub am-collapse' + (item.active ? ' am-in ' : ''),
            items = [];
        this.props.subItemData.forEach(function(item) {
            items.push(<LeafMenu leafMenuData={item}/>);
        });
        return <li>
                <a class="am-cf" data-am-collapse={itemName}>
                    <span class={item.iconClass}></span>
                    {item.name}
                    <span class="am-icon-angle-right am-fr am-margin-right"></span>
                </a>
                <ul class={ulClassName} id={subcollapseName}>
                    {items}
                </ul>
            </li>;
    }
});
var Menu = React.createClass({
    render: function() {
        var items = [];
        this.props.menuData.forEach(function(item) {
            if (item.children && item.children.length) {
                items.push(<SubMenu subItemData={item.children} itemName={item.pinyinName}></SubMenu>);
            } else {
                items.push(<LeafMenu leafMenuData={item}></LeafMenu>);
            }
        });
        return <ul class="am-list admin-sidebar-list">
            {items}
        </ul>;
    }
});

var menuData = [{
    name: '帐号管理',
    pinyinName: 'zhanghaoguanli',
    href: '#',
    iconClass: 'iconfont icon-zhanghaoleixingguanli',
    active: false,
    children: [{
        name: '使用中帐号',
        active: false,
        href: '账户管理-使用中帐号.html',
        iconClass: 'iconfont icon-qiyonguenable'
    }, {
        name: '停用中帐号',
        active: false,
        href: '账户管理-停用中帐号.html',
        iconClass: 'iconfont icon-tingyong'
    }, {
        name: '模板权限',
        active: false,
        href: '账户管理-模板权限.html',
        iconClass: 'iconfont icon-quanxian'
    }]
}, {
    name: '车辆管理',
    pinyinName: 'cheliangguanli',
    href: '#',
    iconClass: 'iconfont icon-icon14',
    active: false,
    children: [{
        name: '司机管理',
        href: '车辆管理-司机管理-服务中.html',
        iconClass: 'iconfont icon-icon'
    }, {
        name: '车主管理',
        href: '车辆管理-车主管理-服务中.html',
        iconClass: 'iconfont icon-guzhu'
    }, {
        name: '充值记录',
        href: '车辆管理-充值记录.html',
        iconClass: 'iconfont icon-chongzhi'
    }, {
        name: '消费记录',
        href: '车辆管理-消费记录.html',
        iconClass: 'iconfont icon-icon12'
    }, {
        name: '返现/积分设置',
        href: '车辆管理-返现积分设置.html',
        iconClass: 'iconfont icon-iconfonticonfonttianmaoyoujirenzheng2'
    }, {
        name: '活动管理',
        href: '车辆管理-活动管理.html',
        iconClass: 'iconfont icon-flag'
    }, {
        name: '商品管理',
        href: '车辆管理-商品管理.html',
        iconClass: 'iconfont icon-shangpinguanli'
    }, {
        name: '订单管理',
        href: '车辆管理-订单管理.html',
        iconClass: 'iconfont icon-dingdanguanli'
    }, {
        name: '消息推送',
        href: '车辆管理-消息推送.html',
        iconClass: 'iconfont icon-zhengguiicon40'
    }, {
        name: 'APP设置',
        href: '车辆管理-APP设置.html',
        iconClass: 'iconfont icon-app'
    }]
}, {
    name: '异常情况列表',
    pinyinName: 'yichangqingkuang',
    href: '异常情况列表.html',
    iconClass: 'iconfont icon-yichang'
}, {
    name: '资讯管理',
    pinyinName: 'zixunguanli',
    href: '资讯管理.html',
    iconClass: 'iconfont icon-zixun'
}, {
    name: '分享设置',
    pinyinName: 'fenxiangshezhi',
    href: '分享设置.html',
    iconClass: 'iconfont icon-fenxiang'
}, {
    name: '加气站管理',
    pinyinName: 'jiaqizhanguanli',
    href: '#',
    active: false,
    iconClass: 'iconfont icon-jiayouzhan',
    children: [{
        name: '加气站管理',
        href: '加气站管理-加气站管理-服务中.html',
        iconClass: 'iconfont icon-jiayouzhan'
    }, {
        name: '订单管理',
        href: '加气站管理-订单管理-已处理.html',
        iconClass: 'iconfont icon-dingdanguanli'
    }, {
        name: '对账设置',
        href: '加气站管理-对账设置.html',
        iconClass: 'iconfont icon-zhangben'
    }, {
        name: 'APP设置',
        href: '加气站管理-APP设置.html',
        iconClass: 'iconfont icon-app'
    }]
}, {
    name: 'LNG厂管理',
    pinyinName: 'lngchang',
    href: 'LNG厂管理.html',
    active: false,
    iconClass: 'iconfont icon-chang'
}, {
    name: '广告管理',
    pinyinName: 'guanggaoguanli',
    href: '#',
    active: true,
    iconClass: 'iconfont icon-guanggaoguanli',
    children: [{
        name: '广告审核',
        href: '广告管理-广告审核.html',
        iconClass: 'iconfont icon-shenhe'
    }, {
        name: '全站广告',
        href: '广告管理-全站广告.html',
        iconClass: 'iconfont icon-unie677'
    }]
}];
ReactDOM.render(
    <Menu menuData={menuData} />,
    document.getElementById('container')
);
