const expect = require('chai').expect;

const MockSrv = require('../bin/mockManager');

describe('Unit test for Mock Service', function () {
    describe('Integer Builder', function () {
        const intBuilder = MockSrv.default.typeBuilder.getBuilder('integer');
        // load config
        const { caseOne: configWithExample, caseTwo: configWithRange } = require('../src/test/integer.json');

        // static input with example set in config
        it('static input with example set in config', () => {
            const result = intBuilder(configWithExample);
            expect(result).to.equal(configWithExample.example, 'should return the value in example');
        });

        // random range without example setting
        it('random integer with range setting', () => {
            const result = intBuilder(configWithRange);
            expect(result).to.be.below(configWithRange.max, 'should below the max vaule')
                .and.at.least((configWithRange.min || 0), 'should larger than min value or 0');
        });
    });

    describe('String Builder', function () {
        const stringBuilder = MockSrv.default.typeBuilder.getBuilder('string');

        // load config
        const {
            caseOne: configWithLength,
            caseTwo: configWithExample,
            caseThree: configEmpty
        } = require('../src/test/string.json');

        it('only length set in config', function () {
            const result = stringBuilder(configWithLength);
            expect(result).to.have.lengthOf(configWithLength.length);
        } );

        it('example set in config', function () {
            const result = stringBuilder(configWithExample);
            expect(result).to.equal(configWithExample.example);
        });

        it('empty config', function () {
            const result = stringBuilder(configEmpty);
            expect(result).to.be.a('string').and.have.lengthOf(10);
        });
    });
});