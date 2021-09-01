
const { join, dirname } = require('path');
const { existsSync, readdirSync, lstatSync } = require('fs-extra');
const { findAllDirectories, markdownParseFile, getAllLinks } = require('./util');
const { SPEC_ROOT, SPEC_EXTENSION, SPEC_INDEX } = require('./constants');

for (const path of findAllDirectories(SPEC_ROOT)) {
    test(`Valid index file in ${ path }`, () => {
        const indexFile = `${ SPEC_INDEX }.${ SPEC_EXTENSION }`;
        const indexPath = join(path, indexFile);

        if (!existsSync(indexPath)) {
            throw new Error(`Could not find index: ${ indexPath }`);
        }

        const fileNames = readdirSync(path);
        const indexLinks = getAllLinks(markdownParseFile(indexPath));

        for (const fileName of fileNames) {
            if (fileName == indexFile) {
                continue;
            }

            let filePath = join(path, fileName);
            if (lstatSync(filePath).isDirectory()) {
                filePath = join(filePath, indexFile);
            }

            let found = false;
            for (const indexLink of indexLinks) {
                if (join(path, indexLink) === filePath) {
                    found = true;
                }
            }

            if (!found) {
                throw new Error(`Did not find link to ${ filePath } in ${ indexPath }`);
            }
        }
    });
}
