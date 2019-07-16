"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var router = express_1.default.Router();
var app = express_1.default();
// ANCHOR  load config
var config = require(path_1.default.resolve('src/test/moko.json'));
// ANCHOR register router
var routeLoader = require('../loaders/common');
var routeProvider = new routeLoader.RouteProvider(router);
routeProvider.load(config);
app.use(router);
// app.listen(3001, function () {
//     console.log('listening on port 3001');
// });
exports.default = app;
//# sourceMappingURL=server.js.map