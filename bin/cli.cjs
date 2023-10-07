#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');

const isJsOrTs = require('../utils/isJsOrTs.cjs');

function traverseDirectory(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    let count = 0;
    items.forEach((item) => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            count += traverseDirectory(itemPath);
        } else {
            console.log('File:', itemPath);
            console.log(isJsOrTs(fs.readFileSync(itemPath, 'utf-8')));
            count++;
        }
    });
    return count;
}

function fetchArgument() {
    const argv = yargs.argv;
    return argv._;
}

function validDirectoryPath(path) {
    try {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}

function validFilePath(path) {
    try {
        const stats = fs.statSync(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}

function main() {
    console.log('start my cli...');
    const argv = fetchArgument();
    if (!argv[0]) {
        console.warn('argument is empty or null');
        return;
    }
    if (!validDirectoryPath(argv[0])) {
        console.warn('not valid directory path');
        return;
    }
    const rootPath = argv[0];
    console.log('start scan Directory:', rootPath);
    const totalFileAmount = traverseDirectory(rootPath);
    console.log('scan to', totalFileAmount, 'files');
}

module.exports = main();
