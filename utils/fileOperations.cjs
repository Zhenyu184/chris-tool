const fs = require('fs');
const path = require('path');

// create
function createFile(filePath = 'createFile.tmp', WriteData = '') {
    try {
        const tempFilePath = path.join(__dirname, filePath);
        fs.writeFileSync(tempFilePath, WriteData, 'utf-8');
        return tempFilePath;
    } catch (err) {
        return null;
    }
}

// read
function readFile(filePath, decode = 'utf-8') {
    try {
        return fs.readFileSync(filePath, decode);
    } catch (err) {
        return null;
    }
}

// delete
function deleteFile(filePath) {
    try {
        fs.unlinkSync(filePath);
        return true;
    } catch (err) {
        return false;
    }
}

exports.createFile = createFile;
exports.readFile = readFile;
exports.deleteFile = deleteFile;
