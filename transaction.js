/**
 * Created by socialmoneydev on 7/28/2017.
 */

var Requestor = require('./utils/requestor');
var util = require('lodash');

var Transaction = function() {
    var self = this;
    self.requestId = null;
    self.transactionCount = null;
    self.customerId = null;
    self.transactionId = null;
    self.masterId = null;
    self.tag = null;
    self.createdDate = null;
    self.type = null;
    self.typeCode = null;
    self.status = null;
    self.amount = null;
    self.settledDate = null;
    self.voidedDate = null;
    self.description = null;
    self.friendlyDescription = null;
    self.availableDate = null;
    self.returnCode = null;
    self.isCredit = null;
    self.feeCode = null;
    self.feeDescription = null;
    self.cardId = null;
    self.subTypeCode = null;
    self.subType = null;
    self.institutionName = null;

    self.list = function(customerId, accountId, status, beginDate, endDate, pageNumber, pageSize, callback, connection, loggingObject){
        customerId = customerId || self.customerId;
        accountId = accountId || self.accountId;
        status = status || self.status;

        var start = '';
        if (util.isDate(beginDate)){
            start = beginDate.toISOString().slice(0,10);
        } else {
            start = beginDate || '';
        }

        var finish = '';
        if (util.isDate(endDate)){
            finish = endDate.toISOString().slice(0,10);
        } else {
            finish = endDate || '';
        }

        if (finish && start === ''){
            start = '1900-01-01';
        }

        new Requestor().get('/transaction/list/' + customerId + '/' + accountId + '/' + encodeURIComponent(status + '') + '/' + start + '/' + finish + '?pageNumber=' + (pageNumber || '0') + '&pageSize=' + (pageSize || '50'), Transaction, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.get = function(customerId, transactionId, callback, connection, loggingObject) {
        customerId = customerId || self.customerId;
        transactionId = transactionId || self.transactionId;
        new Requestor().get('/transaction/get/' + customerId + '/' + transactionId, Transaction, function (ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.getByTag = function(customerId, tag, callback, connection, loggingObject) {
        customerId = customerId || self.customerId;
        tag = tag || self.tag;
        new Requestor().get('/transaction/getbytag/' + customerId + '/' + encodeURIComponent(tag), Transaction, function (ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

};


module.exports = Transaction;
