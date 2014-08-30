var CorePro = require('../index');
var TestBase = require('./aaa-test-base');

exports['account'] = function(test){
    CorePro.account().get(2654, 2655, function(act, ex) {
        test.equal(act.accountId, 2655);

        act.name = 'nodejs test ' + new Date().toTimeString();
        act.update(function(accountId, ex) {

            test.equal(accountId, act.accountId);

            CorePro.account().list(2654, function(accounts, ex){
//                for(var i=0;i<accounts.length;i++){
//                    console.log(accounts[i]);
//                }
                test.equal(accounts.length, 1);
                test.done();
            }, TestBase.prepaidConn, TestBase.loggingObject);

        }, TestBase.prepaidConn, TestBase.loggingObject);


    }, TestBase.prepaidConn, TestBase.loggingObject);

};