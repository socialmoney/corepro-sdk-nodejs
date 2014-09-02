/**
 * Created by socialmoneydev on 8/30/2014.
 */
var ExternalAccountIdOnly = require("./models/externalaccountidonly");
var ExternalAccountVerify = require("./models/externalaccountverify");
var ExternalAccount = function(){
    var self = this;
    self.requestId = null;
    self.externalAccountId = null;
    self.customerId = null;
    self.tag = null;
    self.routingNumber = null;
    self.accountNumber = null;
    self.type= null;
    self.nickName = null;
    self.status = null;
    self.nocCode = null;
    self.isActive = null;
    self.isLocked = null;
    self.lockedDate = null;
    self.lockedReason = null;


    self.get = function (customerId, externalAccountId, callback, connection, loggingObject) {
        new Requestor().get('/externalaccount/get/' + customerId + '/' + externalAccountId, ExternalAccount, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.getByTag = function (customerId, tag, callback, connection, loggingObject) {
        new Requestor().get('/externalaccount/getbytag/' + customerId + '/' + encodeURIComponent(tag), ExternalAccount, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.list = function (customerId, callback, connection, loggingObject) {
        new Requestor().get('/externalaccount/list/' + customerId, ExternalAccount, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.create = function (callback, connection, loggingObject){
        new Requestor().post('/externalaccount/create', ExternalAccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.update = function (callback, connection, loggingObject){
        new Requestor().post('/externalaccount/update', ExternalAccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.deactivate = function (callback, connection, loggingObject){
        new Requestor().post('/externalaccount/deactivate', ExternalAccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.initiate = function (callback, connection, loggingObject){
        new Requestor().post('/externalaccount/initiate', ExternalAccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.verify = function (amount1, amount2, callback, connection, loggingObject){
        var eav = new ExternalAccountVerify();
        eav.customerId = self.customerId;
        eav.externalAccountId = self.externalAccountId;
        eav.amount1 = amount1;
        eav.amount2 = amount2;
        eav.verify(callback, connection, loggingObject);
    };

};
module.exports = ExternalAccount;