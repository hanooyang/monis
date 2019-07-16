#!/usr/bin/env node
import fs from 'fs';
import commander from 'commander';

import { serve } from './commands/serve';

commander.version('1.0.0', '-v, --version');

commander
    .command('serve')
    .description('start mock server')
    .option('-p, --port <port>', 'the port for mock server')
    .option('-c, --config <path>', 'configuration path')
    .action(function (options) {
        serve(options);
    });

commander.parse(process.argv);

commander.outputHelp();
