/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MicroEvent = require('../lib/microevent');
var payConstants = require('../constants/payConstants');
var $ = require('jquery');
var CHANGE_EVENT = 'change';

var getPays = function(param) {
    return $.get('', param);
};
var payStore = MicroEvent.mixin({
    getPays: function() {

    },
    triggerChange: function() {
        this.trigger(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.bind(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.unbind(CHANGE_EVENT, callback);
    }
});
// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case payConstants.PAY_GET:
            getPays.then(function() {
                payStore.triggerChange();
            });
            break;
        default:
    }
});

module.exports = payStore;
