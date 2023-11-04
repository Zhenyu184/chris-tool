#!/usr/bin/env node
const yargs = require('yargs');
const { functionSwitch } = require('./functionSwitch.cjs');
const chrisGraph = require('../utils/chrisProgress.cjs');

// Fetch arguments
function fetchArgument() {
    const argv = yargs.argv;
    return argv._;
}

function main() {
    const argv = fetchArgument();
    console.log(chrisGraph.graph());

    return functionSwitch(argv);
}

module.exports = main();
