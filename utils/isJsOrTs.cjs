const jsFileExtension = ['js', 'ts', 'cjs', 'mjs', 'jsx', 'vue', 'es6'];

function extractFileExtension(filePath) {
    const regex = /\.[0-9a-z]+$/i;
    const match = filePath.match(regex);
    return match ? match[0].slice(1) : null;
}

function isJsExtension(filePath) {
    const extension = extractFileExtension(filePath);
    return jsFileExtension.includes(extension);
}

module.exports = isJsExtension;
