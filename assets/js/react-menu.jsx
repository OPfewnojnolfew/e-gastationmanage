var React = require('react');

var Menu = React.createClass({
    render: function() {
        return <ul><li><a></a></li></ul>;
        var menuData = this.props.menuData;
        var i = 0,
            item,
            $ul = $('<ul class="am-list admin-sidebar-list"></ul>'),
            $li,
            $a,
            j,
            subLen,
            subcollapseName,
            subItem,
            $subul,
            $subli,
            len = menuData.length;
        for (; i < len; i++) {
            item = menuData[i];
            if (item.children && (subLen = item.children.length)) {
                $li = $('<li class="admin-parent"></li>');
                subcollapseName = 'collapse-nav-' + i;
                $a = $('<a class="am-cf" data-am-collapse="{target: \'#' + subcollapseName + '\'}"><span class="' + item.iconClass + '"></span> ' + item.name + ' <span class="am-icon-angle-right am-fr am-margin-right"></span></a>');
                $subul = $('<ul class="am-list admin-sidebar-sub am-collapse' + (item.active ? ' am-in ' : '') + '" id="' + subcollapseName + '">');
                for (j = 0; j < item.children.length; j++) {
                    subItem = item.children[j];
                    $subli = $('<li><a class="' + (subItem.active ? 'active' : '') + '" href="' + subItem.href + '"><span class="' + subItem.iconClass + '"></span> ' + subItem.name + '</a></li>');
                    $subul.append($subli);
                }
                $li.append($a).append($subul);
            } else {
                $li = $('<li><a href="' + item.href + '"><span class="' + item.iconClass + '"></span> ' + item.name + '</a></li>');
            }
            $ul.append($li);
        }
    }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
