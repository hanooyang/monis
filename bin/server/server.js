"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function serve(options) {
    var port = options.port || 3001;
    var configPath = options.config || 'monis.json';
    var router = express_1.default.Router();
    var app = express_1.default();
    // ANCHOR  load config
    if (!fs_1.default.existsSync(path_1.default.resolve(configPath))) {
        return console.error("Cannot find config json at " + configPath + ", please make sure you have monis.json in current path or set your config path by --conf");
    }
    var config = require(path_1.default.resolve(configPath));
    // ANCHOR register router
    var routeLoader = require('../loaders/common');
    var routeProvider = new routeLoader.RouteProvider(router);
    routeProvider.load(config);
    app.use(router);
    app.listen(port, function () {
        console.log("listening on port " + port);
    });
}
exports.serve = serve;
//# sourceMappingURL=server.js.map