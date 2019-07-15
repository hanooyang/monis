const path = require('path');

/**
 * Route Provider
 * provide route for mock service
 */
export class RouteProvider {
    router: any;
    response: any;

    constructor(router: any) {
        this.router = router;
        this.response = new ResponseProvider();
        console.log('route provider init success!');
    }

    public add() { }

    public remove() { }

    public load(config: any) {
        const paths = Object.keys(config);
        paths.forEach(path => {
            const methods = Object.keys(config[path]);
            methods.forEach(method => {
                this.router[method](path, (req, res) => {
                    res.json(
                        this.response.load(config[path][method])
                    );
                });
                console.log(`${method.toUpperCase()}\t${path}`);
            });
        });
    }
};

export class ResponseProvider {
    public load(response: any) {
        // console.log(typeof response);
        switch (typeof response) {
            case 'string':
                // check if the response is a reference 
                const referenceInfo = /^ref#(.*)/.exec(response);
                if (referenceInfo) {
                    const filename = referenceInfo[1];
                    return require(path.resolve(filename));
                }
                return response;
            case 'object':
                return response;
            default:
                return 'OK';
        }
    }
};