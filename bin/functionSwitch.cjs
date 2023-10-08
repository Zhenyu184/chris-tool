const fs = require('fs');
const path = require('path');
const validDirectoryPath = require('../utils/validDirectoryPath.cjs');
const deleteSignature = require('../handler/deleteSignature.cjs');

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
    deleteSignature(itemPath);
    return 0;
}

function functionSwitch(argumentsArr) {
    if (!argumentsArr[0]) {
        console.warn('main argument is empty or null');
        return false;
    }

    const mainFunction = argumentsArr[0].toLowerCase();

    switch (mainFunction) {
        case 'clear':
            const rootPath = argumentsArr[1];
            if (!rootPath) {
                console.warn('not valid directory path');
                return;
            }
            if (!validDirectoryPath(rootPath)) {
                console.warn('not valid directory path');
                return;
            }
            const totalFileAmount = traverseDirectory(rootPath, traverseForEach);
            console.log('scan to', totalFileAmount, 'files');
            break;
        default:
            console.log(`sorry ${mainFunction} is not legal main function`);
            return false;
    }
    return true;
}

exports.functionSwitch = functionSwitch;
