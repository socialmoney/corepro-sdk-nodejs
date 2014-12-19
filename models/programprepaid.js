/**
 * Created by bweaver on 12/18/2014.
 */
var Requestor = require('../utils/requestor');
var ProgramInterestRate = require('./programinterestrate');
var ProgramLimit = require('./programlimit');

var ProgramPrepaid = function(){
    var self = this;
    self.category = null;
    self.type = null;
    self.balanceLimit = null;
    self.interestRates = null;
    self.isImmediateLoadFromLinkedAccountEnabled = null;
    self.isExternalWithdrawEnabled = null;
    self.isInterestEnabled = null;
    self.isRecurringContributionEnabled = null;
    self.perTransactionDepositLimit = null;
    self.perTransactionWithdrawLimit = null;

    self.customMerge = function(propertyName, value) {
        var r = new Requestor();
        if (propertyName == 'interestRates') {
            self.interestRates = [];
            if (value != null) {
                for (var i = 0; i < value.length; i++) {
                    var item = r.merge(value[i], new ProgramInterestRate());
                    self.interestRates.push(item);
                }
            }
        } else if (propertyName == 'balanceLimit'){
            self.balanceLimit = new ProgramLimit();
            self.balanceLimit.minimumAmount = value.minimumAmount;
            self.balanceLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perTransactionWithdrawLimit') {
            self.perTransactionWithdrawLimit = new ProgramLimit();
            self.perTransactionWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perTransactionWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perTransactionDepositLimit') {
            self.perTransactionDepositLimit = new ProgramLimit();
            self.perTransactionDepositLimit.minimumAmount = value.minimumAmount;
            self.perTransactionDepositLimit.maximumAmount = value.maximumAmount;
        } else {
            self[propertyName] = value;
        }
    };
};

module.exports = ProgramPrepaid;
