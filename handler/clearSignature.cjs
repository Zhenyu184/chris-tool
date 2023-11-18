const fs = require(`fs`);
const config = require(`../toolConfig.json`);
const chrisGraph = require(`../utils/chrisProgress.cjs`);

// utils
const isJsOrTs = require(`../utils/isJsOrTs.cjs`);

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

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceTextInFile(filePath, replacedText, replaceText, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        // Handling errors in asynchronous operations
        if (err) {
            return callback(err);
        }

        // Escape special characters in replacedText and use it to build a regular expression
        const escapedReplacedText = escapeRegExp(replacedText);
        const regex = new RegExp(escapedReplacedText, 'g');

        // Replace and write back
        const modifiedData = data.replace(regex, replaceText);
        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, 'Replace successful');
        });
    });
}

function replaceString(commentString) {
    let replacedString = commentString;
    ENV_CONFIG.searchString.forEach((element) => {
        // Todo: Compensation Limitations
        const safeSpaceLen = calculateSafeSpaceLen(commentString, element);

        // Space compensation
        const compensated = spaceCompensation(element, ENV_CONFIG.replace, safeSpaceLen);

        // Write back
        const replacedRegExp = new RegExp(compensated.replaced, 'g');
        replacedString = replacedString.replace(replacedRegExp, compensated.replace);
    });
    return replacedString;
}

function clearSignature(pathList, count) {
    //console.log(pathList, count);

    pathList.forEach((element, index) => {
        // Read file
        const currentPath = element;
        let fileContent = fs.readFileSync(currentPath, 'utf-8');

        // Filter out the Comment section
        const commentArr = filterComment(fileContent);

        // Find a string to replace
        if (commentArr) {
            commentArr.forEach((element) => {
                // Filter out the specified string
                const currentComment = element;
                if (searchString(currentComment)) {
                    // Replace string
                    const replacedComment = replaceString(currentComment);

                    // Write back
                    replaceTextInFile(currentPath, currentComment, replacedComment, (err, result) => {
                        if (err) {
                            console.error('Replace error', err);
                        } else {
                            // Replace result
                            // console.log(result);
                        }
                    });
                }
            });
        }

        // Processing progress animation
        chrisGraph.progress(((index + 1) / count) * 1000, element, 0);
    });

    return 0;
}

module.exports = clearSignature;
