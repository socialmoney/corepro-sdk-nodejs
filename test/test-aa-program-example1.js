/**
 * Created by bweaver on 12/18/2014.
 */
var CorePro = require('../index');
var TestBase = require('../testbase/aaa-test-base');

exports.programGet = function(test) {
    var pgm = CorePro.program();
    pgm.get(function(ex, program) {
        if (ex){
            console.log(ex);
            test.ok(false);
            test.done();
        } else {
            // Get productId to be used in TestBase
            for (var key in program.products) {
              TestBase.exampleProductId = program.products[key].productId;
            }
            console.log("Using productId: " + TestBase.exampleProductId)
            test.ok(true);
            test.done();
        }
    }, TestBase.exampleConn, TestBase.loggingObject);
};
