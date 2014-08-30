/**
 * Created by socialmoneydev on 8/29/2014.
 */

var Customer = require('./customer');
var Account = require('./account');
var ExternalAccount = require('./externalaccount');

module.exports = {
    account: function() {
        return new Account();
    },
    customer: function() {
        return new Customer();
    },
    externalAccount: function() {
        return new ExternalAccount();
    }
};
