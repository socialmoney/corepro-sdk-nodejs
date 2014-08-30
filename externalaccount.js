/**
 * Created by socialmoneydev on 8/30/2014.
 */
var ExternalAccount = function(){
    var self = this;
    self.requestId = null;
    self.externalAccountId = null;
    self.customerId = null;
    self.tag = null;
    self.routingNumber = null;
    self.accountNumber = null;
    self.type= null;
    self.nickName = null;
    self.status = null;
    self.nocCode = null;
    self.isActive = null;
    self.isLocked = null;
    self.lockedDate = null;
    self.lockedReason = null;
};
module.exports = ExternalAccount;