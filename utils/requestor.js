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

    self.merge = function(src, dest){
        src = src || {};
        dest = dest || {};
        if (dest.customMerge != null){
            for(var p in src){
                if (dest.hasOwnProperty(p)){
                    dest.customMerge(p, src[p]);
                }
            }
        } else {
            for(var p in src){
                if (dest.hasOwnProperty(p)){
                    dest[p] = src[p];
                }
            }
        }
        return dest;
    }

    self.initRequest = function(connection, relativeUrl, method) {
        connection = connection || new Connection().createFromConfig();
        var conn = https;
        var options = {
            host: connection.domainName,
            port: 443,
            path: relativeUrl,
            method: method,
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

        return { conn : conn, options: options};

    };

    self.parseResponse = function(response, classDefs, callback){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function(){
            var output = null;
            var payload = JSON.parse(data);
            var cls = null;
            if (classDefs != null) {
                cls = classDefs['data'] || null;
            }
            if (cls == null){
                output = payload.data;
            } else {
                if (util.isArray(payload.data)){
                    output = [];
                    for(var i=0;i<payload.data.length;i++){
                        var obj = self.merge(payload.data[i], new cls());
                        if (obj.hasOwnProperty('requestId')){
                            obj['requestId'] = payload.requestId;
                        }
                        output.push(obj);
                    }
                } else {
                    output = self.merge(payload.data, new cls());
                    if (output.hasOwnProperty('requestId')){
                        output['requestId'] = payload.requestId;
                    }
                }
            }

            if (response.statusCode == 200 || response.statusCode == 201) {
                // success!
                //console.log(output);
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

    };

    self.get = function(relativeUrl, cls, callback, connection, loggingObject){

        var requestProps = self.initRequest(connection, relativeUrl, 'GET');
        var req = requestProps.conn.request(requestProps.options, function (resp) {
            self.parseResponse(resp, { "data" : cls }, callback);
        });
        req.on('error', function (e) {
            var ae = new ApiError(e.code, e.message);
            callback(null, new CoreProApiException(ae));
        });
        req.end();
    };

    self.post = function(relativeUrl, cls, toPost, callback, connection, loggingObject){
        var requestProps = self.initRequest(connection, relativeUrl, 'POST');
        var req = requestProps.conn.request(requestProps.options, function (resp) {
            self.parseResponse(resp, { "data" : cls }, callback);
        });
        req.on('error', function (e) {
            var ae = new ApiError(e.code, e.message);
            callback(null, new CoreProApiException(ae));
        });
        if (toPost != null){
            var body = JSON.stringify(toPost);
            req.write(body);
        }
        req.end();
    };

};

module.exports = Requestor;
