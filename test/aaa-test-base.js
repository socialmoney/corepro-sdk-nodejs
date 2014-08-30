/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Connection = require('../connection');

var TestBase = function(){

};

// common properties between prepaid and nacha
TestBase.prototype.timestamp = new Date().toLocaleTimeString();

TestBase.prototype.documentId = null;

TestBase.prototype.loggingObject = null;


// prepaid-specific program
var testPrepaidConfig = require('./test-prepaid-config.json');
TestBase.prototype.prepaidConn = new Connection().createFromConfig(testPrepaidConfig.apiKey, testPrepaidConfig.apiSecret);

TestBase.prototype.prepaidCustomerId = null

TestBase.prototype.prepaidAccountId = null

TestBase.prototype.prepaidExternalAccountId = null

TestBase.prototype.prepaidCustomerBeneficiaryId = null

TestBase.prototype.prepaidInternalToExternalTransactionId = null

TestBase.prototype.prepaidExternalToInternalTransactionId = null


// nacha-specific program
var testNachaConfig = require('./test-nacha-config.json');

TestBase.prototype.nachaConn = new Connection().createFromConfig(testNachaConfig.apiKey, testNachaConfig.apiSecret)

TestBase.prototype.nachaCustomerId = null

TestBase.prototype.nachaAccountId = null

TestBase.prototype.nachaExternalAccountId = null

TestBase.prototype.nachaExternalToInternalTransactionId = null


module.exports = TestBase;
