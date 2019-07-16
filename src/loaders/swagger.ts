import mockManager from '../mockManager';

export type ResponseCode = '200' | '400' | '404' | '405';

export type apiResponse = {
    '200': ResponseBody,
    '400'?: ResponseBody,
    '404'?: ResponseBody,
    '405'?: ResponseBody
};

export type ResponseBody = {
    'content': object;
};

/**
 * get paths from swagger config
 * @param config  swagger config object or path
 */
export function load(config: string | object): Array<object> {
    const routes: object[] = [];
    const swaggerConfig = (typeof config === 'string') ? require(config) : config;
    const { paths: pathConfig } = swaggerConfig;
    const pathNames = Object.keys(pathConfig);
    for (let path of pathNames) {
        const methods = Object.keys(pathConfig[path]);
        for (let method of methods) {
            routes.push({
                method,
                path,
                response: pathConfig[path][method]['responses'],
            });
        }
    }
    return routes;
}


export function mockResponse(route: apiResponse) {
    let response;
    const builder = mockManager.typeBuilder.getBuilder('object');

    const availableResCodes: ResponseCode[] = Object.keys(route) as ResponseCode[];
    const resCode: ResponseCode = availableResCodes.indexOf('200') === -1 ? availableResCodes[0] : '200';
    response = builder(route[resCode].content);

    return response;
}