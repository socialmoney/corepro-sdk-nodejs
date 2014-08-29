/**
 * Created by socialmoneydev on 8/29/2014.
 */

var Account = require('./account');

module.exports = {
    sayHi: function () {
        console.log('hi!');
        return "Hi";
        //return 'Hi ' + new Date().toTimeString();
    },

    account: function() {
        return new Account();
    }
};
