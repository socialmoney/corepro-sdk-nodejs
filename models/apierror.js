/**
 * Created by socialmoneydev on 8/29/2014.
 */

var ApiError = function(code, message) {
    var self = this;
    self.code = code || null;
    self.message = message || null;

    self.toString = function(){
        return self.code + " : " + self.message;
    }

};

module.exports = ApiError;