import * as  apiConfig from './test/openapi.json';

class Mock {
    init() {
        console.log('init mock service');
        this.load();
    }

    load() {
        // loop all service dir to see if x.mock.json exist & load them
        const { paths } = apiConfig;
        console.log(paths);
    }

    registerRoute() {
        // add all API to routes
    }

    mock() {
        // mock the response according to json config
    }
}

type BuilderType = 'object' | 'integer' | 'string' | 'boolean';

type IntegerProp = {
    example?: number;
    expr?: string;
    min?: number;
    max?: number;
};

type StringProp = {
    length?: number;
    expr?: string;
    example?: string;
};

type BooleanProp = {
    default?: boolean;
};

class TypeBuilder {
    getBuilder(type: BuilderType) {
        const builders = {
            object: this.buildObject,
            integer: this.buildInt,
            string: this.buildString,
            boolean: this.buildBool
        };
        return builders[type];
    }

    buildObject(config: any) {
        // build obj value here
        let inputObj = config.hasOwnProperty('properties') ? config.properties : config;
        let outputObj = {};
        Object.keys(inputObj).forEach(key => {
            const value = inputObj[key];
            const result = new TypeBuilder().getBuilder(value.type)(value);
            outputObj = {
                ...outputObj,
                [key]: result
            };
        });
        return outputObj;
    }

    buildInt(config: IntegerProp): number {
        // build integer value here
        const { example, expr, min, max } = config;
        if (example) return example;
        if (max) return parseInt((Math.random() * (max - (min || 0)) + (min || 0)).toString());
        return 0;
    }

    buildString(config: StringProp): string {
        // build string value here
        const { length, expr, example } = config;
        if (example) return example;
        const len = length || 10;
        const $char = 'qwertyuioplkjhgfdsazxcvbnm0123456789';
        let result = '';
        for (let i = 0; i <= len; i++) {
            result += $char.charAt(Math.floor(Math.random() * $char.length));
        }
        return result;
    }

    buildBool(config: BooleanProp): boolean {
        // build boolean value here
        const { default: defaultValue } = config;
        if (defaultValue != null) return defaultValue;
        return !!Math.round(Math.random());
    }
}

export default {
    mock: new Mock(),
    typeBuilder: new TypeBuilder()
};