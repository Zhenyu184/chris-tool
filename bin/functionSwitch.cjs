const packageJson = require(`../package.json`);
const validDirectoryPath = require(`../utils/validDirectoryPath.cjs`);
const traverseDirectory = require(`./traverseDirectory.cjs`);
const clearSignature = require(`../handler/clearSignature.cjs`);
const compile2JsFuck = require(`../handler/compile2JsFuck.cjs`);
const compile2JsConstrict = require(`../handler/compile2JsConstrict.cjs`);
const isJsExtension = require(`../utils/isJsOrTs.cjs`);

async function functionSwitch(argumentsArr) {
    // Check first argument
    if (!argumentsArr[0]) {
        console.warn(`main argument is empty or null`);
        return false;
    }
    const mainFunction = argumentsArr[0].toLowerCase();
    switch (mainFunction) {
        case `hi`:
            console.log(`Hi! Chris`);
            return;
        case `say`:
            console.log(`Chris say ${argumentsArr[1]}`);
            return;
        case `V`:
        case `v`:
        case `Version`:
        case `version`:
            console.log(`version ${packageJson.version}`);
            return;
        default:
    }

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
        case `hi`:
            // hello Chris
            console.log(`Hi! Chris`);
            break;
        case `clear`:
            // Access all files in this directory
            clearSignature(traverseResult.pathList, traverseResult.count);
            break;
        case `fuck`:
            // Access all files in this directory
            compile2JsFuck(traverseResult.pathList, traverseResult.count);
            break;
        case `constrict`:
            // Access all files in this directory
            compile2JsConstrict(traverseResult.pathList, traverseResult.count);
            break;
        case `sdr`:
            break;
        default:
            console.log(`sorry ${mainFunction} is not legal main function`);
            return false;
    }
    return true;
}

//exports.functionSwitch = functionSwitch;
module.exports = functionSwitch;
