const fs = require('fs');
const path = require('path');
const clearSignature = require('../handler/clearSignature.cjs');

// utils
const file = require('../utils/fileOperations.cjs');

async function traverseDirectory(
    directoryPath,
    filterFunc = () => {
        return true;
    }
) {
    const ret = {
        pathList: [],
        count: 0,
    };

    const traverse = async (itemPath) => {
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            const items = fs.readdirSync(itemPath);
            for (const item of items) {
                const subItemPath = path.join(itemPath, item);
                await traverse(subItemPath);
            }
        } else {
            // console.log('File:', itemPath);
            if (filterFunc(itemPath)) {
                ret.pathList.push(itemPath);
                ret.count++;
            }
        }
    };

    await traverse(directoryPath);
    return ret;
}

async function createFileAndTraverse() {
    try {
        // Example data to write to the JSON file
        const exampleData = {
            name: 'John Doe',
            age: 30,
            email: 'john@example.com',
        };
        const jsonData = JSON.stringify(exampleData, null, 2);

        const count = await traverseDirectory('../your_directory_path_here');
        console.log('Traversal complete. Files count:', count);

        // Create the file after traversal is complete
        await file.createFile('../tmp/aaa.tmp', jsonData);
        console.log('File created successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = traverseDirectory;
