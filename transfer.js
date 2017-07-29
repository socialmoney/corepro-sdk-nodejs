/**
 * Created by socialmoneydev on 7/28/2017.
 */

var Requestor = require('./utils/requestor');

var Transfer = function() {
    var self = this;
    self.requestId = null;

    self.customerId = null;
    self.fromId = null;
    self.toId = null;
    self.amount = null;
    self.tag = null;
    self.transactionId = null;
    self.description = null;

    self.create = function(callback, connection, loggingObject){
        new Requestor().post('/transfer/create', Transfer, self, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.voidTransaction = function(callback, connection, loggingObject){
        new Requestor().post('/transfer/void', Transfer, self, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };
};

module.exports = Transfer;