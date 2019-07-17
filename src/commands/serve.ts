import express from 'express';
import path from 'path';
import fs from 'fs';

export function serve(options: any) {
    const port = options.port || 3001;
    const configPath = options.config || 'moni.json';

    const router = express.Router();
    const app = express();

    // ANCHOR  load config
    if (!fs.existsSync(path.resolve(configPath))) {
        return console.error(`Cannot find config json at ${configPath}, please make sure you have moni.json in current path or set your config path by --conf`);
    }
    const config = require(path.resolve(configPath));

    // ANCHOR register router
    const routeLoader = require('../loaders/common');
    const routeProvider = new routeLoader.RouteProvider(router);
    routeProvider.load(config);

    app.use(router);
    app.listen(port, function () {
        console.log(`listening on port ${port}`);
    })
}