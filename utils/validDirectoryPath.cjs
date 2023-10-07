const fs = require('fs');

function validFilePath(path) {
    try {
        const stats = fs.statSync(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}

module.exports = validFilePath;
