var CorePro = require('../index');
var TestBase = require('../testbase/aaa-test-base');

exports.accountCreate = function(test){
    var a = CorePro.account();
    a.customerId = TestBase.prepaidCustomerId;
    a.tag = "act#" + TestBase.timestamp;
    a.type = 'Client';
    a.category = 'CategoryA';
    a.subCategory = 'CategoryB';
    a.isCloseable = true;
    a.name = "Account NodeJs " + TestBase.timestamp;
    a.targetAmount = 500;
    a.targetDate = '01/01/2030';
    a.create(function(ex, act) {
        if (ex != null){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
            TestBase.prepaidAccountId = act.accountId;
            test.ok(TestBase.prepaidAccountId > 0);
            test.done();
        }
    }, TestBase.prepaidConn, TestBase.loggingObject);
};

exports.accountGet = function(test){
    CorePro.account().get(TestBase.prepaidCustomerId, TestBase.prepaidAccountId, function(ex, act) {
        act.name = 'nodejs test ' + TestBase.timestamp;
        act.update(function (ex, aid) {
            if (ex != null){
                console.log(ex);
                test.ok(false);
                test.done();
            } else {
                test.equal(act.accountId, aid.accountId);
                test.done();
            }
        }, TestBase.prepaidConn, TestBase.loggingObject);
    }, TestBase.prepaidConn, TestBase.loggingObject);
};

exports.accountList = function(test){
    CorePro.account().list(TestBase.prepaidCustomerId, function(ex, data){
        if (ex != null){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
//                for(var i=0;i<accounts.length;i++){
//                    console.log(accounts[i]);
//                }
            test.equal(data.length, 1);
            test.done();
        }
    }, TestBase.prepaidConn, TestBase.loggingObject);
};