/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Connection = require('../connection');

var TestBase = function() {
};
// common properties between prepaid and nacha
TestBase.timestamp = new Date().toISOString();

TestBase.documentId = null;

TestBase.loggingObject = null;


// prepaid-specific program
var testPrepaidConfig = require('./test-prepaid-config.json');
TestBase.prepaidConn = new Connection().createFromConfig(testPrepaidConfig.apiKey, testPrepaidConfig.apiSecret);

TestBase.prepaidCustomerId = null;

TestBase.prepaidAccountId = null;

TestBase.prepaidExternalAccountId = null;

TestBase.prepaidCustomerBeneficiaryId = null;

TestBase.prepaidInternalToExternalTransactionId = null;

TestBase.prepaidExternalToInternalTransactionId = null;


// nacha-specific program
var testNachaConfig = require('./test-nacha-config.json');

TestBase.nachaConn = new Connection().createFromConfig(testNachaConfig.apiKey, testNachaConfig.apiSecret);

TestBase.nachaCustomerId = null;

TestBase.nachaAccountId = null;

TestBase.nachaExternalAccountId = null;

TestBase.nachaExternalToInternalTransactionId = null;

module.exports = TestBase;
