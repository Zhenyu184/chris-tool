const fs = require('fs');
const { exec } = require('child_process');
const chrisGraph = require('../utils/chrisProgress.cjs');

function compile(filePath) {}

function compile2JsFuck(pathList, count) {
    //console.log(pathList, count);

    pathList.forEach((element, index) => {
        // Read file
        const currentPath = element;

        // Compile to
        compile(currentPath);

        // Processing progress animation
        // chrisGraph.progress(((index + 1) / count) * 1000, element, 0);
    });

    return 0;
}

module.exports = compile2JsFuck;