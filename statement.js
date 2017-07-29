/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var FileContent = require('./models/filecontent');

var Statement = function() {
    var self = this;
    self.requestId = null;
    self.statementId = null;
    self.customerId = null;
    self.type = null;
    self.month = null;
    self.year = null;

    self.get = function(customerId, statementId, callback, connection, loggingObject){
        customerId = customerId || self.customerId;
        statementId = statementId || self.statementId;
        new Requestor().get('/statement/get/' + customerId + '/' + statementId, Statement, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.list = function(customerId, callback, connection, loggingObject){
        customerId = customerId || self.customerId;
        new Requestor().get('/statement/list/' + customerId, Statement, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.download = function(customerId, statementId, callback, connection, loggingObject){
        customerId = customerId || self.customerId;
        statementId = statementId || self.statementId;
        new Requestor().get('/statement/download/' + customerId + '/' + statementId, FileContent, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };
};

module.exports = Statement;