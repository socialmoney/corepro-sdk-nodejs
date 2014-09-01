/**
 * Created by socialmoneydev on 9/1/2014.
 */

var Requestor = require('./utils/requestor');
var FileContent = require('./models/filecontent');

var BankDocument = function(){
    var self = this;
    self.requestId = null;
    self.bankId = null;
    self.customerId = null;
    self.documentId = null;
    self.documentType = null;
    self.culture = null;
    self.html = null;
    self.title = null;
    self.downloadUrl = null;
    self.effectiveDate = null;
    self.expireDate = null;

    self.list = function(culture, documentType, callback, connection, loggingObject){
        new Requestor().get('/bankdocument/list/' + encodeURIComponent(self.culture + '') + '/' + encodeURIComponent(self.documentType), BankDocument, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };

    self.download = function(callback, connection, loggingObject){
        new Requestor().get('/bankdocument/download/' + encodeURIComponent(self.culture + '') + '/' + self.documentId, FileContent, function(data, err){
            callback(data, err);
        }, connection, loggingObject);
    };
};

module.exports = BankDocument;