var appDispatcher = require('../dispatcher/AppDispatcher');
var payConstants = require('../constants/payConstants');
var payActions = {
    getPays: function(params) {
        appDispatcher.dispatch({
            actionType: payConstants.PAY_GET,
            text: params
        });
    }
};

module.exports = payActions;
