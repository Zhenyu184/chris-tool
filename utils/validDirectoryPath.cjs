const fs = require('fs');

function validDirectoryPath(path) {
    try {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}

module.exports = validDirectoryPath;
