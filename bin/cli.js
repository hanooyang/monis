#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var serve_1 = require("./commands/serve");
commander_1.default.version('0.1.1', '-v, --version');
commander_1.default
    .command('serve')
    .description('start mock server')
    .option('-p, --port <port>', 'the port for mock server')
    .option('-c, --config <path>', 'configuration path')
    .option('--hot', 'hot reload the router')
    .action(function (options) {
    serve_1.serve(options);
});
commander_1.default.parse(process.argv);
if (process.argv.length === 2)
    commander_1.default.outputHelp();
//# sourceMappingURL=cli.js.map