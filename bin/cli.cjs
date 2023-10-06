#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');

function traverseDirectory(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    items.forEach((item) => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            traverseDirectory(itemPath);
        } else {
            console.log('File:', itemPath);
        }
    });
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
    console.log('my cli');
    const argv = fetchArgument();
    console.log(validDirectoryPath(argv[0]));
    const rootPath = argv[0] ? argv[0] : './';
}

module.exports = main();
