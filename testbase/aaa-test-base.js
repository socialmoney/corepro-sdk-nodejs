/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Connection = require('../connection');

var TestBase = function() {
//    var self = this;
//    self.setUp = function(){
//        return '1';
//    };
//    self.tearDown = function(){
//        return '2';
//    };
};
// common properties between prepaid and nacha
TestBase.timestamp = new Date().toISOString();

TestBase.documentId = {};

TestBase.loggingObject = {};


// prepaid-specific program
var testPrepaidConfig = require('./test-prepaid-config.json');
TestBase.prepaidConn = new Connection().createFromConfig(testPrepaidConfig.apiKey, testPrepaidConfig.apiSecret);

TestBase.prepaidCustomerId = {};

TestBase.prepaidAccountId = {};

TestBase.prepaidExternalAccountId = {};

TestBase.prepaidCustomerBeneficiaryId = {};

TestBase.prepaidInternalToExternalTransactionId = {};

TestBase.prepaidExternalToInternalTransactionId = {};


// nacha-specific program
var testNachaConfig = require('./test-nacha-config.json');

TestBase.nachaConn = new Connection().createFromConfig(testNachaConfig.apiKey, testNachaConfig.apiSecret);

TestBase.nachaCustomerId = {};

TestBase.nachaAccountId = {};

TestBase.nachaExternalAccountId = {};

TestBase.nachaExternalToInternalTransactionId = {};

module.exports = TestBase;
