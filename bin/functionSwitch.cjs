const validDirectoryPath = require('../utils/validDirectoryPath.cjs');
const traverseDirectory = require('./traverseDirectory.cjs');
const clearSignature = require('../handler/clearSignature.cjs');
const isJsExtension = require('../utils/isJsOrTs.cjs');

async function functionSwitch(argumentsArr) {
    // Check first argument
    if (!argumentsArr[0]) {
        console.warn('main argument is empty or null');
        return false;
    }
    const mainFunction = argumentsArr[0].toLowerCase();
    // Load arguments (directory path)
    const rootPath = argumentsArr[1];

    // Check if argument exists
    if (!rootPath) {
        console.warn(`the directory path is empty`);
        return;
    }

    // Check if arguments are valid
    if (!validDirectoryPath(rootPath)) {
        console.warn(`not valid directory path`);
        return;
    }

    // Access all files in this directory and Scan all files
    console.log(`scanning...`);
    const traverseResult = await traverseDirectory(rootPath, isJsExtension);
    console.log(`scan to ${traverseResult.count} files`);

    switch (mainFunction) {
        case `clear`:
            // Access all files in this directory
            clearSignature(traverseResult.pathList, traverseResult.count);

            break;
        case `fuck`:
            // Access all files in this directory
            clearSignature(traverseResult.pathList, traverseResult.count);
            break;
        case `fuck`:
            break;
        default:
            console.log(`sorry ${mainFunction} is not legal main function`);
            return false;
    }
    return true;
}

//exports.functionSwitch = functionSwitch;
module.exports = functionSwitch();
