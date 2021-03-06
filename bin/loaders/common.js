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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var mockjs_1 = require("mockjs");
/**
 * Route Provider
 * provide route for mock service
 */
var RouteProvider = /** @class */ (function () {
    function RouteProvider(router, hot) {
        this.router = router;
        this.response = new ResponseProvider(hot);
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
                    var resConf = config[path][method];
                    var resData = typeof resConf === 'function' ? resConf(req.params, req.query) : resConf;
                    var _a = _this.response.load(resData), body = _a.body, code = _a.code;
                    res.status(code).json(mockjs_1.mock(body));
                });
                console.log(method.toUpperCase() + "\t" + path);
            });
        });
    };
    RouteProvider.prototype.reload = function (config, router) {
        console.log('------------------reloading route info------------------');
        this.router = router;
        this.load(config);
    };
    return RouteProvider;
}());
exports.RouteProvider = RouteProvider;
;
var ResponseProvider = /** @class */ (function () {
    function ResponseProvider(hot) {
        this.hot = hot;
    }
    ResponseProvider.prototype.load = function (response) {
        // console.log(typeof response);
        switch (typeof response) {
            case 'string':
                // check if the response is a reference 
                var referenceInfo = /^ref#(.*)/.exec(response);
                if (referenceInfo) {
                    var filename = referenceInfo[1];
                    if (this.hot) {
                        delete require.cache[path_1.default.resolve(filename)];
                    }
                    return {
                        body: require(path_1.default.resolve(filename)),
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