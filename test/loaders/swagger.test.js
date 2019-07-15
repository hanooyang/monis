const expect = require('chai').expect;
const path = require('path');
const swagger = require('../../bin/loaders/swagger');

describe('Swagger Loader', function () {
    describe('Load Config', function () {
        it('load config by config object', function () {
            const config = require('../../src/test/openapi.json');
            const result = swagger.load(config);
            expect(result).to.be.an('array');
        });

        it('load config by config path string', function () {
            const config = path.resolve('src/test/openapi.json');
            const result = swagger.load(config);
            expect(result).to.be.an('array');
        });
    });
});

describe('Get Response', function () {
    const input = {
        "400": {
            "description": "Invalid ID supplied",
            "content": {
                "name": {
                    "type": "string",
                }
            }
        },
        "404": {
            "description": "Pet not found",
            "content": {}
        },
        "405": {
            "description": "Validation exception",
            "content": {}
        }
    };

    describe('mock response', function () {
        const result = swagger.mockResponse(input);
        it('normal response', function () {
            expect(result).to.be.an('object').and.have.key('name');
        });
    });
});