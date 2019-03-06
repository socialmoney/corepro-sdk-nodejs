/**
 * Created by socialmoneydev on 8/28/2014.
 */

var Requestor = require("./utils/requestor");
var AccountClose = require("./models/accountclose");
var AccountAccess = require("./models/accountaccess");
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
    self.isPrimary = null;
    self.isCloseable = null;

    self.createdDate = null;

    self.closedDate = null;
    self.closedAmount = null;
    self.closedTransactionId = null;
    self.closedReason = null;

    self.availableBalance = null;
    self.accountBalance = null;
    self.pendingBalance = null;

    self.regDWithdrawalCount = null;

    self.recurringContributionType = null;
    self.recurringContributionAmount = null;
    self.recurringContributionFromExternalAccountId = null;
    self.recurringContributionStartDate = null;
    self.recurringContributionEndDate = null;
    self.recurringContributionNextDate = null;

    self.targetAmount = null;
    self.targetDate = null;
    self.targetMetDate = null;
    self.targetMetPercent = null;

    self.category = null;
    self.subCategory = null;
    self.miscellaneous = null;

    self.customField1 = null;
    self.customField2 = null;
    self.customField3 = null;
    self.customField4 = null;
    self.customField5 = null;

    self.primaryCustomerId = null;
    self.legalName1 = null;
    self.legalName2 = null;
    self.totalCustomers = null;
    self.accessTypeCode = null;
    self.isJointAccount = null;
    self.isPrimaryCustomer = null;

    self.cardPriority = null;
    self.interestApr = null;
    self.interestApy = null;
    self.tier = null;
    self.tierDescription = null;
    self.tierMinimumAmount = null;
    self.tierMaximumAmount = null;

    self.lastModifiedDate = null;
    self.balanceModifiedDate = null;
    self.externalProgramTag = null;
    self.customerPriority = null;


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
        ac.close(function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.update = function (callback, connection, loggingObject){
        new Requestor().post('/account/update', AccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.editAccess = function (callback, targetCustomerId, accessTypeCode, customerPriority,
                                connection, loggingObject){
        var aa = new AccountAccess();
        aa.requestId = self.requestId;
        aa.accountId = self.accountId;
        aa.customerId = self.customerId;
        aa.targetCustomerId = targetCustomerId;
        aa.accessTypeCode = accessTypeCode;
        aa.customerPriority = customerPriority;
        aa.edit(function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.listAccess = function (callback, connection, loggingObject) {
        var aa = new AccountAccess();
        aa.requestId = self.requestId;
        aa.customerId = self.customerId;
        aa.accountId = self.accountId;
        aa.list(function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };
};


module.exports = Account;
