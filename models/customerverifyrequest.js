/**
 * Created by socialmoneydev on 8/30/2014.
 */
var Requestor = require('../utils/requestor');
var CustomerAnswer = require('./customeranswer');

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
};

module.exports = CustomerVerifyRequest;
