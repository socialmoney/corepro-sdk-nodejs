/**
 * Created by socialmoneydev on 8/30/2014.
 */

var FileContent = function(){
    var self = this;
    self.content = null;
    self.contentType = null;
    self.contentLength = null;
    // self.getRawContentBytes = function() {
    //     return Buffer.from(self.content, 'base64');
    // }
};

module.exports = FileContent;
