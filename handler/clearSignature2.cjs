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

function filterComment(sourceFileContent) {
    const commentPattern = /\/\*[\s\S]*?\*\/|\/\/.*/g; //註解
    return sourceFileContent.match(commentPattern);
}

function clearSignature(pathList, count) {
    // console.log(content);
    // if (isJsOrTs(itemPath)) {
    //     const fileContent = fs.readFileSync(itemPath, 'utf-8');
    //     const commentArr = filterComment(fileContent);
    //     if (commentArr) {
    //         commentArr.forEach((element) => {
    //             if (searchString(element)) {
    //                 // console.log(element);
    //             }
    //         });
    //     }
    // }
    console.log('chris 04', pathList, count);
    return 0;
}

module.exports = clearSignature;
