const chalk = require('chalk');

function cls() {
    process.stdout.write('\x1Bc');
}

function graph() {
    // https://www.asciiart.eu/text-to-ascii-art
    const ret = ` ________      ___  ___      ________     ___      ________
|\\   ____\\    |\\  \\|\\  \\    |\\   __  \\   |\\  \\    |\\   ____\\
\\ \\  \\___|    \\ \\  \\\\\\  \\   \\ \\  \\|\\  \\  \\ \\  \\   \\ \\  \\___|_
 \\ \\  \\        \\ \\   __  \\   \\ \\   _  _\\  \\ \\  \\   \\ \\_____  \\
  \\ \\  \\____    \\ \\  \\ \\  \\   \\ \\  \\\\  \\   \\ \\  \\   \\|____|\\  \\
   \\ \\_______\\   \\ \\__\\ \\__\\   \\ \\__\\\\ _\\   \\ \\__\\   |\\________\\
    \\|_______|    \\|__|\\|__|    \\|__|\\|__|   \\|__|   \\|________|
`;
    return ret;
}

function aaa(str) {
    let currentIndex = 0;
    const interval = setInterval(() => {
        if (currentIndex >= str.length) {
            clearInterval(interval);
            return;
        }

        const char = str.charAt(currentIndex);
        const blueChar = `\x1b[34m${char}\x1b[0m`;

        process.stdout.write(blueChar);
        currentIndex++;
    }, 20);
}

function main() {
    console.log('chris 01');
    aaa(graph());
}

main();

module.exports = main;
