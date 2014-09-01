/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var Transaction = function() {
    var self = this;
    self.requestId = null;
    self.transactionCount = null;
    self.customerId = null;
    self.transactionId = null;
    self.tag = null;
    self.createdDate = null;
    self.type = null;
    self.typeCode = null;
    self.status = null;
    self.amount = null;
    self.settledDate = null;
    self.voidedDate = null;
    self.nachaDescription = null;
    self.friendlyDescription = null;
    self.availableDate = null;
    self.returnCode = null;
    self.isCredit = null;

    self.list = function(customerId, accountId, status, beginDate, endDate, pageNumber, pageSize, callback, connection, loggingObject){
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

        if (finish != '' && start == ''){
            start = '1900-01-01';
        }

        new Requestor().get('/transaction/list/' + self.customerId + '/' + self.accountId + '/' + encodeURIComponent(self.status + '') + '/' + start + '/' + finish + '?pageNumber=' + (pageNumber || '0') + '&pageSize=' + (pageSize || '50'), Transaction, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };


};

module.exports = Transaction;