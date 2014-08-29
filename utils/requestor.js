/**
 * Created by socialmoneydev on 8/29/2014.
 */
var http = require('http');
var https = require('https');
//http.globalAgent.options.secureProtocol = 'SSLv3_method'; //TLSv1_method
var Connection = require('../connection');
var CoreProApiException = require('../coreproapiexception');
var ApiError = require('../models/apierror');
var util = require('util');

var Requestor = function() {
    var self = this;

    self.get = function(relativeUrl, cls, callback, connection, loggingObject){

        connection = connection || new Connection().createFromConfig();

        var conn = https;
        var options = {
            host: connection.domainName,
            port: 443,
            path: relativeUrl,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + connection.getAuthHeader(),
                'Accept': '*/*',
                'Host': connection.domainName
            }
        };

        if (connection.proxyServer && connection.proxyPort){
            options.path = 'https://' + options.host + ':' + options.port + options.path;
            options.headers.host = options.host;
            options.host = connection.proxyServer;
            options.port = connection.proxyPort;
            conn = http;
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Ignore 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' authorization error
        }

        var req = conn.request(options, function (res) {
            console.log('status: ' + res.statusCode);
            res.on('data', function (d) {
                var output = null;
                var payload = JSON.parse(d);
                if (util.isArray(payload.data)){
                    output = [];
                    for(var i=0;i<payload.data.length;i++){
                        var obj = new cls();
                        var item = payload.data[i];
                        for (var p in item) {
                            if (obj.hasOwnProperty(p)) {
                                obj[p] = item[p];
                            }
                        }
                        output.push(obj);
                    }
                } else {
                    output = new cls();
                    for (var p2 in payload.data) {
                        if (output.hasOwnProperty(p2)) {
                            output[p2] = payload.data[p2];
                        }
                    }
                }

                if (res.statusCode == 200 || res.statusCode == 201) {
                    // success!
                    console.log(output);
                    callback(output, null);
                } else {
                    // failure.
                    var errorList = [];
                    for (var j = 0;j<payload.errors.length;j++){
                        var e = payload.errors[j];
                        var ae = new ApiError(e.code, e.message);
                        errorList.push(ae);
                    }
                    callback(output, new CoreProApiException(errorList));
                }
            });
        });
        req.on('error', function (e) {
            var ae = new ApiError(e.code, e.message);
            throw new CoreProApiException(ae);
            //console.log('req error: ' + e.message);
        });
        req.end();
    };

};

module.exports = Requestor;
