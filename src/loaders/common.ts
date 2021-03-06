import path from 'path';
import { mock } from 'mockjs';

/**
 * Route Provider
 * provide route for mock service
 */
export class RouteProvider {
    router: any;
    response: any;

    constructor(router: any, hot: boolean) {
        this.router = router;
        this.response = new ResponseProvider(hot);
        console.log('route provider init success!');
    }

    public add() { }

    public remove() { }

    public load(config: any) {
        const paths = Object.keys(config);
        paths.forEach(path => {
            const methods = Object.keys(config[path]);
            methods.forEach(method => {
                this.router[method](path, (req: any, res: any) => {
                    const resConf = config[path][method];
                    const resData = typeof resConf === 'function' ? resConf(req.params, req.query) : resConf;
                    const { body, code } = this.response.load(resData);
                    res.status(code).json(mock(body));
                });
                console.log(`${method.toUpperCase()}\t${path}`);
            });
        });
    }

    public reload(config: any, router: any) {
        console.log('------------------reloading route info------------------');
        this.router = router;
        this.load(config);
    }
};

export class ResponseProvider {
    hot: boolean;

    constructor(hot: boolean) {
        this.hot = hot;
    }
    public load(response: any) {
        // console.log(typeof response);
        switch (typeof response) {
            case 'string':
                // check if the response is a reference 
                const referenceInfo = /^ref#(.*)/.exec(response);
                if (referenceInfo) {
                    const filename = referenceInfo[1];
                    if (this.hot) {
                        delete require.cache[path.resolve(filename)];
                    }
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
                const { '@code': resCode, ...body } = response;
                return {
                    body,
                    code: resCode || 200
                };
            default:
                return {
                    body: 'OK',
                    code: 200
                };
        }
    }
};