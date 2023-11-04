function cls() {
    process.stdout.write('\x1Bc');
}

function graph(rateNumber) {
    // https://www.asciiart.eu/text-to-ascii-art
    console.log(``);
    console.log(` ________      ___  ___      ________     ___      ________`);
    console.log(`|\\   ____\\    |\\  \\|\\  \\    |\\   __  \\   |\\  \\    |\\   ____\\`);
    console.log(`\\ \\  \\___|    \\ \\  \\\\\\  \\   \\ \\  \\|\\  \\  \\ \\  \\   \\ \\  \\___|_`);
    console.log(` \\ \\  \\        \\ \\   __  \\   \\ \\   _  _\\  \\ \\  \\   \\ \\_____  \\`);
    console.log(`  \\ \\  \\____    \\ \\  \\ \\  \\   \\ \\  \\\\  \\   \\ \\  \\   \\|____|\\  \\`);
    console.log(`   \\ \\_______\\   \\ \\__\\ \\__\\   \\ \\__\\\\ _\\   \\ \\__\\   |\\________\\`);
    console.log(`    \\|_______|    \\|__|\\|__|    \\|__|\\|__|   \\|__|   \\|________|`);
    console.log(``);
}

function main() {
    console.log('chris 01');
    graph();
}

main();

module.exports = main;
