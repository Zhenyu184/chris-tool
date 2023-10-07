#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');

const isJsOrTs = require('../utils/isJsOrTs.cjs');
const validDirectoryPath = require('../utils/validDirectoryPath.cjs');
const validDirectoryPath = require('../utils/validFilePath.cjs');

function traverseDirectory(directoryPath, forEachFunction) {
    const items = fs.readdirSync(directoryPath);
    let count = 0;
    items.forEach((item) => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            count += traverseDirectory(itemPath, forEachFunction);
        } else {
            console.log('File:', itemPath);
            console.log(forEachFunction(itemPath));
            count++;
        }
    });
    return count;
}

function traverseForEach(itemPath) {
    return isJsOrTs(fs.readFileSync(itemPath, 'utf-8'));
}

function fetchArgument() {
    const argv = yargs.argv;
    return argv._;
}

function main() {
    console.log('start my cli...');
    const argv = fetchArgument();
    if (!argv[0]) {
        console.warn('argument is empty or null');
        return;
    }
    console.log(validDirectoryPath(argv[0]));
    if (!validDirectoryPath(argv[0])) {
        console.warn('not valid directory path');
        return;
    }
    const rootPath = argv[0];
    console.log('start scan Directory:', rootPath);
    const totalFileAmount = traverseDirectory(rootPath, traverseForEach);
    console.log('scan to', totalFileAmount, 'files');
}

module.exports = main();
