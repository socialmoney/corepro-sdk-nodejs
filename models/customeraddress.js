/**
 * Created by socialmoneydev on 8/29/2014.
 */

var CustomerAddress = function() {
    var self = this;
    self.addressType = null;
    self.addressLine1 = null;
    self.addressLine2 = null;
    self.addressLine3 = null;
    self.addressLine4 = null;
    self.city = null;
    self.state = null;
    self.postalCode = null;
    self.country = null;
    self.isActive = null;
};

module.exports = CustomerAddress;