/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');

var CustomerDocument = function(){
    var self = this;
    self.requestId = null;
    self.customerId = null;
    self.documentType = null;
    self.documentName = null;
    self.documentContent = null;
    self.reasonType = null;

    self.upload = function(callback, connection, loggingObject){
        self.documentContent = new Buffer(self.documentContent).toString('base64');
        new Requestor().post('/customerdocument/upload', null, self, function(ex, data){
            callback(ex, data);
        }, connection, loggingObject);
    };
};

module.exports = CustomerDocument;