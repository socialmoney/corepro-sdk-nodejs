/**
 * Created by bweaver on 12/18/2014.
 */
var CorePro = require('../index');
var TestBase = require('../testbase/aaa-test-base');

exports.programGet = function(test) {
    var pgm = CorePro.program();
    pgm.get(function(ex, p) {
        if (ex){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
            test.ok(p.checkingProducts['checking'].category === 'Checking');
            test.done();
        }
    }, TestBase.exampleConn, TestBase.loggingObject);
};