"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mockManager_1 = __importDefault(require("../mockManager"));
/**
 * get paths from swagger config
 * @param config  swagger config object or path
 */
function load(config) {
    var routes = [];
    var swaggerConfig = (typeof config === 'string') ? require(config) : config;
    var pathConfig = swaggerConfig.paths;
    var pathNames = Object.keys(pathConfig);
    for (var _i = 0, pathNames_1 = pathNames; _i < pathNames_1.length; _i++) {
        var path = pathNames_1[_i];
        var methods = Object.keys(pathConfig[path]);
        for (var _a = 0, methods_1 = methods; _a < methods_1.length; _a++) {
            var method = methods_1[_a];
            routes.push({
                method: method,
                path: path,
                response: pathConfig[path][method]['responses'],
            });
        }
    }
    return routes;
}
exports.load = load;
function mockResponse(route) {
    var response;
    var builder = mockManager_1.default.typeBuilder.getBuilder('object');
    var availableResCodes = Object.keys(route);
    var resCode = availableResCodes.indexOf('200') === -1 ? availableResCodes[0] : '200';
    response = builder(route[resCode].content);
    return response;
}
exports.mockResponse = mockResponse;
//# sourceMappingURL=swagger.js.map