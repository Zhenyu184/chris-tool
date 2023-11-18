const fs = require(`fs`);
const { exec } = require(`child_process`);
const JScrewIt = require(`jscrewit`);
const chrisGraph = require(`../utils/chrisProgress.cjs`);
const isJs = require(`../utils/isJs.cjs`);

function compile(filePath) {
    // 讀取原始檔案內容
    fs.readFile(filePath, 'utf8', (readError, input) => {
        if (readError) {
            console.error(`Error reading file: ${readError}`);
            return;
        }

        // 使用 JScrewIt 編碼
        const output = JScrewIt.encode(input);

        // 將編碼後的內容寫回原檔案
        fs.writeFile(filePath, output, 'utf8', (writeError) => {
            if (writeError) {
                console.error(`Error writing file: ${writeError}`);
            }
        });
    });
}

function compile2JsFuck(pathList, count) {
    //console.log(pathList, count);

    pathList.forEach((element, index) => {
        // Read file
        const currentPath = element;

        if (isJs(currentPath)) {
            // Compile to
            compile(currentPath);
        }

        // Processing progress animation
        chrisGraph.progress(((index + 1) / count) * 1000, element, 0);
    });

    return 0;
}

module.exports = compile2JsFuck;
