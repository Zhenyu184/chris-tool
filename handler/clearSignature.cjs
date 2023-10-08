const fs = require('fs');
const config = require('../toolConfig.json');

// utils
const isJsOrTs = require('../utils/isJsOrTs.cjs');

const ENV_TYPE = process.env.NODE_ENV || 'debug';
const ENV_CONFIG = config[ENV_TYPE]['handler']['clear'];

function searchString(sourceString) {
    let item = ENV_CONFIG.exclude.join('|');
    let regex = new RegExp(item); // RegExp(item, 'i') 忽略大小寫
    let whetherFind = regex.test(sourceString);
    if (whetherFind) {
        // exclude
        return false;
    }

    item = ENV_CONFIG.searchString.join('|');
    regex = new RegExp(item);
    whetherFind = regex.test(sourceString);
    if (whetherFind) {
        // Found
        return true;
    }
    return false;
}

function clearSignature(itemPath) {
    // console.log(content);
    if (isJsOrTs(itemPath)) {
        const content = fs.readFileSync(itemPath, 'utf-8');
        const commentPattern = /\/\*[\s\S]*?\*\/|\/\/.*/g; //註解
        const comments = content.match(commentPattern);
        if (comments) {
            comments.forEach((element) => {
                if (searchString(element)) {
                    console.log(element);
                }
            });
        }
    }
    return 0;
}

module.exports = clearSignature;
