/**
 * Created by bweaver on 12/18/2014.
 */
var Requestor = require('../utils/requestor');

var ProgramECode = function(){
    var self = this;
    self.category = null;
    self.type = null;
    self.programECodeId = null;
    self.productCode = null;
    self.minimumAmount = null;
    self.maximumAmount = null;
    self.name = null;
    self.imageUrl = null;
    self.isReissueSupported = null;

    self.customMerge = function(propertyName, value) {
        var r = new Requestor();
        if (propertyName == 'name') {
            self.name = value;
        } else if (propertyName == 'imageUrl') {
            self.imageUrl = value;
        } else {
            self[propertyName] = value;
        }
    };

};

module.exports = ProgramECode;
