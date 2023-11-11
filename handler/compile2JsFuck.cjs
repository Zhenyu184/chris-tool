const fs = require('fs');
const { exec } = require('child_process');

function compile(filePath) {
    // 讀取原始檔案內容
    fs.readFile(filePath, 'utf8', (readError, data) => {
        if (readError) {
            console.error(`Error reading file: ${readError}`);
            return;
        }

        // 組合 Closure Compiler 命令
        const command = `closure-compiler --js ${filePath}`;

        // 執行 Closure Compiler 命令
        exec(command, (compilerError, stdout, stderr) => {
            if (compilerError) {
                console.error(`Error during compilation: ${compilerError}`);
                return;
            }

            // 將編譯後的內容寫回原始檔案
            fs.writeFile(filePath, stdout, 'utf8', (writeError) => {
                if (writeError) {
                    console.error(`Error writing file: ${writeError}`);
                } else {
                    console.log(`Compilation and save successful!`);
                    console.log(`Output file: ${filePath}`);
                }
            });
        });
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
