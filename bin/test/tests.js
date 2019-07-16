"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mockManager_1 = __importDefault(require("../mockManager"));
var integer_json_1 = __importDefault(require("./integer.json"));
var boolean_json_1 = __importDefault(require("./boolean.json"));
var string_json_1 = __importDefault(require("./string.json"));
var obj_json_1 = __importDefault(require("./obj.json"));
var builders = mockManager_1.default.typeBuilder;
var integerBuilder = builders.getBuilder('integer');
var booleanBuilder = builders.getBuilder('boolean');
var stringBuilder = builders.getBuilder('string');
var objBuilder = builders.getBuilder('object');
var intResult1 = integerBuilder(integer_json_1.default.caseOne);
var intResult2 = integerBuilder(integer_json_1.default.caseTwo);
var boolResult1 = booleanBuilder(boolean_json_1.default.caseOne);
var boolResult2 = booleanBuilder(boolean_json_1.default.caseTwo);
var stringResult1 = stringBuilder(string_json_1.default.caseOne);
var stringResult2 = stringBuilder(string_json_1.default.caseTwo);
var stringResult3 = stringBuilder(string_json_1.default.caseThree);
var objectResult = objBuilder(obj_json_1.default);
console.log("Integer mock result is \n\t " + intResult1 + " \n\t " + intResult2);
console.log("Boolean mock result is \n\t " + boolResult1 + " \n\t " + boolResult2);
console.log("String mock result is \n\t " + stringResult1 + " \n\t " + stringResult2 + " \n\t " + stringResult3 + " ");
console.log('Object mock reulst is:', objectResult);
//# sourceMappingURL=tests.js.map