var React = require('react');
var ReactDOM = require('react-dom');
var LeafMenu = React.createClass({
    render: function() {
        var leafItem = this.props.leafMenuData;
        return <li>
                <a className={leafItem.active ? 'active' : ''} href={leafItem.href}>
                    <span className={leafItem.iconClass}></span>{leafItem.name}
                </a>
            </li>;
    }
});
var SubMenu = React.createClass({
    render: function() {
        var subItemData = this.props.subItemData,
            itemName = '{target: \'#' + subItemData.pinyinName + '\'}',
            ulClassName = 'am-list admin-sidebar-sub am-collapse' + (subItemData.active ? ' am-in ' : ''),
            items = [];
        this.props.subItemData.children.forEach(function(item) {
            items.push(<LeafMenu leafMenuData={item}/>);
        });
        return <li>
                <a className="am-cf" data-am-collapse={itemName}>
                    <span className={subItemData.iconClass}></span>
                    {subItemData.name}
                    <span className="am-icon-angle-right am-fr am-margin-right"></span>
                </a>
                <ul className={ulClassName} id={itemName}>
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
                items.push(<SubMenu subItemData={item}></SubMenu>);
            } else {
                items.push(<LeafMenu leafMenuData={item}></LeafMenu>);
            }
        });
        return <ul className="am-list admin-sidebar-list">
            {items}
        </ul>;
    }
});
var menuData = [{
    name: '充值',
    href: '充值.html',
    iconClass: 'iconfont icon-chongzhi',
    active: false
}, {
    name: '消费',
    href: '消费.html',
    iconClass: 'iconfont icon-xiaofei',
    active: false
}, {
    name: '广告管理',
    href: '广告管理.html',
    iconClass: 'iconfont icon-unie677',
    active: false
}];
ReactDOM.render(
    <Menu menuData={menuData} />,
    document.getElementById('menu-container')
);
