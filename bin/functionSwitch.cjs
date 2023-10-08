const validDirectoryPath = require('../utils/validDirectoryPath.cjs');
const { traverseDirectory, traverseForEach } = require('./cli.cjs');

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
