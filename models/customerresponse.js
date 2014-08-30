/**
 * Created by socialmoneydev on 8/30/2014.
 */
var CustomerMessage = require('./customermessage');
var CustomerQuestion = require('./customerquestion');
var Requestor = require('../utils/requestor');

var CustomerResponse = function(){
    var self = this;
    self.customerId = null;
    self.messages = [];
    self.questions = [];
    self.verificationId = null;
    self.verificationStatus = null;

    self.customMerge = function(propertyName, value){

        if (propertyName == 'messages') {
            self.messages = [];
            if (value != null) {
                var r = new Requestor();
                for (var i = 0; i < value.length; i++) {
                    var item = r.merge(value[i], new CustomerMessage());
                    self.messages.push(item);
                }
            }
        } else if (propertyName == 'questions'){
            self.questions = [];
            if (value != null){
                var r = new Requestor();
                for(var i=0;i<value.length;i++){
                    var item = r.merge(value[i], new CustomerQuestion());
                    self.questions.push(item);
                }
            }
        }  else {
            self[propertyName] = value;
        }
    };
};

module.exports = CustomerResponse;
