/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var base64 = require('base64');

var ExternalAccountDocument = function(){
    var self = this;
    self.requestId = null;
    self.customerId = null;
    self.externalAccountId = null;
    self.documentType = null;
    self.documentName = null;
    self.documentContent = null;
    self.reasonType = null;

    self.upload = function(callback, connection, loggingObject){
        self.documentContent = base64.encode(self.documentContent);
        new Requestor().post('/externalaccountdocument/upload', null, self, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };
};

module.exports = ExternalAccountDocument;