var CorePro = require('../index');

exports['sayHi'] = function(test){
    test.equal(CorePro.sayHi(), "Hi");
    test.done();
};

exports['account'] = function(test){
    CorePro.account().get(2654, 2655, function(act, ex) {
        //console.log((ex || {}).toString());
        if (ex != null){
            test.equal(ex.errors[0].code, 50401);
        } else {
            test.equal(act.accountId, 2655);
        }

        CorePro.account().list(2654, function(accounts, ex){
            if (ex != null){
                test.equal(ex.errors[0].code, 50401);
            } else {
                for(var i=0;i<accounts.length;i++){
                    console.log(accounts[i]);
                }
                test.equal(accounts.length, 1);
            }
            test.done();
        });

    });

};