/**
 * Created by socialmoneydev on 9/1/2014.
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

    self.create = function(callback, connection, loggingObject){
        new Requestor().post('/transfer/create', Transfer, self, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };

    self.voidTransaction = function(callback, connection, loggingObject){
        new Requestor().post('/transfer/void', Transfer, self, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };
};

module.exports = Transfer;