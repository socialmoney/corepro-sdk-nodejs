/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var ProgramInterestRate = require('./models/programinterestrate');
var ProgramLimit = require('./models/programlimit');
var ProgramECode = require('./models/programecode');
var ProgramChecking = require('./models/programchecking');
var ProgramPrepaid = require('./models/programprepaid');
var ProgramSavings = require('./models/programsavings');

var Program = function() {
    var self = this;
    self.requestId = null;
    self.name = null;
    self.verificationType = null;
    self.timeZone = null;
    self.perUserDailyWithdrawLimit = null;
    self.perUserMonthlyWithdrawLimit = null;
    self.perProgramDailyWithdrawLimit = null;
    self.perUserDailyDepositLimit = null;
    self.perUserMonthlyDepositLimit = null;
    self.perProgramDailyDepositLimit = null;
    self.website = null;
    self.isInternalToInternalTransferEnabled = null;
    self.decimalCount = null;
    self.isRecurringContributionEnabled = null;
    self.filledDate = null;
    self.perUserExternalAccountCountMax = null;
    self.perUserAccountCountMax = null;
    self.perUserTotalAccountBalanceMax = null;
    self.checkingProducts = null;
    self.eCodeProducts = null;
    self.prepaidProducts = null;
    self.savingsProducts = null;

    self.customMerge = function(propertyName, value){
        var r = new Requestor();
        if (propertyName == 'interestRates') {
            self.interestRates = [];
            if (value != null) {
                for (var i = 0; i < value.length; i++) {
                    var item = r.merge(value[i], new ProgramInterestRate());
                    self.interestRates.push(item);
                }
            }
        } else if (propertyName == 'perUserDailyWithdrawLimit') {
            self.perUserDailyWithdrawLimit = new ProgramLimit();
            self.perUserDailyWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perUserDailyWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perUserMonthlyWithdrawLimit') {
            self.perUserMonthlyWithdrawLimit = new ProgramLimit();
            self.perUserMonthlyWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perUserMonthlyWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perProgramDailyWithdrawLimit') {
            self.perProgramDailyWithdrawLimit = new ProgramLimit();
            self.perProgramDailyWithdrawLimit.minimumAmount = value.minimumAmount;
            self.perProgramDailyWithdrawLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perUserDailyDepositLimit') {
            self.perUserDailyDepositLimit = new ProgramLimit();
            self.perUserDailyDepositLimit.minimumAmount = value.minimumAmount;
            self.perUserDailyDepositLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perUserMonthlyDepositLimit') {
            self.perUserMonthlyDepositLimit = new ProgramLimit();
            self.perUserMonthlyDepositLimit.minimumAmount = value.minimumAmount;
            self.perUserMonthlyDepositLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'perProgramDailyDepositLimit') {
            self.perProgramDailyDepositLimit = new ProgramLimit();
            self.perProgramDailyDepositLimit.minimumAmount = value.minimumAmount;
            self.perProgramDailyDepositLimit.maximumAmount = value.maximumAmount;
        } else if (propertyName == 'checkingProducts'){
            self.checkingProducts = {}
            if (value != null){
                for (var prop in value){
                    if (value.hasOwnProperty(prop)){
                        var item = r.merge(value[prop], new ProgramChecking());
                        self.checkingProducts[prop] = item;
                    }
                }
            }
        } else if (propertyName == 'eCodeProducts'){
            self.eCodeProducts = {}
            if (value != null){
                for (var prop in value){
                    if (value.hasOwnProperty(prop)){
                        var item = r.merge(value[prop], new ProgramECode());
                        self.eCodeProducts[prop] = item;
                    }
                }
            }
        } else if (propertyName == 'prepaidProducts'){
            self.prepaidProducts = {}
            if (value != null){
                for (var prop in value){
                    if (value.hasOwnProperty(prop)){
                        var item = r.merge(value[prop], new ProgramPrepaid());
                        self.prepaidProducts[prop] = item;
                    }
                }
            }
        } else if (propertyName == 'savingsProducts'){
            self.savingsProducts = {}
            if (value != null){
                for (var prop in value){
                    if (value.hasOwnProperty(prop)){
                        var item = r.merge(value[prop], new ProgramSavings());
                        self.savingsProducts[prop] = item;
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