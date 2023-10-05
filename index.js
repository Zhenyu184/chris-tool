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

const argv = yargs.argv;
const rootPath = argv._[0] ? argv._[0] : './';

module.exports = traverseDirectory(rootPath.toString());
