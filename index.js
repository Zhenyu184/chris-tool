const readline = require('readline');
const { exec } = require('child_process');

const { helloText } = require('./helloText.cjs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 根據使用者輸入執行相應的程式
const exe = rl.question('請輸入要執行的程式名稱：', (programName) => {
    const command = `node bin/cli.cjs ${programName}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`執行程式時發生錯誤：${error}`);
            return;
        }

        console.log(`程式執行完成，輸出：\n${stdout}`);
    });

    rl.close();
});

function main() {
    console.log(helloText);
    exe;
    return 0;
}

module.exports = main();
