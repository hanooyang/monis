"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
                var _a = _this.response.load(config[path][method]), body = _a.body, code = _a.code;
                _this.router[method](path, function (req, res) {
                    res.status(code).json(body);
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
                    return {
                        body: require(path.resolve(filename)),
                        code: 200
                    };
                }
                return {
                    body: response,
                    code: 200
                };
            case 'object':
                var resCode = response["@code"], body = __rest(response, ['@code']);
                return {
                    body: body,
                    code: resCode || 200
                };
            default:
                return {
                    body: 'OK',
                    code: 200
                };
        }
    };
    return ResponseProvider;
}());
exports.ResponseProvider = ResponseProvider;
;
//# sourceMappingURL=common.js.map