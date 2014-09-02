/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require("./utils/requestor");
var CustomerBeneficiaryIdOnly = require("./models/customerbeneficiaryidonly");

var CustomerBeneficiary = function() {
    var self = this;

    self.requestId = null;
    self.customerId = null;
    self.customerBeneficiaryId = null;
    self.firstName = null;
    self.lastName = null;
    self.birthDate = null;
    self.taxId = null;
    self.taxIdMasked = null;
    self.isActive = null;

    self.get = function (customerId, customerBeneficiaryId,callback, connection, loggingObject) {
        new Requestor().get('/customerbeneficiary/get/' + customerId + '/' + customerBeneficiaryId, CustomerBeneficiary, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.list = function (customerId, callback, connection, loggingObject) {
        new Requestor().get('/customerbeneficiary/list/' + customerId, CustomerBeneficiary, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.create = function (callback, connection, loggingObject){
        new Requestor().post('/customerbeneficiary/create', CustomerBeneficiaryIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.update = function (callback, connection, loggingObject){
        new Requestor().post('/customerbeneficiary/update', CustomerBeneficiaryIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

    self.deactivate = function (callback, connection, loggingObject){
        new Requestor().post('/customerbeneficiary/deactivate', CustomerBeneficiaryIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };

};

module.exports = CustomerBeneficiary;