#!/usr/bin/env node
const yargs = require('yargs');
const { functionSwitch } = require('./functionSwitch.cjs');

// Fetch arguments
function fetchArgument() {
    const argv = yargs.argv;
    return argv._;
}

function main() {
    const argv = fetchArgument();
    return functionSwitch(argv);
}

module.exports = main();
