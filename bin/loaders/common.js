"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
/**
 * Route Provider
 * provide route for mock service
 */
var RouteProvider = /** @class */ (function () {
    function RouteProvider(router) {
        this.router = router;
        this.response = new ResponseProvider();
        console.log('route provider init success!');
    }
    RouteProvider.prototype.add = function () { };
    RouteProvider.prototype.remove = function () { };
    RouteProvider.prototype.load = function (config) {
        var _this = this;
        var paths = Object.keys(config);
        paths.forEach(function (path) {
            var methods = Object.keys(config[path]);
            methods.forEach(function (method) {
                _this.router[method](path, function (req, res) {
                    res.json(_this.response.load(config[path][method]));
                });
                console.log(method.toUpperCase() + "\t" + path);
            });
        });
    };
    return RouteProvider;
}());
exports.RouteProvider = RouteProvider;
;
var ResponseProvider = /** @class */ (function () {
    function ResponseProvider() {
    }
    ResponseProvider.prototype.load = function (response) {
        // console.log(typeof response);
        switch (typeof response) {
            case 'string':
                // check if the response is a reference 
                var referenceInfo = /^ref#(.*)/.exec(response);
                if (referenceInfo) {
                    var filename = referenceInfo[1];
                    return require(path.resolve(filename));
                }
                return response;
            case 'object':
                return response;
            default:
                return 'OK';
        }
    };
    return ResponseProvider;
}());
exports.ResponseProvider = ResponseProvider;
;
//# sourceMappingURL=common.js.map