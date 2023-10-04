const yargs = require('yargs');

yargs
    .command('hello', 'Display a greeting', () => {
        console.log('Hello! This is @zhenyu184/chris-tool.');
    })
    .demandCommand()
    .help().argv;
