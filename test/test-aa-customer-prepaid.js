var CorePro = require('../index');
var TestBase = require('./aaa-test-base');

exports["customer"] = function(test) {
    CorePro.customer().get(2654, function (cust, ex) {
        test.equal(cust.customerId, 2654);
    }, TestBase.prepaidConn, TestBase.loggingObject);

    CorePro.customer().list(2654, function (cust, ex) {
        test.equal(cust[0].customerCount, 107);
        test.done();
    }, TestBase.prepaidConn, TestBase.loggingObject);
};