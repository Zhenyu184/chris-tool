const fs = require('fs');
const config = require('../toolConfig.json');
const chrisGraph = require('../utils/chrisProgress.cjs');

// utils
const isJsOrTs = require('../utils/isJsOrTs.cjs');

const ENV_TYPE = process.env.NODE_ENV || 'debug';
const ENV_CONFIG = config[ENV_TYPE]['handler']['clear'];

function clearSignature(pathList, count) {
    return 0;
}

module.exports = clearSignature;
