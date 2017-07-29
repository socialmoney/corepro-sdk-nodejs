/**
 * Created by socialmoneydev on 7/28/2017.
 */

var Requestor = require("./utils/requestor");
var Account = require("./account");
var CardAccountLink = require("./models/cardaccountlink");

var Card = function() {
    var self = this;

    self.requestId = null;
    self.cardId = null;
    self.customerId = null;
    self.cardHolderCustomerId = null;
    self.typeCode = null;
    self.vendorTypeCode = null;
    self.status = null;
    self.cardNumberMasked = null;
    self.tag = null;
    self.firstName = null;
    self.middleName = null;
    self.lastName = null;
    self.nickName = null;
    self.expireMonth = null;
    self.expireYear = null;
    self.primaryAccountId = null;
    self.lockTypeCode = null;
    self.lockReasonTypeCode = null;
    self.createdDate = null;
    self.requestedDate = null;
    self.verifiedDate = null;
    self.reissuedDate = null;
    self.deniedDate = null;
    self.expiredDate = null;
    self.archivedDate = null;
    self.lastModifiedDate = null;
    self.accounts = null;

    self.reissueReasonTypeCode = null;
    self.birthDate = null; /* used only by /card/verify route */
    self.newPin = null;    /* used only by /card/initiate, /card/reissue, and /card/resetPin routes */

    self.customMerge = function(propertyName, value) {
        var r = new Requestor();
        if (propertyName === 'accounts') {
            self.accounts = [];
            if (value) {
                for (var i = 0; i < value.length; i++) {
                    var item = r.merge(value[i], new Account());
                    self.accounts.push(item);
                }
            }
        }
    };


    self.get = function (customerId, cardId, callback, connection, loggingObject) {
        customerId = customerId || self.customerId;
        cardId = cardId || self.cardId;
        new Requestor().get('/card/get/' + customerId + '/' + cardId, Card, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.getByTag = function (customerId, tag, callback, connection, loggingObject) {
        customerId = customerId || self.customerId;
        tag = tag || self.tag;
        new Requestor().get('/card/getbytag/' + customerId + '/' + encodeURIComponent(tag), Card, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.list = function (customerId, callback, connection, loggingObject) {
        customerId = customerId || self.customerId;
        new Requestor().get('/card/list/' + customerId , Card, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.initiate = function (callback, connection, loggingObject){
        new Requestor().post('/card/initiate', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.verify = function (callback, connection, loggingObject){
        new Requestor().post('/card/verify', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.archive = function (callback, connection, loggingObject){
        new Requestor().post('/card/archive', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.hotlist = function (lockReasonTypeCode, callback, connection, loggingObject){
        self.lockReasonTypeCode = lockReasonTypeCode || self.lockReasonTypeCode;
        new Requestor().post('/card/hotlist', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.lock = function (lockReasonTypeCode, callback, connection, loggingObject){
        self.lockReasonTypeCode = lockReasonTypeCode || self.lockReasonTypeCode;
        new Requestor().post('/card/lock', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.unlock = function (callback, connection, loggingObject){
        new Requestor().post('/card/unlock', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.reissue = function (callback, connection, loggingObject){
        new Requestor().post('/card/reissue', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.resetPin = function (encryptedPin, callback, connection, loggingObject){
        self.newPin = encryptedPin || self.newPin;
        new Requestor().post('/card/resetpin', Card, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.addAccount = function (accountId, cardPriority, callback, connection, loggingObject){
        var cal = new CardAccountLink();
        cal.requestId = self.requestId;
        cal.customerId = self.customerId;
        cal.accountId = accountId;
        cal.cardPriority = cardPriority;
        cal.add(function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.removeAccount = function (accountId, callback, connection, loggingObject){
        var cal = new CardAccountLink();
        cal.requestId = self.requestId;
        cal.customerId = self.customerId;
        cal.accountId = accountId;
        cal.remove(function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.reprioritizeAccount = function (accountId, cardPriority, callback, connection, loggingObject){
        var cal = new CardAccountLink();
        cal.requestId = self.requestId;
        cal.customerId = self.customerId;
        cal.accountId = accountId;
        cal.cardPriority = cardPriority;
        cal.reprioritize(function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };

};


module.exports = Card;