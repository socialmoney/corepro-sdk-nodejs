/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Connection = require('../connection');

var TestBase = function() {};

// common properties
TestBase.timestamp = new Date().toISOString();

TestBase.documentId = null;

TestBase.loggingObject = null;

var testExampleConfig = require('./test-config.json');
TestBase.exampleConn = new Connection().createFromConfig(
  testExampleConfig.coreProApiKey,
  testExampleConfig.coreProApiSecret,
  testExampleConfig.coreProDomainName
);

TestBase.exampleCustomerId = null;

TestBase.exampleAccountId = null;

TestBase.exampleExternalAccountId = null;

TestBase.exampleCustomerBeneficiaryId = null;

TestBase.exampleInternalToExternalTransactionId = null;

TestBase.exampleExternalToInternalTransactionId = null;

module.exports = TestBase;
