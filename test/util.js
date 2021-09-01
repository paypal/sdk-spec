
const { homedir } = require('os');
const { join } = require('path');
const klawSync = require('klaw-sync');
const markdownIt = require('markdown-it');
const { parse } = require('node-html-parser');
const { readFileSync, writeFileSync, existsSync, removeSync, ensureDirSync } = require('fs-extra');
const babel = require('@babel/parser');
const typescript = require('typescript');
const md5 = require('md5');

const markdown = markdownIt();

module.exports.findAllFiles = (dir, extension) => {
    return klawSync(dir, {
        nodir: true,
        traverseAll: true,
        filter: ({ path }) => {
            if (extension && !path.match(new RegExp(`.${ extension }$`))) {
                return false;
            }

            return true;
        }
    }).map(({ path }) => {
        return path;
    });
};

module.exports.findAllDirectories = (dir) => {
    return [
        dir,
        ...klawSync(dir, {
            nofile: true,
            traverseAll: true
        }).map(({ path }) => {
            return path;
        })
    ];
};

module.exports.dasherize = (str) => {
    return str.toLowerCase().replace(/[\s+_]+/g, '-');
};

module.exports.htmlParse = (html) => {
    return parse(html, {
        lowerCaseTagName: false,
        comment: false, 
        blockTextElements: {
            script: true,
            noscript: true,
            style: true,
            pre: true,
            code: true
        }
    });
};

module.exports.markdownParseFile = (path) => {
    return module.exports.htmlParse(markdown.render(readFileSync(path).toString()));
};

module.exports.getAllElements = function*(node, nodeTypes = []) {
    if (!nodeTypes.length || nodeTypes.includes(node.rawTagName)) {
        yield node;
    }

    for (const childNode of node.childNodes) {
        yield *module.exports.getAllElements(childNode, nodeTypes);
    }
};

module.exports.getAllLinks = (node) => {
    return Array.from(module.exports.getAllElements(node, [ 'a' ])).map(node => {
        const href = node.getAttribute('href');

        if (!href) {
            throw new Error(`Link node has no href`);
        }

        return href;
    });
}

module.exports.getAllHeaders = (node) => {
    return Array.from(module.exports.getAllElements(node, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ])).map(node => {
        const headerText = node.text;

        if (!headerText) {
            throw new Error(`Header node has no header text`);
        }

        return headerText;
    });
}

module.exports.getAllCodeBlocks = (node, language) => {
    return Array.from(module.exports.getAllElements(node, [ 'pre' ])).map((node) => {
        return module.exports.htmlParse(node.text).childNodes[0];
    }).filter(node => {
        if (node.rawTagName !== 'code') {
            return false;
        }
        
        if (node.classList.contains(`language-${ language }`)) {
            return true;
        };

        let foundLanguageClass = false;
        for (const className of node.classList.values()) {
            if (className.match(/^language-[\w-]+$/)) {
                foundLanguageClass = true;
            }
        }

        if (!foundLanguageClass) {
            throw new Error(`Code block has no specified language:\n\n${ node.innerHTML }\n\nClasses: ${ Array.from(node.classList.values()).join(',') }`);
        }

        return false;
    }).map(node => {
        const code = node.innerHTML;

        if (!code) {
            throw new Error(`Code block has no code`);
        }

        return code;
    });
}

module.exports.parseJavaScript = (code) => {
    return babel.parse(code, {
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
          plugins: [
            'jsx',
            'typescript'
        ],
    });
};

const TYPESCRIPT_ERROR = typescript.Diagnostics;

const TYPESCRIPT_IGNORE_ERRORS = [
    TYPESCRIPT_ERROR.A_return_statement_can_only_be_used_within_a_function_body,
    TYPESCRIPT_ERROR.Cannot_find_name_0,
    TYPESCRIPT_ERROR.Cannot_find_name_0_Did_you_mean_1,
    TYPESCRIPT_ERROR.await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module,
    TYPESCRIPT_ERROR.Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_esnext_or_system_and_the_target_option_is_set_to_es2017_or_higher,
    TYPESCRIPT_ERROR.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer
]

const compilerOptions = typescript.parseJsonConfigFileContent(
    require('../tsconfig.json'),
    typescript.sys,
    '../tsconfig.json'
);

module.exports.parseTypeScript = (code) => {
    const dir = join(homedir(), '.cache', 'typescript')
    const filename = `${ md5(`${ code }_${ JSON.stringify(compilerOptions.options) }_${ JSON.stringify(TYPESCRIPT_IGNORE_ERRORS) }`) }.snippet.tsx`;
    
    const path = join(dir, filename);

    try {
        ensureDirSync(dir);

        if (existsSync(path)) {
            return;
        } else {
            writeFileSync(path, code);
        }

        const program = typescript.createProgram({
            rootNames: [path],
            options: compilerOptions.options
        });

        const diagnostics = typescript.getPreEmitDiagnostics(program);

        for (const diagnostic of diagnostics) {
            const { messageText, code } = diagnostic;

            if (TYPESCRIPT_IGNORE_ERRORS.find(error => error.code === code)) {
                continue;
            }

            throw new Error(`${ messageText } (${ code })`)
        }
    } catch (err) {
        removeSync(path);
        throw err;
    }
}