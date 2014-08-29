/**
 * Created by socialmoneydev on 8/29/2014.
 */

var util = require('util');
var ApiError = require('./models/apierror');

function CoreProApiException(errorInfo) {
    var self = this;
    self.errors = [];

    if (errorInfo == null) {
        // do nothing
    } else if (util.isArray(errorInfo)){
        self.errors = errorInfo;
    } else if (errorInfo.code != null && errorInfo.message != null){
        self.errors.push(errorInfo);
    } else {
        self.errors.push(new ApiError(-1, errorInfo));
    }

    self.toString = function(){
        s = '';
        for(var i=0;i<self.errors.length;i++){
            s += self.errors[i] + '\n';
        }
        return s;
    }
}

module.exports = CoreProApiException;