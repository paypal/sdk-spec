
const { join, dirname } = require('path');
const { existsSync } = require('fs-extra');
const { findAllFiles, markdownParseFile, getAllCodeBlocks, parseJavaScript, parseTypeScript } = require('./util');
const { SPEC_ROOT, SPEC_EXTENSION } = require('./constants');

for (const path of findAllFiles(SPEC_ROOT, SPEC_EXTENSION)) {
    test(`Valid javascript code block in ${ path }`, () => {
        const node = markdownParseFile(path);

        for (const codeBlock of getAllCodeBlocks(node, 'javascript')) {
            try {
                parseJavaScript(codeBlock);
            } catch (err) {
                throw new Error(`Failed to parse code block:\n\n${ codeBlock }\n\n${ err.message }`);
            }

            try {
                parseTypeScript(codeBlock);
            } catch (err) {
                throw new Error(`Failed typescript check for code block:\n\n${ codeBlock }\n\n${ err.message }`);
            }
        }
    });
}
