
const { join, dirname } = require('path');
const { existsSync } = require('fs-extra');
const { findAllFiles, markdownParseFile, getAllLinks, getAllHeaders, dasherize } = require('./util');
const { SPEC_ROOT, SPEC_EXTENSION } = require('./constants');

for (const path of findAllFiles(SPEC_ROOT, SPEC_EXTENSION)) {
    test(`Valid links in ${ path }`, () => {
        const node = markdownParseFile(path);

        for (const href of getAllLinks(node)) {
            if (href.indexOf('.') === 0 || href.indexOf('/') === 0) {
                const [ fullPath, hash ] = join(dirname(path), href).split('#');

                if (!existsSync(fullPath)) {
                    throw new Error(`File does not exist: ${ fullPath }`);
                }

                if (!fullPath.endsWith(`.${ SPEC_EXTENSION }`)) {
                    throw new Error(`Not a .${ SPEC_EXTENSION } file: ${ fullPath }`);
                }

                if (hash) {
                    const linkPageNode = markdownParseFile(fullPath);

                    let found = false;
                    for (const header of getAllHeaders(linkPageNode)) {
                        if (dasherize(header) === hash) {
                            found = true;
                        }
                    }

                    if (!found) {
                        throw new Error(`Could not find header with id #${ hash } in ${ fullPath }`);
                    }
                }
            }

            if (href.indexOf('#') === 0) {
                let found = false;
                for (const header of getAllHeaders(node)) {
                    if (`#${ dasherize(header) }` === href) {
                        found = true;
                    }
                }

                if (!found) {
                    throw new Error(`Could not find header with id ${ href } in ${ path }`);
                }
            }
        }
    });
}
