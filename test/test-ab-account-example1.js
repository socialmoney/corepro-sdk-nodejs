var CorePro = require('../index');
var TestBase = require('../testbase/aaa-test-base');

exports.accountCreate = function(test){
    var a = CorePro.account();
    a.customerId = TestBase.exampleCustomerId;
    a.tag = "act#" + TestBase.timestamp;
    a.type = 'Checking';
    a.category = 'CategoryA';
    a.subCategory = 'CategoryB';
    a.isCloseable = true;
    a.name = "Account NodeJs " + TestBase.timestamp;
    a.targetAmount = 500;
    a.targetDate = '01/01/2030';
    a.create(function(ex, act) {
        if (ex){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
            console.log('accountId=' + act.accountId);
            TestBase.exampleAccountId = act.accountId;
            test.ok(TestBase.exampleAccountId > 0);
            test.done();
        }
    }, TestBase.exampleConn, TestBase.loggingObject);
};

exports.accountGet = function(test){
    CorePro.account().get(TestBase.exampleCustomerId, TestBase.exampleAccountId, function(ex, act) {
        act.name = 'nodejs test ' + TestBase.timestamp;
        act.update(function (ex, aid) {
            if (ex){
                console.log(ex);
                test.ok(false);
                test.done();
            } else {
                test.equal(act.accountId, aid.accountId);
                test.done();
            }
        }, TestBase.exampleConn, TestBase.loggingObject);
    }, TestBase.exampleConn, TestBase.loggingObject);
};

exports.accountList = function(test){
    CorePro.account().list(TestBase.exampleCustomerId, function(ex, data){
        if (ex){
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
    }, TestBase.exampleConn, TestBase.loggingObject);
};