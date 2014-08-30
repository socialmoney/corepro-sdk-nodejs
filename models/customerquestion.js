/**
 * Created by socialmoneydev on 8/30/2014.
 */
var CustomerAnswer = require('./customeranswer');
var Requestor = require('../utils/requestor');

var CustomerQuestion = function(){
    var self = this;
    self.answers = [];
    self.prompt = null;
    self.type = null;

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
        } else {
            self[propertyName] = value;
        }
    }
};

module.exports = CustomerQuestion;