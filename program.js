/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var Account = require('./account');
var ExternalAccount = require('./externalaccount');
var ProgramInterestRate = require('./models/programinterestrate');
var ProgramLimit = require('./models/programlimit');
var ProgramChecking = require('./models/programchecking');
var ProgramPrepaid = require('./models/programprepaid');
var ProgramSavings = require('./models/programsavings');

var Program = function() {
    var self = this;
    // Exists in docs
    self.requestId = null;
    self.decimalCount = null;
    self.filledDate = null;
    self.isInterestEnabled = null;
    self.isInternalToInternalTransferEnabled = null;
    self.isRecurringContributionEnabled = null;
    self.name = null;
    self.perProgramDailyDepositLimit = null;
    self.perProgramDailyWithdrawLimit = null;
    self.perTransactionDepositLimit = null;
    self.perTransactionWithdrawLimit = null;
    self.perUserDailyDepositLimit = null;
    self.perUserDailyWithdrawLimit = null;
    self.perUserMonthlyDepositLimit = null;
    self.perUserMonthlyWithdrawLimit = null;
    self.regDFeeAmount = null;
    self.regDMonthlyTransactionWithdrawCountMax = null;
    self.timeZone = null;
    self.verificationType = null;
    self.website = null;
    self.accounts = null;
    self.externalAccounts = null;
    self.products = null;
    self.checkingProducts = null; // deprecated
    self.prepaidProducts = null; // deprecated
    self.savingsProducts = null; // deprecated
    self.publicKeyAlgorithms = null;

    // Exists only in response
    self.bank = null;
    self.isDebitRewardsEnabled = null;
    self.perUserExternalAccountCountMax = null;
    self.perUserAccountCountMax = null;
    self.perUserTotalAccountBalanceMax = null;
    self.validAccountTypes = null;
    self.validProductTypes = null;

    self.customMerge = function(propertyName, value){
        var r = new Requestor();
        if (propertyName === 'interestRates') {
            self.interestRates = [];
            if (value) {
                for (var i = 0; i < value.length; i++) {
                    self.interestRates.push(r.merge(value[i], new ProgramInterestRate()));
                }
            }
        } else if (propertyName === 'perUserDailyWithdrawLimit') {
            self.perUserDailyWithdrawLimit = new ProgramLimit();
            self.perUserDailyWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perUserDailyWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName === 'perUserMonthlyWithdrawLimit') {
            self.perUserMonthlyWithdrawLimit = new ProgramLimit();
            self.perUserMonthlyWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perUserMonthlyWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName === 'perProgramDailyWithdrawLimit') {
            self.perProgramDailyWithdrawLimit = new ProgramLimit();
            self.perProgramDailyWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perProgramDailyWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName === 'perUserDailyDepositLimit') {
            self.perUserDailyDepositLimit = new ProgramLimit();
            self.perUserDailyDepositLimit.minimumAmount = value.minimumAmount;
            self.perUserDailyDepositLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName === 'perUserMonthlyDepositLimit') {
            self.perUserMonthlyDepositLimit = new ProgramLimit();
            self.perUserMonthlyDepositLimit.minimumAmount = value.minimumAmount;
            self.perUserMonthlyDepositLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName === 'perProgramDailyDepositLimit') {
            self.perProgramDailyDepositLimit = new ProgramLimit();
            self.perProgramDailyDepositLimit.minimumAmount = value.minimumAmount;
            self.perProgramDailyDepositLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName === 'accounts'){
            self.accounts = [];
            if (value){
                for (var i2 = 0; i2 < value.length; i2++) {
                    self.accounts.push(r.merge(value[i2], new Account()));
                }
            }
        } else if (propertyName === 'externalAccounts'){
            self.externalAccounts = [];
            if (value){
                for (var i3 = 0; i3 < value.length; i3++) {
                    self.externalAccounts.push(r.merge(value[i3], new ExternalAccount()));
                }
            }
        } else if (propertyName === 'checkingProducts'){
            self.checkingProducts = {};
            if (value){
                for (var prop3 in value){
                    if (value.hasOwnProperty(prop3)){
                        self.checkingProducts[prop3] = r.merge(value[prop3], new ProgramChecking());
                    }
                }
            }
        } else if (propertyName === 'prepaidProducts'){
            self.prepaidProducts = {};
            if (value){
                for (var prop5 in value){
                    if (value.hasOwnProperty(prop5)){
                        self.prepaidProducts[prop5] = r.merge(value[prop5], new ProgramPrepaid());
                    }
                }
            }
        } else if (propertyName === 'savingsProducts'){
            self.savingsProducts = {};
            if (value){
                for (var prop6 in value){
                    if (value.hasOwnProperty(prop6)){
                        self.savingsProducts[prop6] = r.merge(value[prop6], new ProgramSavings());
                    }
                }
            }
        } else {
            self[propertyName] = value;
        }
    };


    self.get = function (callback, connection, loggingObject) {
        new Requestor().get('/program/get', Program, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

};

module.exports = Program;
