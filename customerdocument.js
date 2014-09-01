/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var base64 = require('base64');

var CustomerDocument = function(){
    var self = this;
    self.requestId = null;
    self.customerId = null;
    self.documentType = null;
    self.documentName = null;
    self.documentContent = null;
    self.reasonType = null;

    self.upload = function(callback, connection, loggingObject){
        self.documentContent = base64.encode(self.documentContent);
        new Requestor().post('/customerdocument/upload', null, self, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };
};

module.exports = CustomerDocument;