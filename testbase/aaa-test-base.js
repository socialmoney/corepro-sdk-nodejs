/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Connection = require('../connection');

var TestBase = function() {};

// common properties
TestBase.timestamp = new Date().toISOString();

TestBase.documentId = null;

TestBase.loggingObject = null;


var testExampleConfig = require('./test-example1-config.json');
TestBase.exampleConn = new Connection().createFromConfig(testExampleConfig.apiKey, testExampleConfig.apiSecret);

TestBase.exampleCustomerId = null;

TestBase.exampleAccountId = null;

TestBase.exampleExternalAccountId = null;

TestBase.exampleCustomerBeneficiaryId = null;

TestBase.exampleInternalToExternalTransactionId = null;

TestBase.exampleExternalToInternalTransactionId = null;


// // nacha-specific program
// var testNachaConfig = require('./test-nacha-config.json');
//
// TestBase.nachaConn = new Connection().createFromConfig(testNachaConfig.apiKey, testNachaConfig.apiSecret);
//
// TestBase.nachaCustomerId = null;
//
// TestBase.nachaAccountId = null;
//
// TestBase.nachaExternalAccountId = null;
//
// TestBase.nachaExternalToInternalTransactionId = null;

module.exports = TestBase;
