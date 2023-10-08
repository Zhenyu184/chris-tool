#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');

const isJsOrTs = require('../utils/isJsOrTs.cjs');
const validDirectoryPath = require('../utils/validDirectoryPath.cjs');
const validFilePath = require('../utils/validFilePath.cjs');
const signature = require('../handler/signature.cjs');

function traverseDirectory(directoryPath, forEachFunction) {
    const items = fs.readdirSync(directoryPath);
    let count = 0;
    items.forEach((item) => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            count += traverseDirectory(itemPath, forEachFunction);
        } else {
            // console.log('File:', itemPath);
            forEachFunction(itemPath);
            count++;
        }
    });
    return count;
}

function traverseForEach(itemPath) {
    signature(itemPath);
    return isJsOrTs(fs.readFileSync(itemPath, 'utf-8'));
}

function fetchArgument() {
    const argv = yargs.argv;
    return argv._;
}

function main() {
    console.log('start my cli');
    const argv = fetchArgument();
    const rootPath = argv[0];

    if (!rootPath) {
        console.warn('argument is empty or null');
        return;
    }

    if (!validDirectoryPath(rootPath)) {
        console.warn('not valid directory path');
        return;
    }

    console.log('start scan Directory:', rootPath);
    const totalFileAmount = traverseDirectory(rootPath, traverseForEach);
    console.log('scan to', totalFileAmount, 'files');
}

module.exports = main();
