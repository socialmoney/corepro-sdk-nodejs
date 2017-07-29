/**
 * Created by socialmoneydev on 7/29/2017.
 */

var Requestor = require('../utils/requestor');
var Card = require('../card');

var CardAccountLink = function() {
    var self = this;

    self.requestId = null;
    self.customerId = null;
    self.cardId = null;
    self.accountId = null;
    self.cardPriority = null;

    self.add = function(callback, connection, loggingObject){
        new Requestor().post('/card/addAccount', Card, self, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.remove = function(callback, connection, loggingObject){
        new Requestor().post('/card/removeAccount', Card, self, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.reprioritize = function(callback, connection, loggingObject){
        new Requestor().post('/card/reprioritize', Card, self, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };
};

module.exports = CardAccountLink;