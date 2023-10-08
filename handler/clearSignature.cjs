const fs = require('fs');

// utils
const isJsOrTs = require('../utils/isJsOrTs.cjs');

function clearSignature(itemPath) {
    // console.log(content);
    if (isJsOrTs(itemPath)) {
        const content = fs.readFileSync(itemPath, 'utf-8');
        const commentPattern = /\/\*[\s\S]*?\*\/|\/\/.*/g; //註解
        const comments = content.match(commentPattern);
        if (comments) {
            comments.forEach((element) => {
                const searchString = 'ose';
                const regex = new RegExp(searchString);
                const whetherFind = regex.test(element);
                if (whetherFind) {
                    console.log(`找到"${searchString}":`, element);
                }
            });
        }
    }
    return 0;
}

module.exports = clearSignature;
