#!/usr/bin/env node
const yargs = require('yargs');
const { functionSwitch } = require('./functionSwitch.cjs');

function fetchArgument() {
    const argv = yargs.argv;
    return argv._;
}

function main() {
    console.log('start my cli');
    const argv = fetchArgument();
    return functionSwitch(argv);
}

module.exports = main();
