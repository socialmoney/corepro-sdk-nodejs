/**
 * Created by socialmoneydev on 8/30/2014.
 */


var Requestor = require("./utils/requestor");
var CustomerPhone = require("./models/customerphone");
var CustomerAddress = require("./models/customeraddress");
var Account = require("./account");
var ExternalAccount = require("./externalaccount");
var CustomerIdOnly = require("./models/customeridonly");

var Customer = function() {
    var self = this;

    self.requestId = null;
    self.customerCount = null;
    self.customerId = null;
    self.firstName = null;
    self.middleName = null;
    self.lastName = null;
    self.birthDate = null;
    self.gender = null;
    self.culture = null;
    self.tag = null;
    self.status = null;
    self.createdDate = null;
    self.taxId = null;
    self.driversLicenseNumber = null;
    self.driversLicenseState = null;
    self.driversLicenseExpirationDate = null;
    self.passportNumber = null;
    self.passportCountry = null;
    self.emailAddress = null;
    self.isActive = null;
    self.isLocked = null;
    self.lockedDate = null;
    self.lockedReason = null;
    self.deceasedDate = null;
    self.isSubjectToBackupWithholding = null;
    self.isOptedInToBankCommunication = null;
    self.isDocumentsAccepted = null;
    self.phones = [];
    self.addresses = [];
    self.accounts = [];
    self.externalAccounts = [];

    self.customMerge = function(propertyName, value){
        var r = new Requestor();
        if (propertyName == 'phones') {
            self.phones = [];
            if (value != null){
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new CustomerPhone());
                    self.phones.push(item);
                }
            }
        } else if (propertyName == 'addresses'){
            self.addresses = [];
            if (value != null){
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new CustomerAddress());
                    self.addresses.push(item);
                }
            }
        } else if (propertyName == 'accounts'){
            self.accounts = [];
            if (value != null){
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new Account());
                    self.accounts.push(item);
                }
            }
        } else if (propertyName == 'externalAccounts'){
            self.externalAccounts = [];
            if (value != null){
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new ExternalAccount());
                    self.externalAccounts.push(item);
                }
            }
        } else {
            self[propertyName] = value;
        }


    }

    self.get = function (customerId, callback, connection, loggingObject) {
        new Requestor().get('/customer/get/' + customerId , Customer, function(data, err) {
            callback(data, err);
        }, connection, loggingObject);
    };

    self.getByTag = function (customerId, tag, callback, connection, loggingObject) {
        new Requestor().get('/customer/getbytag/' + encodeURIComponent(tag), Customer, function(data, err) {
            callback(data, err);
        }, connection, loggingObject);
    };

    self.list = function (customerId, callback, connection, loggingObject) {
        new Requestor().get('/customer/list', Customer, function(data, err) {
            callback(data, err);
        }, connection, loggingObject);
    };

    self.create = function (callback, connection, loggingObject){
        new Requestor().post('/customer/create', CustomerIdOnly, self, function(data, err) {
            callback(data.customerId, err);
        }, connection, loggingObject);
    };

    self.update = function (callback, connection, loggingObject){
        new Requestor().post('/customer/update', CustomerIdOnly, self, function(data, err) {
            callback(data.customerId, err);
        }, connection, loggingObject);
    };
    
};

module.exports = Customer;