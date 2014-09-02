/**
 * Created by socialmoneydev on 8/30/2014.
 */
var ExternalAccountIdOnly = require("./externalaccountidonly");

var ExternalAccountVerify = function(){
    var self = this;
    self.customerId = null;
    self.externalAccountId = null;
    self.amount1 = null;
    self.amount2 = null;


    self.verify = function(callback, connection, loggingObject){
        new Requestor().post('/externalaccount/verify', ExternalAccountIdOnly, self, function(ex, data) {
            callback(ex, data);
        }, connection, loggingObject);
    };
};

module.exports = ExternalAccountVerify;
