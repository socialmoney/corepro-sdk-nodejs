/**
 * Created by socialmoneydev on 8/30/2014.
 */


var Requestor = require("./utils/requestor");
var CustomerPhone = require("./models/customerphone");
var CustomerAddress = require("./models/customeraddress");
var Account = require("./account");
var ExternalAccount = require("./externalaccount");
var CustomerIdOnly = require("./models/customeridonly");
var CustomerResponse = require("./models/customerresponse");

var Customer = function() {
    var self = this;

    self.requestId = null;
    self.customerCount = null;
    self.customerId = null;
    self.firstName = null;
    self.middleName = null;
    self.lastName = null;
    self.suffix = null;
    self.birthDate = null;
    self.gender = null;
    self.culture = null;
    self.tag = null;
    self.status = null;
    self.createdDate = null;
    self.taxId = null;
    self.driversLicenseNumber = null;
    self.driversLicenseNumberMasked = null;
    self.driversLicenseState = null;
    self.driversLicenseIssueDate = null;
    self.driversLicenseExpireDate = null;
    self.passportNumber = null;
    self.passportNumberMasked = null;
    self.passportCountry = null;
    self.passportIssueDate = null;
    self.passportExpireDate = null;
    self.emailAddress = null;
    self.isActive = null;
    self.isLocked = null;
    self.lockedDate = null;
    self.lockedReason = null;
    self.deceasedDate = null;
    self.isSubjectToBackupWithholding = null;
    self.isOptedInToBankCommunication = null;
    self.isDocumentsAccepted = null;
    self.customField1 = null;
    self.customField2 = null;
    self.customField3 = null;
    self.customField4 = null;
    self.customField5 = null;
    self.accessTypeCode = null;
    self.lastModifiedDate = null;
    self.lastActivityDate = null;

    self.phones = [];
    self.addresses = [];
    self.accounts = [];
    self.externalAccounts = [];
    self.cards = [];

    self.customMerge = function(propertyName, value){
        var r = new Requestor();
        if (propertyName === 'phones') {
            self.phones = [];
            if (value){
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new CustomerPhone());
                    self.phones.push(item);
                }
            }
        } else if (propertyName === 'addresses'){
            self.addresses = [];
            if (value){
                for(var i2=0;i2<value.length;i2++){
                    var item2 = r.merge(value[i2], new CustomerAddress());
                    self.addresses.push(item2);
                }
            }
        } else if (propertyName === 'accounts'){
            self.accounts = [];
            if (value){
                for(var i3=0;i3<value.length;i3++){
                    var item3 = r.merge(value[i3], new Account());
                    self.accounts.push(item3);
                }
            }
        } else if (propertyName === 'externalAccounts'){
            self.externalAccounts = [];
            if (value){
                for(var i4=0;i4<value.length;i4++){
                    var item4 = r.merge(value[i4], new ExternalAccount());
                    self.externalAccounts.push(item4);
                }
            }
        } else if (propertyName === 'cards'){
            self.externalAccounts = [];
            if (value){
                for(var i5=0;i5<value.length;i5++){
                    var item5 = r.merge(value[i5], new Card());
                    self.cards.push(item5);
                }
            }
        } else {
            self[propertyName] = value;
        }


    };

    self.get = function (customerId, callback, connection, loggingObject) {
        customerId = customerId || self.customerId;
        new Requestor().get('/customer/get/' + customerId , Customer, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.getByEmail = function (emailAddress, callback, connection, loggingObject) {
        emailAddress = emailAddress || self.emailAddress;
        new Requestor().get('/customer/getbyemail/' + encodeURIComponent(emailAddress), Customer, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.getByTag = function (tag, callback, connection, loggingObject) {
        tag = tag || self.tag;
        new Requestor().get('/customer/getbytag/' + encodeURIComponent(tag), Customer, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.list = function (callback, connection, loggingObject) {
        new Requestor().get('/customer/list', Customer, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.create = function (callback, connection, loggingObject){
        new Requestor().post('/customer/create', CustomerIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.update = function (callback, connection, loggingObject){
        new Requestor().post('/customer/update', CustomerIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.archive = function (callback, connection, loggingObject){
        new Requestor().post('/customer/archive', CustomerIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.initiate = function (callback, connection, loggingObject){
        new Requestor().post('/customer/initiate', CustomerResponse, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.verify = function(verificationId, answers, callback, connection, loggingObject){
        var cvr = new CustomerVerifyRequest();
        cvr.verificationId = verificationId;
        cvr.answers = answers;
        cvr.verify(function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.search = function(pageNumber, pageSize, callback, connection, loggingObject){
        new Requestor().post('/customer/search', Customer, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);

    }

};

module.exports = Customer;