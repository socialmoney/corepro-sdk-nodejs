/**
 * Created by socialmoneydev on 8/29/2014.
 */

var Requestor = require('../utils/requestor');
var AccountClose = function() {
    var self = this;

    self.customerId = null;
    self.accountId = null;
    self.closeToAccountId = null;
    self.transactionTag = null;
    self.transactionId = null;
    self.closingBalanceAmount = null;
    self.interestPaidAmount = null;
    self.totalClosingAmount = null;
    self.isCloseToExternalAccount = null;

    self.close = function(callback, connection, loggingObject){
        new Requestor().post('/account/close', AccountClose, self, function(ac, err) {
            callback(ac, err);
        }, connection, loggingObject);
    };
};

module.exports = AccountClose;