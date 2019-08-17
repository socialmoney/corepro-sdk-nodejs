/**
 * Created by socialmoneydev on 8/29/2014.
 */

var Account = require('./account');
var BankDocument = require('./bankdocument');
var Connection = require('./connection');
var Customer = require('./customer');
var CustomerBeneficiary = require('./customerbeneficiary');
var CustomerDocument = require('./customerdocument');
var ExternalAccount = require('./externalaccount');
var ExternalAccountDocument = require('./externalaccountdocument');
var Program = require('./program');
var Statement = require('./statement');
var Transaction = require('./transaction');
var Transfer = require('./transfer');

module.exports = {
    account: function() {
        return new Account();
    },
    bankDocument: function() {
        return new BankDocument();
    },
    connection: function() {
        return new Connection();
    },
    customer: function() {
        return new Customer();
    },
    customerBeneficiary: function() {
        return new CustomerBeneficiary();
    },
    customerDocument: function() {
        return new CustomerDocument();
    },
    externalAccount: function() {
        return new ExternalAccount();
    },
    externalAccountDocument: function() {
        return new ExternalAccountDocument();
    },
    program: function() {
        return new Program();
    },
    statement: function() {
        return new Statement();
    },
    transaction: function() {
        return new Transaction();
    },
    transfer: function() {
        return new Transfer();
    }

};
