const fs = require("fs");
const path = require("path");

function traverseDirectory(directoryPath) {
    const items = fs.readdirSync(directoryPath);

    items.forEach((item) => {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            // If it's a directory, recursively traverse it
            traverseDirectory(itemPath);
        } else {
            // If it's a file, log its path
            console.log("File:", itemPath);
        }
    });
}

module.exports = traverseDirectory;
