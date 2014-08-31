/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Requestor = require('../utils/requestor');
var CustomerAnswer = require('./customeranswer');
var CustomerResponse = require("./customerresponse");

var CustomerVerifyRequest = function(){
    var self = this;
    self.customerId = null;
    self.verificationId = null;
    self.answers = [];

    self.customMerge = function(propertyName, value){
        if (propertyName == 'answers'){
            self.answers = [];
            if (value != null){
                var r = new Requestor();
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new CustomerAnswer());
                    self.answers.push(item);
                }
            }
        }  else {
            self[propertyName] = value;
        }
    };

    self.verify = function(callback, connection, loggingObject){
        new Requestor().post('/customer/verify', CustomerResponse, self, function(data, err) {
            callback(data, err);
        }, connection, loggingObject);
    };
};

module.exports = CustomerVerifyRequest;
