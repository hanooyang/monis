"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var chokidar_1 = __importDefault(require("chokidar"));
function serve(options) {
    var port = options.port || 3001;
    var configPath = options.config || 'monis.json';
    var hot = options.hot || false;
    var router = express_1.default.Router();
    var app = express_1.default();
    // ANCHOR  load config
    if (!fs_1.default.existsSync(path_1.default.resolve(configPath))) {
        return console.error("Cannot find config json at " + configPath + ", please make sure you have monis.json in current path or set your config path by --conf");
    }
    var config = require(path_1.default.resolve(configPath));
    // ANCHOR register router
    var routeLoader = require('../loaders/common');
    var routeProvider = new routeLoader.RouteProvider(router, hot);
    routeProvider.load(config);
    // SECTION hot reload router when file changed
    if (hot) {
        chokidar_1.default.watch(path_1.default.resolve('.')).on('change', function (filePath, stats) {
            console.log(filePath + " changed");
            delete require.cache[path_1.default.resolve(configPath)];
            var config = require(path_1.default.resolve(configPath));
            router = express_1.default.Router();
            routeProvider.reload(config, router);
        });
    }
    app.use(function (req, res, next) {
        router(req, res, next);
    });
    app.listen(port, function () {
        console.log("listening on port " + port);
    });
}
exports.serve = serve;
//# sourceMappingURL=server.js.map