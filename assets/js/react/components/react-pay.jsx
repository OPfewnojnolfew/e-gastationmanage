var payActions = require('../actions/payActions');
var PaySearchBar = React.createClass({
    handleClick: function() {
        payActions.getPays();
    },
    render: function() {
        return (
            <form onsubmit="return false;">
                <input type="text"/>
                <a href="javascript:void(0)" onClick={this.handleClick}>查询</a>
            </form>
        );
    }
});
var PayTable = React.createClass({
    render: function() {
        return (
            <table>
            <thead>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
            </table>
        );
    }
});
var PayFilterTable = React.createClass({
    getInitialState: function() {
        return {
            search: {
                pageIndex: 0,
                username: '',
                branch: '',
                model: '',
                paytime: ''
            }
        };
    },
    render: function() {
        return (
            <div>
            <PaySearchBar /> 
            <PayTable />
            </div>
        );
    }
});
