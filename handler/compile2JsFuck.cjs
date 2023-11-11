const fs = require('fs');
const jsfuck = require('jsfuck');
const { exec } = require('child_process');
const chrisGraph = require('../utils/chrisProgress.cjs');

function compile(filePath) {
    // 讀取原始檔案內容
    fs.readFile(filePath, 'utf8', (readError, data) => {
        if (readError) {
            console.error(`Error reading file: ${readError}`);
            return;
        }

        // 檢查檔案類型，js 或 ts
        const isTypeScript = filePath.endsWith('.ts');

        if (isTypeScript) {
            // 如果是 TypeScript，使用 ts-node 將其轉換為 JavaScript
            exec(`npx ts-node --compiler npx-tsc -e "${data}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error during TypeScript compilation: ${error}`);
                    return;
                }

                const transformedCode = jsfuck.encode(stdout);

                // 將編譯後的內容寫回原始檔案
                fs.writeFile(filePath, transformedCode, 'utf8', (writeError) => {
                    if (writeError) {
                        console.error(`Error writing file: ${writeError}`);
                    } else {
                        console.log(`JSFuck transformation and save successful!`);
                        console.log(`Output file: ${filePath}`);
                    }
                });
            });
        } else {
            // 如果是 JavaScript，直接使用 JSFuck 將其轉換
            const transformedCode = jsfuck.encode(data);

            // 將編譯後的內容寫回原始檔案
            fs.writeFile(filePath, transformedCode, 'utf8', (writeError) => {
                if (writeError) {
                    console.error(`Error writing file: ${writeError}`);
                } else {
                    console.log(`JSFuck transformation and save successful!`);
                    console.log(`Output file: ${filePath}`);
                }
            });
        }
    });
}

function compile2JsFuck(pathList, count) {
    //console.log(pathList, count);

    pathList.forEach((element, index) => {
        // Read file
        const currentPath = element;

        // Compile to
        compile(currentPath);

        // Processing progress animation
        chrisGraph.progress(((index + 1) / count) * 1000, element, 0);
    });

    return 0;
}

module.exports = compile2JsFuck;
