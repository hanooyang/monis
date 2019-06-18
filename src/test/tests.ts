import mockSrv from '../mockManager';
import intConfig from './integer.json';
import boolConfig from './boolean.json';
import stringConfig from './string.json';
import objConfig from './obj.json';

const builders = mockSrv.typeBuilder;

const integerBuilder = builders.getBuilder('integer');
const booleanBuilder = builders.getBuilder('boolean');
const stringBuilder = builders.getBuilder('string');
const objBuilder = builders.getBuilder('object');

const intResult1 = integerBuilder(intConfig.caseOne);
const intResult2 = integerBuilder(intConfig.caseTwo);
const boolResult1 = booleanBuilder(boolConfig.caseOne);
const boolResult2 = booleanBuilder(boolConfig.caseTwo);
const stringResult1 = stringBuilder(stringConfig.caseOne);
const stringResult2 = stringBuilder(stringConfig.caseTwo);
const stringResult3 = stringBuilder(stringConfig.caseThree);
const objectResult = objBuilder(objConfig);

console.log(`Integer mock result is \n\t ${intResult1} \n\t ${intResult2}`);
console.log(`Boolean mock result is \n\t ${boolResult1} \n\t ${boolResult2}`);
console.log(`String mock result is \n\t ${stringResult1} \n\t ${stringResult2} \n\t ${stringResult3} `);
console.log('Object mock reulst is:', objectResult);