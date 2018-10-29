#!/usr/bin/env node

'use strict';

const argv = require('yargs')
  .usage('$0 <cmd> [args]')
  .command('trace-requires <script>', 'trace all required files')
  .demandCommand().argv;

const {
  _: [command]
} = argv;

require = require('esm')(module);
require(`../src/commands/${command}`).default(argv);
