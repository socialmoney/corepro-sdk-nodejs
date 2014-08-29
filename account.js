/**
 * Created by socialmoneydev on 8/28/2014.
 */

var Requestor = require("./utils/requestor");

var Account = function() {
    var self = this;

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
        new Requestor().get('/account/get/' + customerId + '/' + accountId, Account, function(data, err) {
            callback(data, err);
        }, connection, loggingObject);
    };

    self.list = function (customerId, callback, connection, loggingObject) {
        new Requestor().get('/account/list/' + customerId , Account, function(data, err) {
            callback(data, err);
        }, connection, loggingObject);
    };
};


module.exports = Account;