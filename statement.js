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

    self.get = function(callback, connection, loggingObject){
        new Requestor().get('/statement/get/' + self.customerId + '/' + self.statementId, Statement, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };

    self.list = function(callback, connection, loggingObject){
        new Requestor().get('/statement/list/' + self.customerId, Statement, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };

    self.download = function(callback, connection, loggingObject){
        new Requestor().get('/statement/download/' + self.customerId + '/' + self.statementId, FileContent, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };
};

module.exports = Statement;