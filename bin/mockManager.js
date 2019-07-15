"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apiConfig = __importStar(require("./test/openapi.json"));
var Mock = /** @class */ (function () {
    function Mock() {
    }
    Mock.prototype.init = function () {
        console.log('init mock service');
        this.load();
    };
    Mock.prototype.load = function () {
        // loop all service dir to see if x.mock.json exist & load them
        var paths = apiConfig.paths;
        console.log(paths);
    };
    Mock.prototype.registerRoute = function () {
        // add all API to routes
    };
    Mock.prototype.mock = function () {
        // mock the response according to json config
    };
    return Mock;
}());
var TypeBuilder = /** @class */ (function () {
    function TypeBuilder() {
    }
    TypeBuilder.prototype.getBuilder = function (type) {
        var builders = {
            object: this.buildObject,
            integer: this.buildInt,
            string: this.buildString,
            boolean: this.buildBool
        };
        return builders[type];
    };
    TypeBuilder.prototype.buildObject = function (config) {
        // build obj value here
        var inputObj = config.hasOwnProperty('properties') ? config.properties : config;
        var outputObj = {};
        Object.keys(inputObj).forEach(function (key) {
            var _a;
            var value = inputObj[key];
            var result = new TypeBuilder().getBuilder(value.type)(value);
            outputObj = __assign({}, outputObj, (_a = {}, _a[key] = result, _a));
        });
        return outputObj;
    };
    TypeBuilder.prototype.buildInt = function (config) {
        // build integer value here
        var example = config.example, expr = config.expr, min = config.min, max = config.max;
        if (example)
            return example;
        if (max)
            return parseInt((Math.random() * (max - (min || 0)) + (min || 0)).toString());
        return 0;
    };
    TypeBuilder.prototype.buildString = function (config) {
        // build string value here
        var length = config.length, expr = config.expr, example = config.example;
        if (example)
            return example;
        var len = length || 10;
        var $char = 'qwertyuioplkjhgfdsazxcvbnm0123456789';
        var result = '';
        for (var i = 0; i < len; i++) {
            result += $char.charAt(Math.floor(Math.random() * $char.length));
        }
        return result;
    };
    TypeBuilder.prototype.buildBool = function (config) {
        // build boolean value here
        var defaultValue = config.default;
        if (defaultValue != null)
            return defaultValue;
        return !!Math.round(Math.random());
    };
    return TypeBuilder;
}());
exports.default = {
    mock: new Mock(),
    typeBuilder: new TypeBuilder()
};
//# sourceMappingURL=mockManager.js.map