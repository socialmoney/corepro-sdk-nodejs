/**
 * Created by socialmoneydev on 7/29/2017.
 */

var Requestor = require('../utils/requestor');
var AccountAccess = function() {
    var self = this;

    self.requestId = null;
    self.customerId = null;
    self.accountId = null;
    self.targetCustomerId = null;
    self.accessTypeCode = null;
    self.customerPriority = null;

    self.edit = function(callback, connection, loggingObject){
        new Requestor().post('/account/editAccess', AccountAccess, self, function(ex, aa) {
            callback(ex, aa);
        }, connection, loggingObject);
    };

    self.list = function(callback, connection, loggingObject){
        new Requestor().get('/account/listAccess/' + self.customerId + '/' + self.accountId, AccountAccess, self,
            function(ex, aa) {
                callback(ex, aa);
            }, connection, loggingObject);
    };
};

module.exports = AccountAccess;