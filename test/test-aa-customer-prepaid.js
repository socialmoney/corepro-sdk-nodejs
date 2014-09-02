var CorePro = require('../index');
var TestBase = require('../testbase/aaa-test-base');

exports.customerCreate = function(test) {
    var c = CorePro.customer();
    c.birthDate = '01/01/1985';
    c.culture = 'en-US';
    c.firstName = 'Velma';
    c.middleName = 'Alfredo';
    c.lastName = "McTester NodeJs " + TestBase.timestamp;
    c.gender = 'F';
    c.isDocumentsAccepted = true;
    c.isSubjectToBackupWithholding = false;
    c.isOptedInToBankCommunication = false;
    c.tag = "vam" + TestBase.timestamp;
    c.taxId = '012341234';
    c.create(function(ex, cust){
        if (ex != null){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
            TestBase.prepaidCustomerId = cust.customerId;
            console.log(TestBase.prepaidCustomerId);
            console.log(TestBase.timestamp);
            test.notEqual(TestBase.prepaidCustomerId, 0);
            test.done();
        }
    }, TestBase.prepaidConn, TestBase.loggingObject);
};


exports.customerGet = function(test) {
    CorePro.customer().get(TestBase.prepaidCustomerId, function (ex, cust) {
        test.equal(cust.customerId, TestBase.prepaidCustomerId);
        test.done();
    }, TestBase.prepaidConn, TestBase.loggingObject);
};

exports.customerGetByTag = function(test) {
    CorePro.customer().getByTag('vam' + TestBase.timestamp, function (ex, cust) {
        test.equal(cust.customerId, TestBase.prepaidCustomerId);
        test.done();
    }, TestBase.prepaidConn, TestBase.loggingObject);
};

exports.customerList = function(test){
    CorePro.customer().list(function (ex, cust) {
        test.ok(cust[0].customerCount > 0);
        test.done();
    }, TestBase.prepaidConn, TestBase.loggingObject);
};