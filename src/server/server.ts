import express from 'express';
import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';

export function serve(options: any) {
    const port = options.port || 3001;
    const configPath = options.config || 'monis.json';
    const hot = options.hot || false;

    let router = express.Router();
    const app = express();

    // ANCHOR  load config
    if (!fs.existsSync(path.resolve(configPath))) {
        return console.error(`Cannot find config json at ${configPath}, please make sure you have monis.json in current path or set your config path by --conf`);
    }
    const config = require(path.resolve(configPath));

    // ANCHOR register router
    const routeLoader = require('../loaders/common');
    const routeProvider = new routeLoader.RouteProvider(router, hot);
    routeProvider.load(config);

    // SECTION hot reload router when file changed
    if (hot) {
        chokidar.watch(path.resolve('.')).on('change', (filePath: string, stats?: fs.Stats) => {
            console.log(`${filePath} changed`);
            delete require.cache[path.resolve(configPath)];
            const config = require(path.resolve(configPath));
            router = express.Router();
            routeProvider.reload(config, router);
        });
    }

    app.use((req, res, next) => {
        router(req, res, next);
    });
    app.listen(port, function () {
        console.log(`listening on port ${port}`);
    })
}
