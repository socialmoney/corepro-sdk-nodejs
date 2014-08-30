/**
 * Created by socialmoneydev on 8/30/2014.
 */

var ProgramLimit = function(){
    var self = this;
    self.minimumAmount = null;
    self.maximumAmount = null;

    self.toString = function(){
        return "min: " + self.minimumAmount + ", max: " + self.maximumAmount;
    };
};

module.exports = ProgramLimit;
