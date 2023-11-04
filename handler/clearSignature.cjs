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
    if (replaced.length + safeSpace <= replace.length) {
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

function calculateSafeSpaceLen(inputString, targetSubstring) {
    const pattern = new RegExp(`${targetSubstring}\\s+`, 'g');
    const matches = inputString.match(pattern);

    if (matches && matches.length > 0) {
        const minWhitespaceLength = Math.min(...matches.map((match) => match.length - targetSubstring.length));

        return minWhitespaceLength;
    }
    return 0; // 如果未找到匹配，返回 0
}

function replaceString(commentString) {
    let replacedString = commentString;
    console.log(commentString);
    ENV_CONFIG.searchString.forEach((element) => {
        // Todo: Compensation Limitations
        const safeSpaceLen = calculateSafeSpaceLen(commentString, element);

        // Space compensation
        const compensated = spaceCompensation(element, ENV_CONFIG.replace, safeSpaceLen);
        console.log(`"${compensated.replaced}"   "${compensated.replace}"`);

        const replacedRegExp = new RegExp(compensated.replaced, 'g');
        replacedString = replacedString.replace(replacedRegExp, compensated.replace);
    });
    console.log(replacedString);
    console.log();
}

function clearSignature(pathList, count) {
    //console.log(pathList, count);

    pathList.forEach((element, index) => {
        // Read file
        let fileContent = fs.readFileSync(element, 'utf-8');

        // Filter out the Comment section
        const commentArr = filterComment(fileContent);

        // Find a string to replace
        if (commentArr) {
            commentArr.forEach((element) => {
                // Filter out the specified string
                if (searchString(element)) {
                    // Replace string
                    replaceString(element);

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
