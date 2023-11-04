const fs = require('fs');
const config = require('../toolConfig.json');
const chrisGraph = require('../utils/chrisProgress.cjs');

// utils
const isJsOrTs = require('../utils/isJsOrTs.cjs');

const ENV_TYPE = process.env.NODE_ENV || 'debug';
const ENV_CONFIG = config[ENV_TYPE]['handler']['clear'];

function searchString(sourceString) {
    // If an excluded string is found
    let item = ENV_CONFIG.exclude.join('|');
    let regex = new RegExp(item); // RegExp(item, 'i') 忽略大小寫
    let whetherFind = regex.test(sourceString);
    if (whetherFind) {
        // exclude
        return false;
    }

    // If the specified string is found
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
    const commentPattern = /\/\*[\s\S]*?\*\/|\/\/.*/g; //comment
    return sourceFileContent.match(commentPattern);
}

function spaceCompensation(replaced, replace, safeSpace = 1) {
    const diff = replaced.length - replace.length;
    let safeSpaceFlag = false;
    if (replace.length + safeSpace >= replaced.length) {
        safeSpaceFlag = true;
    }

    if (diff == 0) {
        return {
            replaced: replaced,
            replace: replace,
            diff: diff,
        };
    } else if (diff > 0) {
        return {
            replaced: replaced,
            replace: replace + ' '.repeat(diff),
            diff: diff,
        };
    } else if (diff < 0) {
        return {
            replaced: safeSpaceFlag ? replaced : replaced + ' '.repeat(Math.abs(diff)),
            replace: replace,
            diff: diff,
        };
    }
}

function clearSignature(pathList, count) {
    //console.log(pathList, count);

    pathList.forEach((element, index) => {
        // Read file
        let fileContent = fs.readFileSync(element, 'utf-8');

        // Filter out the Comment section
        const commentArr = filterComment(fileContent);
        if (commentArr) {
            commentArr.forEach((element) => {
                // Filter out the specified string
                if (searchString(element)) {
                    const searchList = ENV_CONFIG.searchString;
                    let replacedString = element;

                    // 取代字串
                    console.log(element);
                    searchList.forEach((element) => {
                        // Todo: Compensation Limitations

                        // Space compensation
                        const compensated = spaceCompensation(element, ENV_CONFIG.replace);
                        console.log(`"${compensated.replaced}"   "${compensated.replace}"`);

                        const replacedRegExp = new RegExp(compensated.replaced, 'g');
                        replacedString = replacedString.replace(replacedRegExp, compensated.replace);
                    });
                    console.log(replacedString);
                    console.log();

                    // 寫回
                }
            });
        }

        // Processing progress animation
        // chrisGraph.progress(((index + 1) / count) * 1000, element, true);
    });

    return 0;
}

module.exports = clearSignature;
