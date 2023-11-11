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

function simpleGraph() {
    const ret = `■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■`;
    return ret;
}

function colorizeStringByTime(str) {
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

function colorizeStringByValue(str, value) {
    if (value < 0) {
        value = 0;
    } else if (value > 1000) {
        value = 1000;
    }

    const maxColorValue = 1000;
    const currentIndex = Math.floor((str.length * value) / maxColorValue);

    for (let i = 0; i < str.length; i++) {
        if (i < currentIndex) {
            process.stdout.write('\x1b[34m' + str[i] + '\x1b[0m'); // blue
        } else {
            process.stdout.write(str[i]); // white
        }
    }
}

function progress(rate, msg = '', previousRate = 0) {
    // Clean Terminal
    cls();

    // Print progress graph
    console.log();
    colorizeStringByValue(graph(), rate);
    console.log();
    //colorizeStringByValue(simpleGraph(), rate);
    //console.log();
    process.stdout.write(`Processing:\t${msg}\n`);
    process.stdout.write(`Rate:\t\t${(rate / 10).toFixed(1)}%\n\n`);
}

// exports.progress = progress;
// exports.graph = graph;
module.exports = {
    progress,
    graph,
};
