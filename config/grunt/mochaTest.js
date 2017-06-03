const babelOptions = require('../babel/test.json');
const babelRegister = require('babel-register');
const chai = require('chai');
const fs = require('fs');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

module.exports = {
    test: {
        options: {
            bail: true,
            clearRequireCache: true,
            require: [
                () => {
                    const compiler = require.extensions['.ts'];

                    require.extensions['.ts'] = function (mdl, filename) {
                        if (!filename.includes('node_modules') && filename.includes('src/')) {
                            filename = filename
                                .replace('src/', 'build/node/')
                                .slice(0, -3) + '.js';

                            mdl._compile(fs.readFileSync(filename, 'utf8'), filename);
                        }

                        if (compiler) {
                            return compiler(mdl, filename);
                        }
                    };
                },
                () => babelRegister(babelOptions),
                () => global.expect = chai.expect
            ]
        },
        src: [
            'test/unit/**/*.js'
        ]
    }
};
