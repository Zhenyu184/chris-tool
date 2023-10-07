function isJavascriptOrTypescript(content) {
    const jsKeywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'class', '=>', 'import', 'export'];
    const tsKeywords = ['interface', 'type', 'namespace', 'implements', 'extends'];
    for (const keyword of jsKeywords) {
        if (content.includes(keyword)) {
            return true; // Contains JavaScript keywords
        }
    }
    for (const keyword of tsKeywords) {
        if (content.includes(keyword)) {
            return true; // Contains TypeScript keywords
        }
    }
    return false;
}

module.exports = isJavascriptOrTypescript;
