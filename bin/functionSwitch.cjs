const validDirectoryPath = require('../utils/validDirectoryPath.cjs');
const traverseDirectory = require('./traverseDirectory.cjs');

async function functionSwitch(argumentsArr) {
    // Check first argument
    if (!argumentsArr[0]) {
        console.warn('main argument is empty or null');
        return false;
    }
    const mainFunction = argumentsArr[0].toLowerCase();

    switch (mainFunction) {
        case 'clear':
            // Load arguments (directory path)
            const rootPath = argumentsArr[1];

            // Check if argument exists
            if (!rootPath) {
                console.warn('the directory path is empty');
                return;
            }

            // Check if arguments are valid
            if (!validDirectoryPath(rootPath)) {
                console.warn('not valid directory path');
                return;
            }

            // Access all files in this directory
            const totalFileAmount = await traverseDirectory(rootPath);

            console.log('scan to', totalFileAmount, 'files');
            break;
        default:
            console.log(`sorry ${mainFunction} is not legal main function`);
            return false;
    }
    return true;
}

exports.functionSwitch = functionSwitch;
