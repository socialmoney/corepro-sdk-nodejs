/**
 * Created by bweaver on 12/18/2014.
 */
var CorePro = require('../index');
var TestBase = require('../testbase/aaa-test-base');

exports.programGet = function(test) {
    var pgm = CorePro.program();
    pgm.get(function(ex, p) {
        if (ex != null){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
            test.ok(p.prepaidProducts['prepaid'].category == 'Prepaid');
            test.done();
        }
    }, TestBase.prepaidConn, TestBase.loggingObject);
};