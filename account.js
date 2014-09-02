/**
 * Created by socialmoneydev on 8/28/2014.
 */

var Requestor = require("./utils/requestor");
var AccountClose = require("./models/accountclose");
var AccountIdOnly = require("./models/accountidonly");

var Account = function() {
    var self = this;

    self.requestId = null;
    self.accountId = null;
    self.customerId = null;
    self.tag = null;
    self.name = null;
    self.accountNumber = null;
    self.accountNumberMasked = null;
    self.routingNumber = null;
    self.status = null;
    self.type = null;
    self.createdDate = null;
    self.closedDate = null;
    self.accountBalance = null;
    self.isPrimary = null;
    self.isCloseable = null;
    self.recurringContributionType = null;
    self.recurringContributionAmount = null;
    self.recurringContributionFromExternalAccountId = null;
    self.recurringContributionStartDate = null;
    self.recurringContributionEndDate = null;
    self.recurringContributionNextDate = null;
    self.targetAmount = null;
    self.targetDate = null;
    self.category = null;
    self.subCategory = null;
    self.miscellaneous = null;

    self.get = function (customerId, accountId, callback, connection, loggingObject) {
        new Requestor().get('/account/get/' + customerId + '/' + accountId, Account, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.getByTag = function (customerId, tag, callback, connection, loggingObject) {
        new Requestor().get('/account/getbytag/' + customerId + '/' + encodeURIComponent(tag), Account, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.list = function (customerId, callback, connection, loggingObject) {
        new Requestor().get('/account/list/' + customerId , Account, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.create = function (callback, connection, loggingObject){
        new Requestor().post('/account/create', AccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.close = function (customerId, accountId, closeToAccountId, transactionTag, callback, connection, loggingObject){
        var ac = new AccountClose();
        ac.customerId = customerId;
        ac.accountId = accountId;
        ac.closeToAccountId = closeToAccountId;
        ac.transactionTag = transactionTag;
        ac.close(callback, connection, loggingObject);
    };

    self.update = function (callback, connection, loggingObject){
        new Requestor().post('/account/update', AccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };
};


module.exports = Account;