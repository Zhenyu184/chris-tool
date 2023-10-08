const fs = require('fs');
const path = require('path');
const deleteSignature = require('../handler/deleteSignature.cjs');

function traverseDirectory(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    let count = 0;
    items.forEach((item) => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            count += traverseDirectory(itemPath);
        } else {
            // console.log('File:', itemPath);
            traverseForEach(itemPath);
            count++;
        }
    });
    return count;
}

function traverseForEach(itemPath) {
    deleteSignature(itemPath);
    return 0;
}

module.exports = traverseDirectory;
